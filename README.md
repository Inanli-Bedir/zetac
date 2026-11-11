# Zetac Website

Static marketing site for Zetac: plain HTML, CSS and classic `<script>` files.
[Vite](https://vite.dev) is used only as a local dev server and optional build tool.
Production is served by nginx (see `Dockerfile`, `nginx.conf`, `docker-compose.prod.yml`).

## Local development with Docker

Requirements: [Docker Desktop](https://www.docker.com/products/docker-desktop/) (includes Docker Compose), running.

Run these from the repository root:

```bash
docker compose up -d      # start (the first run builds the image automatically)
docker compose down       # stop and remove the container
```

Open **http://localhost:5173**.

`compose.yaml` runs the Vite dev server (`Dockerfile.dev`). The project folder is
mounted into the container, so when you save HTML, CSS or JS files the browser
updates automatically (hot reload). You don't need to rebuild the image.

Rebuild only after changing `package.json` / `package-lock.json`:

```bash
docker compose up -d --build -V   # -V recreates the container's node_modules volume
```

Useful commands:

```bash
docker compose ps         # status (shows "healthy" once the dev server answers)
docker compose logs -f    # follow dev server logs
```

You don't need environment variables, a database or external services.

### Notes

- A plain `docker compose ...` uses `compose.yaml` (local development only).
  Production uses `docker-compose.prod.yml`, which must be named explicitly with `-f`.
- The port is bound to `127.0.0.1` only, so the dev server is not exposed on your network.
- If port 5173 is already in use, change the left side of `"127.0.0.1:5173:5173"`
  in `compose.yaml` (e.g. `"127.0.0.1:5180:5173"`).
- Don't create a `compose.override.yaml` unless you mean to: Compose merges it
  into `compose.yaml` automatically.

### Troubleshooting: `EIO: i/o error, read` (macOS + iCloud)

If the dev server crashes with `Error: EIO: i/o error, read`, the project is in an
iCloud-synced folder (e.g. `~/Desktop` with "Desktop & Documents" enabled) and iCloud
has offloaded some files. Docker can't trigger the download, so reads fail.

Fix: in Finder, right-click the project folder → **Keep Downloaded**, or run:

```bash
find . -path ./.git -prune -o -type f -flags +dataless -print   # list offloaded files
find . -path ./.git -prune -o -type f -flags +dataless -exec brctl download {} \;
```

Then start the stack again. Moving the project outside iCloud (e.g. `~/Projects`) avoids it entirely.

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
