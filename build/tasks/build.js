/**
 * build
 * copy src files to output path
 */

const Gulp = require('gulp');
const Path = require('path');

Gulp.task('build', async function() {
  const ENV = require('../env')();

  // copy other files to output
  await Gulp.src([Path.resolve(ENV.srcPath, '**/*'), '!' + Path.resolve(ENV.srcPath, '**/*.spec.ts')]).pipe(
    Gulp.dest(ENV.outputPath)
  );

  // copy typings
  await Gulp.src([Path.resolve(ENV.srcPath, 'typings', '**/*')]).pipe(Gulp.dest(ENV.outputPath));

  // copy npm publish files to output
  await Gulp.src(['package.json', 'README.md'].map(x => Path.join(ENV.rootPath, x))).pipe(Gulp.dest(ENV.outputPath));
});
