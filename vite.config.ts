import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import svgLoader from 'vite-svg-loader'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgLoader({ svgo: false})]
})
