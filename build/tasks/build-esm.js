/**
 * build esm module
 */

const path = require('path');
const gulp = require('gulp');
const merge = require('merge2');
const ts = require('gulp-typescript');

gulp.task('build-esm', async function () {
  const env = require('../env')();

  // Build esm module
  const tsProject = ts.createProject(path.join(env.rootPath, 'tsconfig.json'), {
    declaration: true
  });
  const tsResult = gulp
    .src(
      [
        path.join(env.srcPath, '**/*.ts'),
        '!' + path.join(env.srcPath, '**/types.ts'),
        '!' + path.join(env.srcPath, '**/*.d.ts'),
        '!' + path.join(env.srcPath, '**/*.spec.ts')
      ],
      {
        allowEmpty: true
      }
    )
    .pipe(tsProject(ts.reporter.fullReporter()))
    .on('error', () => {});
  merge([tsResult.dts.pipe(gulp.dest(env.outputPath)), tsResult.js.pipe(gulp.dest(env.outputPath))]);
});
