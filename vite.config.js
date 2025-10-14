import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      jsxRuntime: 'automatic', // ✅ THIS MUST BE ADDED for React 17+
    }),
  ],
  resolve: {
    alias: {
      // ⭐ ADD THIS ALIAS CONFIGURATION ⭐
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
