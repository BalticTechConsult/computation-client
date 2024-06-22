import { resolve } from 'path'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import dts from 'vite-plugin-dts'
import nodeExternals from 'rollup-plugin-node-externals'


const clientConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    nodeExternals(),
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
    }
  }
})

const cliConfig = defineConfig({
  plugins: [
    tsconfigPaths(),
    nodeExternals(),
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
    }
  }
})

export default defineConfig(({ mode }) => {
  if (mode === 'cli') {
    return cliConfig
  }
  return clientConfig
})
