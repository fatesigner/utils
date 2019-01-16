/**
 * gulpfile
 */

const Path = require('path');
const RequireDir = require('require-dir');

// 工作目录改为根目录
process.chdir(Path.join(__dirname, '..'));

RequireDir('./tasks');
