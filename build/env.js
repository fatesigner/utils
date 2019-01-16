/**
 * global
 */

const Path = require('path');

module.exports = function() {
  const rootPath = Path.resolve(__dirname, '..');
  const buildPath = Path.join(rootPath, 'build');
  const srcPath = Path.join(rootPath, 'src');
  const outputPath = Path.join(rootPath, 'dist');
  const nodeModulesPath = Path.resolve(rootPath, 'node_modules');
  return {
    rootPath,
    buildPath,
    srcPath,
    outputPath,
    nodeModulesPath
  };
};
