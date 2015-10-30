/*eslint-env node*/
const webpack = require('webpack');
const config = require('../webpack.config').factory(true);
const webpackDevServer = require('webpack-dev-server');
const port = process.env.PORT || 3000;

config.entry.unshift(`webpack-dev-server/client?http://localhost:${port}`, 'webpack/hot/dev-server');
const compiler = webpack(config);
const server = new webpackDevServer(compiler, {
    contentBase: './target/www',
    stats: { colors: true },
    inline: true,
    hot: true
});
server.listen(port);
