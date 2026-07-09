import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// In docker-compose, BACKEND_URL points at the backend service.
// Running the frontend outside Docker falls back to localhost.
const backend = process.env.BACKEND_URL || 'http://localhost:8000'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      '/recommendations': backend,
      '/health': backend,
    },
  },
})
