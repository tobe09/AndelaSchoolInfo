var express = require("express");
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

var routes = require('./Controller/Router.js');
var router = routes.router;
app.use('/', router);

var server = app.listen(port, function () {
    console.log('Server now running on port: ' + server.address().port);
});