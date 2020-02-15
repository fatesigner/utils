const tslint = require('@fatesigner/eslint-config/ts');

module.exports = {
  extends: '@fatesigner/eslint-config',
  overrides: [
    tslint
  ]
}
