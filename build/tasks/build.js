/**
 * build
 * copy src files to output path
 */

const Gulp = require('gulp');
const Path = require('path');
const Merge = require('merge2');
const Log = require('fancy-log');
const Rename = require('gulp-rename');
const Ts = require('gulp-typescript');
const Webpack = require('webpack');
const Globby = require('globby');

Gulp.task('build', async function() {
  const ENV = require('../env')();

  // build esm
  const TsProject = Ts.createProject(Path.join(ENV.rootPath, 'tsconfig.json'), {
    declaration: true,
    declarationFiles: true,
    module: 'esnext'
  });
  const tsResult = await Gulp.src([
    Path.resolve(ENV.srcPath, '*.ts'),
    '!' + Path.resolve(ENV.srcPath, '**/*.d.ts'),
    '!' + Path.resolve(ENV.srcPath, '**/*.spec.ts')
  ]).pipe(TsProject());
  Merge([tsResult.dts.pipe(Gulp.dest(ENV.outputPath)), tsResult.js.pipe(Gulp.dest(ENV.outputPath))]);

  // build command.js
  const TsProjectCMD = Ts.createProject(Path.join(ENV.rootPath, 'tsconfig.json'), {
    declarationFiles: false,
    module: 'commonjs'
  });
  const tsResultCMD = await Gulp.src([
    Path.resolve(ENV.srcPath, '*.ts'),
    '!' + Path.resolve(ENV.srcPath, '**/*.d.ts'),
    '!' + Path.resolve(ENV.srcPath, '**/*.spec.ts'),
    '!' + Path.resolve(ENV.srcPath, '**/*.test.ts')
  ]).pipe(TsProjectCMD());
  Merge([
    tsResultCMD.js
      .pipe(
        Rename(function(path) {
          path.basename += '.cmd';
        })
      )
      .pipe(Gulp.dest(ENV.outputPath))
  ]);

  // build umd.js
  const files = Globby.sync([
    Path.resolve(ENV.srcPath, '*.ts').replace(/\\/g, '/'),
    '!' + Path.resolve(ENV.srcPath, '**/*.d.ts').replace(/\\/g, '/'),
    '!' + Path.resolve(ENV.srcPath, '**/*.spec.ts').replace(/\\/g, '/'),
    '!' + Path.resolve(ENV.srcPath, '**/*.test.ts').replace(/\\/g, '/')
  ]);
  await Promise.all(
    files.map(file => {
      const filename = Path.basename(file).replace(Path.extname(file), '');
      return runWebpack(
        {
          entry: file,
          amd: false,
          mode: 'production',
          context: ENV.srcPath,
          output: {
            path: ENV.outputPath,
            filename: `${filename}.umd.js`,
            library: `Utils_${filename.replace(/-/g, '_')}`,
            libraryTarget: 'umd'
          },
          module: {
            rules: [{ test: /\.ts?$/, loader: 'ts-loader' }]
          },
          resolve: {
            extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.css', '.scss']
          }
        },
        true
      );
    })
  );

  // copy other files to output
  await Gulp.src([Path.resolve(ENV.srcPath, '**/*'), '!' + Path.resolve(ENV.srcPath, '**/*.ts')], {
    base: Path.resolve(ENV.srcPath)
  }).pipe(Gulp.dest(ENV.outputPath));

  // copy typings
  await Gulp.src([Path.resolve(ENV.srcPath, 'typings', '**/*')], { base: Path.resolve(ENV.srcPath) }).pipe(
    Gulp.dest(ENV.outputPath)
  );

  // copy npm publish files to output
  await Gulp.src(['package.json', 'README.md'].map(x => Path.join(ENV.rootPath, x))).pipe(Gulp.dest(ENV.outputPath));
});

function runWebpack(options, isLog = false) {
  return new Promise(function(resolve, reject) {
    Webpack(options, (err, stats) => {
      if (err || (stats && stats.compilation && stats.compilation.errors && stats.compilation.errors.length)) {
        if (!err) {
          err = stats.compilation.errors[0];
        }
        reject(err);
        // throw new PluginError('webpack', err);
      } else {
        if (isLog) {
          Log('[webpack]', stats.toString({ colors: true }));
        }
        resolve(stats);
      }
    });
  });
}
