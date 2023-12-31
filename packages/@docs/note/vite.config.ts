import dns from 'dns';
import { createRequire } from 'module';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig, loadEnv } from 'vite';
import type { UserConfigExport } from 'vite';

const targetRequire = createRequire(__dirname);

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const config: UserConfigExport = {
    build: {
      reportCompressedSize: false
    },
    plugins: [vue()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src'),
        '~': resolve(__dirname, './src'),
        vue: targetRequire.resolve('vue')
      }
    },
    server: {
      port: 3000
    }
  };

  return config;
});
