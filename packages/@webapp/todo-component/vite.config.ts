import dns from 'dns';
import { createRequire } from 'module';
import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import type { UserConfigExport } from 'vite';

const targetRequire = createRequire(__dirname);

dns.setDefaultResultOrder('verbatim');

// https://vitejs.dev/config/
export default defineConfig(() => {
  const config: UserConfigExport = {
    build: {
      lib: {
        entry: resolve(__dirname, 'src/components/index.ts'),
        fileName: 'index',
        formats: ['es']
      },
      reportCompressedSize: false,
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
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
      port: 8080
    }
  };

  return config;
});
