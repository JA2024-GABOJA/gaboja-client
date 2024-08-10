import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      { find: '@components', replacement: '/src/components' },
      { find: '@', replacement: '/src' },
    ],
  },
  plugins: [
    react({
      jsxImportSource: '@emotion/react',
    }),
  ],
});
