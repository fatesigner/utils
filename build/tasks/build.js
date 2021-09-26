/**
 * build
 * copy src files to output path
 */

const fs = require('fs');
const path = require('path');
const gulp = require('gulp');

require('./build-cjs');
require('./build-esm');
require('./clean');

gulp.task(
  'build',
  gulp.series('clean', gulp.parallel('build-cjs', 'build-esm'), async function () {
    const { OUTPUT_PATH, ROOT_PATH, SRC_PATH } = require('../constants');

    // Copy type.ts
    await new Promise((resolve) => {
      gulp
        .src([path.join(SRC_PATH, 'types/**/*.ts')], {
          allowEmpty: true,
          base: SRC_PATH
        })
        .pipe(gulp.dest(OUTPUT_PATH))
        .on('end', resolve);
    });

    // Copy other files to output
    await new Promise((resolve) => {
      gulp
        .src([path.join(SRC_PATH, '**/*'), '!' + path.join(SRC_PATH, '**/*.ts')])
        .pipe(gulp.dest(OUTPUT_PATH))
        .on('end', resolve);
    });

    // Copy npm publish files to output
    await new Promise((resolve) => {
      gulp
        .src(['README.md'].map((x) => path.join(ROOT_PATH, x)))
        .pipe(gulp.dest(OUTPUT_PATH))
        .on('end', resolve);
    });

    // Write package.json file to output
    const pkg = require('../../package.json');
    if (pkg.scripts) {
      pkg.scripts = Object.keys(pkg.scripts).reduce((prev, key) => {
        if (key !== 'prepare' || pkg.scripts[key].indexOf('husky install') < 0) {
          prev[key] = pkg.scripts[key];
        }
        return prev;
      }, {});
    }
    fs.writeFileSync(path.join(OUTPUT_PATH, 'package.json'), JSON.stringify(pkg, null, 2), { encoding: 'utf8' });
  })
);
