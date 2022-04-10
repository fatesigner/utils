/**
 * jest.babel
 */

const { default: transformer } = require('babel-jest');

const babelOptions = require('./babel.test.config');

module.exports = transformer.createTransformer(babelOptions);
