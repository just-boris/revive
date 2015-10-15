var browserSync = require('browser-sync').create();
var webpack = require('webpack');

var bundle = webpack(require('../webpack.config'));

bundle.watch({}, (err, stats) => {
    console.log(stats.toString({colors: true}));
});

browserSync.init({
    server: {
        baseDir: 'build'
    },
    files: ['build/**']
});
