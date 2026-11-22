// Zetac contact form mailer: receives POST /api/kontakt (JSON) from the site's nginx
// and emails it to MAIL_TO (info@zetac.de) via SMTP. No other routes besides /healthz.
//
// Environment (set in the server's .env, never committed):
//   SMTP_HOST, SMTP_PORT (587), SMTP_SECURE ("true" for port 465), SMTP_USER, SMTP_PASS
//   SMTP_FROM   sender address (default: SMTP_USER) – must be allowed by the mail server
//   MAIL_TO     recipient (default: info@zetac.de)
//   ALLOWED_ORIGINS  comma-separated (default: https://zetac.de,https://www.zetac.de)
//   PORT        (default 3000)
'use strict';

const http = require('http');
const nodemailer = require('nodemailer');

const env = process.env;
const PORT = Number(env.PORT) || 3000;
const MAIL_TO = env.MAIL_TO || 'info@zetac.de';
const FROM = env.SMTP_FROM || env.SMTP_USER;
const ALLOWED_ORIGINS = (env.ALLOWED_ORIGINS || 'https://zetac.de,https://www.zetac.de')
  .split(',').map((s) => s.trim()).filter(Boolean);
const MAX_BODY = 32 * 1024;

// Same limits and rules as the browser check in site.js.
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_CHARS = /^[0-9+()/\-.\s]+$/;
const LIMITS = { name: 120, company: 160, email: 200, phone: 40, message: 5000 };

function clean(v, max) {
  return typeof v === 'string' ? v.replace(/\r\n?/g, '\n').trim().slice(0, max) : '';
}
function oneLine(v) { return v.replace(/[\r\n]+/g, ' '); }   // no header injection

function validate(body) {
  const d = {};
  for (const k of Object.keys(LIMITS)) d[k] = clean(body[k], LIMITS[k] + 1);
  const errors = {};
  if (d.name.length < 2 || d.name.length > LIMITS.name) errors.name = true;
  if (!EMAIL.test(d.email) || d.email.length > LIMITS.email || /[\r\n]/.test(d.email)) errors.email = true;
  const digits = d.phone.replace(/\D/g, '').length;
  if (!PHONE_CHARS.test(d.phone) || digits < 6 || digits > 20) errors.phone = true;
  if (d.company.length > LIMITS.company) errors.company = true;
  if (d.message.length > LIMITS.message) errors.message = true;
  return { data: d, errors };
}

// Rate limit: at most 5 accepted requests per IP in 10 minutes (in memory).
const WINDOW = 10 * 60 * 1000, MAX_PER_WINDOW = 5;
const hits = new Map();
function limited(ip) {
  const now = Date.now();
  const list = (hits.get(ip) || []).filter((t) => now - t < WINDOW);
  if (list.length >= MAX_PER_WINDOW) { hits.set(ip, list); return true; }
  list.push(now);
  hits.set(ip, list);
  return false;
}
setInterval(() => {
  const now = Date.now();
  for (const [ip, list] of hits) if (!list.some((t) => now - t < WINDOW)) hits.delete(ip);
}, WINDOW).unref();

const configured = Boolean(env.SMTP_HOST && FROM);
const transport = configured ? nodemailer.createTransport({
  host: env.SMTP_HOST,
  port: Number(env.SMTP_PORT) || 587,
  secure: env.SMTP_SECURE === 'true',
  auth: env.SMTP_USER ? { user: env.SMTP_USER, pass: env.SMTP_PASS } : undefined,
}) : null;
if (!configured) console.warn('mailer: SMTP_HOST / SMTP_FROM not set – requests will get 503');

function send(res, status, obj) {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' });
  res.end(JSON.stringify(obj));
}

const server = http.createServer((req, res) => {
  const path = req.url.split('?')[0];
  if (req.method === 'GET' && path === '/healthz') return send(res, 200, { ok: true });
  if (path !== '/api/kontakt') return send(res, 404, { error: 'not_found' });
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return send(res, 405, { error: 'method' }); }

  const origin = req.headers.origin;
  if (origin && !ALLOWED_ORIGINS.includes(origin)) return send(res, 403, { error: 'origin' });
  if (!/^application\/json\b/i.test(req.headers['content-type'] || '')) return send(res, 415, { error: 'type' });

  let size = 0;
  const chunks = [];
  req.on('data', (c) => {
    size += c.length;
    if (size > MAX_BODY) { send(res, 413, { error: 'too_large' }); req.destroy(); return; }
    chunks.push(c);
  });
  req.on('end', async () => {
    if (res.writableEnded) return;
    let body;
    try { body = JSON.parse(Buffer.concat(chunks).toString('utf8')); } catch { return send(res, 400, { error: 'json' }); }
    if (!body || typeof body !== 'object') return send(res, 400, { error: 'json' });

    // Spam trap (hidden "website" field): answer like a success, send nothing.
    if (typeof body.website === 'string' && body.website.trim()) return send(res, 200, { ok: true });

    const { data, errors } = validate(body);
    if (Object.keys(errors).length) return send(res, 422, { error: 'invalid', fields: Object.keys(errors) });

    const ip = String(req.headers['x-real-ip'] || '').trim() || req.socket.remoteAddress || '';   // set by nginx-proxy
    if (limited(ip)) return send(res, 429, { error: 'rate_limited' });
    if (!transport) return send(res, 503, { error: 'not_configured' });

    const lines = [
      'Neue Anfrage über das Kontaktformular auf zetac.de',
      '',
      `Name:          ${data.name}`,
      `Unternehmen:   ${data.company || '–'}`,
      `E-Mail:        ${data.email}`,
      `Telefon:       ${data.phone}`,
      '',
      'Nachricht:',
      data.message || '–',
    ];
    try {
      await transport.sendMail({
        from: { name: 'Zetac Kontaktformular', address: FROM },
        to: MAIL_TO,
        replyTo: { name: oneLine(data.name), address: data.email },
        subject: oneLine(`Neue Anfrage: ${data.name}${data.company ? ' (' + data.company + ')' : ''}`).slice(0, 200),
        text: lines.join('\n'),
      });
      send(res, 200, { ok: true });
    } catch (err) {
      // Log the failure, not the visitor's data.
      console.error('mailer: send failed:', err && (err.code || err.message));
      send(res, 502, { error: 'send_failed' });
    }
  });
});

server.requestTimeout = 15000;
server.listen(PORT, () => console.log(`mailer: listening on ${PORT}, delivering to ${MAIL_TO}`));
