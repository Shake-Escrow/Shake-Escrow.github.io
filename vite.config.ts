import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // Root deployment for Shake-Escrow.github.io
  base: '/',
  
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});