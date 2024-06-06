import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'

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
      onwarn: (warning, warn) => {
        if (warning.code === 'EVAL') return;
        warn(warning);
      },
      external: [
        'tls',
        'net',
        'fs',
        'http2',
        'zlib',
        'http',
        'https',
        'stream',
        'crypto',
        'os',
        'path',
        'dns',
        'util',
        'events',
        'process',
        'url'
      ],
    }
  }
})

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
      onwarn: (warning, warn) => {
        if (warning.code === 'EVAL') return;
        warn(warning);
      },
      output: {
        entryFileNames: '[name].cjs',
      },
      external: [
        'node:process',
        'node:fs',
        'node:events',
        'node:child_process',
        'node:path',
        'tls',
        'process',
        'http2',
        'util',
        'net',
        'dns',
        'zlib',
        'events',
        'stream',
        'fs',
        'os',
        'http',
        'url',
        'path'
      ],
    }
  }
})

export default defineConfig(({ mode }) => {
  if (mode === 'cli') {
    return cliConfig
  }
  return clientConfig
})
