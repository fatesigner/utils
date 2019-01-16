/**
 * clean
 * 清理 build 目录
 */

const Gulp = require('gulp');
const Rimraf = require('rimraf');

Gulp.task('clean', async function() {
  const ENV = require('../env')();
  Rimraf.sync(ENV.outputPath);
});

