/**
 * clean
 * clean build dir
 */

const gulp = require('gulp');
const rimraf = require('rimraf');

gulp.task('clean', async function () {
  const { OUTPUT_PATH } = require('../constants');
  rimraf.sync(OUTPUT_PATH);
});
