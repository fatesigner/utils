import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts', '!src/**/*.d.ts', '!src/**/*.spec.ts', '!src/**/*.test.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  tsconfig: 'tsconfig.build.json',
  outDir: 'dist',
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: false,
  preserveModules: true,
  preserveModulesRoot: 'src',
  outExtension({ format }) {
    return { js: format === 'cjs' ? '.cjs' : '.js' };
  }
});
