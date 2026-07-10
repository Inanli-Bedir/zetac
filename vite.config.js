import { defineConfig } from 'vite';
import { resolve, join } from 'path';
import { copyFileSync, cpSync, existsSync, mkdirSync } from 'fs';

const staticJsFiles = [
  'i18n.js',
  'project-i18n.js',
  'projects-data.js',
  'project-detail.js',
  'script.js',
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
        stockflow: resolve(__dirname, 'projects/stockflow.html'),
        panpos: resolve(__dirname, 'projects/panpos.html'),
        kommunikationsapp: resolve(__dirname, 'projects/kommunikationsapp.html'),
        timetrack: resolve(__dirname, 'projects/timetrack.html'),
        alpin: resolve(__dirname, 'projects/alpin.html'),
      },
    },
  },
});
