import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // Set the root directory to your project root
  root: './',

  plugins: [react()],

  resolve: {
    alias: {
      '/@/': path.resolve(__dirname, 'src'),
      // Add an alias for your 'Main' component
      '@main': path.resolve(__dirname, 'src/components/Main'),
    },
  },
});
