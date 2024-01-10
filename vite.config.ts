import { defineConfig } from 'vite'
import * as path from 'path'
import dts from 'vite-plugin-dts'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    dts({ entryRoot: './src', outDir: './dist/types' })
  ],
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: 'index'
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
})
