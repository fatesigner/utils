/**
 * build commonjs
 */

const path = require('path');
const gulp = require('gulp');
const merge = require('merge2');
const rename = require('gulp-rename');
const ts = require('gulp-typescript');

gulp.task('build-cjs', async function () {
  const env = require('../env')();

  // Build command.js
  const TsProjectCMD = ts.createProject(path.join(env.rootPath, 'tsconfig.json'), {
    declaration: false,
    module: 'commonjs'
  });

  const tsResultCMD = await gulp
    .src([path.resolve(env.srcPath, '**/*.ts'), '!' + path.resolve(env.srcPath, '**/*.d.ts'), '!' + path.resolve(env.srcPath, '**/*.spec.ts')])
    .pipe(TsProjectCMD());

  merge([
    tsResultCMD.js
      .pipe(
        rename(function (path) {
          path.basename += '.cmd';
        })
      )
      .pipe(gulp.dest(env.outputPath))
  ]);
});
