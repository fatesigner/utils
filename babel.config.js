/**
 * babel.config
 */

module.exports = {
  compact: false,
  sourceType: 'unambiguous',
  presets: [
    [
      '@babel/preset-env',
      {
        spec: false,
        loose: false,
        modules: false,
        debug: false,
        include: [],
        exclude: [],
        // 指示 babel 如何处理 api
        useBuiltIns: 'usage',
        corejs: {
          // 使用的 core-js 版本，推荐使用 v3
          version: 3,
          // 是否注入 proposal polyfill
          proposals: true
        },
        forceAllTransforms: false,
        ignoreBrowserslistConfig: false,
        shippedProposals: false
      }
    ],
    ['@babel/preset-typescript']
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: false,
        helpers: true,
        regenerator: false,
        useESModules: false,
        absoluteRuntime: false
      }
    ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true
      }
    ],
    [
      '@babel/plugin-proposal-class-properties',
      {
        /**
         * 指示编译类属性时，使用赋值表达式（loose: false）或者 Object.defineProperty（loose: true）
         */
        loose: false
      }
    ],
    ['@babel/plugin-proposal-object-rest-spread'],
    ['@babel/plugin-proposal-private-methods', { loose: false }]
  ]
};
