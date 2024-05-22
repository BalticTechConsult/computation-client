import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import copy from 'rollup-plugin-copy'

const clientConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    dts({
      outDir: 'dist/types',
      entryRoot: 'src',
      insertTypesEntry: true,
    }),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: ['path', 'fs', 'os'],
      output: {
        globals: {
          path: 'path',
          fs: 'fs',
          os: 'os',
        },
      }
    }
  }
})

// Конфигурация для CLI
const cliConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
  ],
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    lib: {
      entry: resolve(__dirname, 'src/cli.ts'),
      formats: ['cjs'],
    },
    rollupOptions: {
      output: {
        entryFileNames: '[name].cjs',
      },
      plugins: []
    }
  }
})

export default defineConfig(({ mode }) => {
  if (mode === 'cli') {
    return cliConfig
  }
  return clientConfig
})
