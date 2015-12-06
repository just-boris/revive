//add extra modules root
process.env.NODE_PATH = 'src';
module.constructor._initPaths();

//jasmine addons
global.joc = jasmine.objectContaining;
require('jasmine-collection-matchers');

//require hooks
require.extensions['.css'] = function () {};
require('babel-core/register');
