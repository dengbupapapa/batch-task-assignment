import baseConfig from './base.js';

baseConfig[1].output.file='./index.test.js';
baseConfig[1].output.sourceMap='inline';
export default baseConfig[1]