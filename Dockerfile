FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf

# vite is a dev-server convenience only — the pages are plain HTML with
# classic <script src> tags, so the raw files are served as-is.
COPY *.html styles.css zetac.css site.js /usr/share/nginx/html/
COPY i18n.js project-i18n.js projects-data.js project-detail.js script.js /usr/share/nginx/html/
COPY portfolio-i18n.js portfolio-data.js portfolio-detail.js /usr/share/nginx/html/
COPY assets/   /usr/share/nginx/html/assets/
COPY projects/ /usr/share/nginx/html/projects/

EXPOSE 80

# 127.0.0.1, not localhost: localhost resolves to ::1 first and nginx listens
# on IPv4 only, so the probe would be refused.
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD wget -qO- http://127.0.0.1/ >/dev/null || exit 1
