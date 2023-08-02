import { defineConfig } from 'vite';
import { resolve } from 'path';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import vue from '@vitejs/plugin-vue';
import { createRequire } from 'module';
import { fileURLToPath, URL } from 'node:url';

const targetRequire = createRequire(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/next/packages/vite-plugin
    vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss'
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
      '~': resolve(__dirname, './src'),
      vue: targetRequire.resolve('vue')
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue']
  }
});
