import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: 'https://favianl.github.io/agent-panel-demo/',
  plugins: [react()],
});
