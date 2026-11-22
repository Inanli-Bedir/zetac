# Zetac Website

Static marketing site for Zetac: plain HTML, CSS and classic `<script>` files.
[Vite](https://vite.dev) is used only as a local dev server and optional build tool.
Production is served by nginx (see `Dockerfile`, `nginx.conf`, `docker-compose.prod.yml`).

## Local development with Docker

Requirements: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose).

The site runs at **http://localhost:5173**. Choose one way to start it:

- **Double-click `Start Zetac.command`** in this folder. It opens Docker Desktop if
  needed, waits for the engine, starts the container, waits until the site responds
  and opens it in your browser. Any errors are shown in the window.
- **Docker Desktop → Containers → `zetac-website-dev` → ▶ (Start).**
- **Terminal:** `docker compose up -d --wait` from the repository root.

The container has `restart: unless-stopped`, so it starts automatically every time
Docker Desktop starts. This works only while the container **exists**:

```bash
docker compose stop      # stop it, but keep it (auto-start keeps working once you start it again)
docker compose down      # DELETES the container; auto-start stops until you start it once more
docker compose logs -f   # follow dev server logs
docker compose ps        # status ("healthy" once the page, zetac.css and site.js all load)
```

A container you stop yourself stays stopped, even across Docker Desktop restarts,
until you start it again (that's what `unless-stopped` means).

`compose.yaml` runs the Vite dev server (`Dockerfile.dev`) on `0.0.0.0:5173` inside
the container. The project folder is mounted into the container, so when you save
HTML, CSS or JS files the browser updates automatically (hot reload). You don't need
to rebuild the image. `node_modules` lives in the named volume
`zetac-website-dev_node_modules`. When `package-lock.json` changes, the container
runs `npm ci` by itself on its next start (`docker compose restart`).

You don't need environment variables, a database or external services.

### Notes

- A plain `docker compose ...` uses `compose.yaml` (local development only).
  Production uses `docker-compose.prod.yml`, which must be named explicitly with `-f`.
- The port is bound to `127.0.0.1` only, so the dev server is not exposed on your network.
- If port 5173 is already in use, change the left side of `"127.0.0.1:5173:5173"`
  in `compose.yaml` (e.g. `"127.0.0.1:5180:5173"`) and the URL in `Start Zetac.command`.
- Don't create a `compose.override.yaml` unless you mean to: Compose merges it
  into `compose.yaml` automatically.

### Keep the project out of iCloud (`EIO: i/o error, read`)

The repository lives in `~/Developer/zetac-website`. Don't move it back to `~/Desktop`
or `~/Documents` when iCloud "Desktop & Documents" sync is on. iCloud offloads files
it considers unused (more often when the disk is nearly full). Docker can't trigger the
download, so Vite crashes with `Error: EIO: i/o error, read` and the container
keeps restarting or shows **unhealthy**.

## Hero background video

The homepage hero can play a short looping video behind the text. The page is
already wired for it; add the files and it switches on automatically (no code change):

```
assets/hero/zetac-hero-loop.webm   # VP9 or AV1 (Chrome, Firefox, Edge)
assets/hero/zetac-hero-loop.mp4    # H.264, for Safari / iOS
```

Asset requirements:

- Generated from `assets/zetac-background.jpg` (image-to-video), same framing, 16:9
- Locked camera: no pan or zoom of the whole frame; only the ribbons move,
  with soft gold reflections travelling along their edges
- Seamless loop, 12–16 s (last frame flows into the first)
- No audio track, 1920 × 1080, roughly 2–4 MB per file
- MP4: `-movflags +faststart` so it starts before fully downloaded

Example encode from a master file:

```bash
ffmpeg -i master.mov -an -vf "scale=1920:-2,format=yuv420p" -c:v libx264 -crf 24 -preset slow -movflags +faststart assets/hero/zetac-hero-loop.mp4
ffmpeg -i master.mov -an -vf "scale=1920:-2" -c:v libvpx-vp9 -crf 34 -b:v 0 assets/hero/zetac-hero-loop.webm
```

Behaviour: the still image is the poster and fallback. The video is not loaded with
"reduce motion" or data-saver enabled, and the page falls back to the still if the
files are missing, can't be played, or autoplay is blocked. It pauses while the hero
is scrolled out of view.

## Local development without Docker

```bash
npm ci
npm run dev
```

## Production

On the server:

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

This builds the nginx image from `Dockerfile` and registers it with the shared
nginx-proxy (`proxy` network) for `zetac.de`. The `-f` is required: without it,
Compose would start the local dev stack from `compose.yaml` instead.
