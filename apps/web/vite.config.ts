import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
export default defineConfig({
  plugins: [react()],
  server: { proxy: { '/api': 'http://localhost:5121' } },
  test: { coverage: { provider: 'v8', reporter: ['text', 'lcov'] } },
})
