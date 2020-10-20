const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./Controller/Router.js');
const router = routes.router;
app.use('/', router);

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    console.log('Server now running on port: ' + server.address().port);
});