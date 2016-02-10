require("babel-core/register");

var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config.prod');

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
var server = require('http').Server(app);

var io = require('socket.io')(server);

module.exports = {app: app, io: io};
require('./sockets');

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// var compiler = webpack(config)
// app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
// app.use(webpackHotMiddleware(compiler))

//Set up routes
require('./routes')(app, express);

app.use(express.static(path.join(__dirname , '..')));

//Set up static files
// app.use(function(req, res) {
//   res.sendFile(path.join(__dirname, '..', '/index.html'));
// });
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});

// Set up ports
var port = process.env.PORT || 3000;

server.listen(port, function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
  }
})

