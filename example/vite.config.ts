import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
import tsconfigPaths from 'vite-tsconfig-paths';

import vitApp from '@vitjs/vit';
import routes from './config/routes';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/use-switch-tabs/',
  plugins: [
    reactRefresh(),
    tsconfigPaths(),
    vitApp({
      debug: true,
      routes,
      dynamicImport: { loading: './components/PageLoading' },
      exportStatic: {},
    }),
  ],
  esbuild: {
    jsxInject: "import * as React from 'react'",
  },
});
