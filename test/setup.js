/*eslint-env jasmine*/
require('babel-core/register');
require('jasmine-collection-matchers');
global.self = global;

global.joc = jasmine.objectContaining;

require.extensions['.css'] = function () {};
