import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';

const staticJsFiles = [
  'i18n.js',
  'project-i18n.js',
  'projects-data.js',
  'project-detail.js',
  'portfolio-i18n.js',
  'portfolio-data.js',
  'portfolio-detail.js',
  'script.js',
  'site.js',
];

function copyStaticAssets() {
  return {
    name: 'copy-static-assets',
    closeBundle() {
      const outDir = resolve(__dirname, 'dist');
      staticJsFiles.forEach((file) => {
        copyFileSync(join(__dirname, file), join(outDir, file));
      });
      const assetsDir = join(__dirname, 'assets');
      if (existsSync(assetsDir)) {
        cpSync(assetsDir, join(outDir, 'assets'), { recursive: true });
      }
    },
  };
}

export default defineConfig({
  server: {
    port: 5173,
    open: true,
  },
  preview: {
    port: 4173,
  },
  plugins: [copyStaticAssets()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'about.html'),
        projekte: resolve(__dirname, 'projekte.html'),
        services: resolve(__dirname, 'services.html'),
        contact: resolve(__dirname, 'contact.html'),
        app01: resolve(__dirname, 'projects/app-01.html'),
        stockflow: resolve(__dirname, 'projects/stockflow.html'),
        panpos: resolve(__dirname, 'projects/panpos.html'),
        kommunikationsapp: resolve(__dirname, 'projects/kommunikationsapp.html'),
        timetrack: resolve(__dirname, 'projects/timetrack.html'),
        alpin: resolve(__dirname, 'projects/alpin.html'),
        meridianInteriors: resolve(__dirname, 'projects/meridian-interiors.html'),
        nordholzCafe: resolve(__dirname, 'projects/nordholz-cafe.html'),
        pulseonCoach: resolve(__dirname, 'projects/pulseon-coach.html'),
        pulseonStudio: resolve(__dirname, 'projects/pulseon-studio.html'),
        vantageRealty: resolve(__dirname, 'projects/vantage-realty.html'),
        loopBloom: resolve(__dirname, 'projects/loop-bloom.html'),
      },
    },
  },
});
