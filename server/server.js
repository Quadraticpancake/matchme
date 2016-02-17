require('babel-core/register');

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('../webpack.config.dev');

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);

const io = require('socket.io')(server);
// let createTables = require('../db/schemas.js').default;
// createTables();
module.exports = { app: app, io: io };
require('./multiplayer/gameRunner');
require('./sockets');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const compiler = webpack(config);
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
app.use(webpackHotMiddleware(compiler));

// Set up routes
require('./routes')(app, express);

app.use(express.static(path.join(__dirname, '../static')));

// Set up static files
// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, '..', '/index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Set up ports
const port = process.env.PORT || 3000;

server.listen(port, (error) => {
  if (error) {
    console.error(error);
  } else {
    console.info('==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.', port, port);
  }
});
