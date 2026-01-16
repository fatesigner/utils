const { spawnSync } = require('child_process');

function run() {
  const env = {
    ...process.env,
    GITHUB_TOKEN: process.env.GITHUB_TOKEN || process.env.GH_TOKEN || '',
    NPM_TOKEN: process.env.NPM_TOKEN || ''
  };

  if (!env.GITHUB_TOKEN || !env.NPM_TOKEN) {
    console.error('缺少环境变量：需要设置 GITHUB_TOKEN（或 GH_TOKEN）与 NPM_TOKEN。');
    console.error('示例（PowerShell）：');
    console.error('  $env:GITHUB_TOKEN=\"...\"');
    console.error('  $env:NPM_TOKEN=\"...\"');
    process.exit(1);
  }

  let status = 1;
  try {
    const isWin = process.platform === 'win32';
    const result = isWin
      ? spawnSync('cmd.exe', ['/c', 'npx', 'semantic-release', '--dry-run', '--no-ci'], {
          stdio: 'inherit',
          env
        })
      : spawnSync('npx', ['semantic-release', '--dry-run', '--no-ci'], {
          stdio: 'inherit',
          env
        });
    if (result.error) {
      console.error('执行失败：', result.error);
    }
    if (result.status === null) {
      console.error('执行失败：无法获取退出码。');
    }
    status = result.status ?? 1;
  } finally {
    delete process.env.GITHUB_TOKEN;
    delete process.env.GH_TOKEN;
    delete process.env.NPM_TOKEN;
  }

  process.exit(status);
}

run();
