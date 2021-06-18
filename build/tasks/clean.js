/**
 * clean
 * 清理 build 目录
 */

const Gulp = require('gulp');
const Rimraf = require('rimraf');

Gulp.task('clean', async function () {
  const env = require('../env')();
  Rimraf.sync(env.outputPath);
});
