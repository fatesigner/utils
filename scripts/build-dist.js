const fs = require('fs');
const path = require('path');

const rootPath = path.resolve(__dirname, '..');
const srcPath = path.join(rootPath, 'src');
const distPath = path.join(rootPath, 'dist');

function ensureDir(targetPath) {
  fs.mkdirSync(targetPath, { recursive: true });
}

function copyFile(srcFile, destFile) {
  ensureDir(path.dirname(destFile));
  fs.copyFileSync(srcFile, destFile);
}

function copyDirFiles(dirPath, handler) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      copyDirFiles(fullPath, handler);
      return;
    }
    handler(fullPath);
  });
}

function copyReadme() {
  const readmePath = path.join(rootPath, 'README.md');
  if (fs.existsSync(readmePath)) {
    copyFile(readmePath, path.join(distPath, 'README.md'));
  }
}

function writePackageJson() {
  const pkgPath = path.join(rootPath, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  if (pkg.scripts) {
    pkg.scripts = Object.keys(pkg.scripts).reduce((prev, key) => {
      if (key !== 'prepare' || pkg.scripts[key].indexOf('husky install') < 0) {
        prev[key] = pkg.scripts[key];
      }
      return prev;
    }, {});
  }
  const stripDistPrefix = (value) => {
    if (typeof value !== 'string') {
      return value;
    }
    return value.replace(/^\.?\/?dist\//, './');
  };
  if (pkg.main) {
    pkg.main = stripDistPrefix(pkg.main).replace(/^\.\//, '');
  }
  if (pkg.module) {
    pkg.module = stripDistPrefix(pkg.module).replace(/^\.\//, '');
  }
  if (pkg.types) {
    pkg.types = stripDistPrefix(pkg.types).replace(/^\.\//, '');
  }
  if (pkg.exports) {
    const mapEntry = (entry) => {
      if (typeof entry === 'string') {
        return stripDistPrefix(entry);
      }
      if (entry && typeof entry === 'object') {
        const next = {};
        Object.keys(entry).forEach((key) => {
          next[key] = mapEntry(entry[key]);
        });
        return next;
      }
      return entry;
    };
    pkg.exports = mapEntry(pkg.exports);
  }
  ensureDir(distPath);
  fs.writeFileSync(path.join(distPath, 'package.json'), JSON.stringify(pkg, null, 2), 'utf8');
}

function copyDts() {
  if (!fs.existsSync(srcPath)) {
    return;
  }
  copyDirFiles(srcPath, (fullPath) => {
    if (!fullPath.endsWith('.d.ts')) {
      return;
    }
    if (fullPath.includes(`${path.sep}types${path.sep}`)) {
      return;
    }
    const relPath = path.relative(srcPath, fullPath);
    copyFile(fullPath, path.join(distPath, relPath));
  });
}

function copyNonTsAssets() {
  if (!fs.existsSync(srcPath)) {
    return;
  }
  copyDirFiles(srcPath, (fullPath) => {
    if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
      return;
    }
    const relPath = path.relative(srcPath, fullPath);
    copyFile(fullPath, path.join(distPath, relPath));
  });
}

copyReadme();
writePackageJson();
copyDts();
copyNonTsAssets();
