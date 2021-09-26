/**
 * build esm module
 */

const path = require('path');
const gulp = require('gulp');
const merge = require('merge2');
const ts = require('gulp-typescript');

gulp.task('build-esm', async function () {
  const { OUTPUT_PATH, ROOT_PATH, SRC_PATH } = require('../constants');

  // Build esm module
  const TsProject = ts.createProject(path.join(ROOT_PATH, 'tsconfig.json'), {
    declaration: true
  });
  const tsResult = gulp
    .src(
      [
        path.join(SRC_PATH, '**/*.ts'),
        '!' + path.join(SRC_PATH, '**/types.ts'),
        '!' + path.join(SRC_PATH, '**/*.d.ts'),
        '!' + path.join(SRC_PATH, '**/*.spec.ts')
      ],
      {
        allowEmpty: true
      }
    )
    .pipe(TsProject());
  merge([tsResult.dts.pipe(gulp.dest(OUTPUT_PATH)), tsResult.js.pipe(gulp.dest(OUTPUT_PATH))]);
});
