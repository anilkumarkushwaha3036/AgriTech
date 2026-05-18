import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Function to dynamically read backend PORT from Backend/.env
const getBackendPort = () => {
  try {
    const envPath = path.resolve(__dirname, '../Backend/.env')
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8')
      const portMatch = envContent.match(/^PORT\s*=\s*(\d+)/m)
      if (portMatch && portMatch[1]) {
        return parseInt(portMatch[1], 10)
      }
    }
  } catch (err) {
    console.error('Error reading Backend/.env for PORT proxy:', err)
  }
  return 5000 // default fallback port if not specified
}

const PORT = getBackendPort()

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})

