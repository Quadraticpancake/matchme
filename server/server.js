var webpack = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var config = require('../webpack.config')
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var compiler = webpack(config)
app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }))
app.use(webpackHotMiddleware(compiler))

//Set up routes
//require('./routes/index.js')(app, express);
// require('./server/routes')(app, express);

//Set up static files
// app.use(express.static(path.join(__dirname ,'../client')));
app.use(function(req, res) {
  res.sendFile(path.join(__dirname, '..', '/client/index.html'));
});

// Set up ports
var port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log('Server listening on port ' + port);
});


module.exports = app;
