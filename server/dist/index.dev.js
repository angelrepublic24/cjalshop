"use strict";

require('./config/config');

var mongoose = require('mongoose');

var app = require('./app');

var port = 3000;

var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/cjalshop", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(function () {
  console.log("Conexion a la base de datos satisfactoriamente");
  app.listen(port, function () {
    console.log("Servidor corriendo correctamente en la url: localhost:3000");
  });
})["catch"](function (err) {
  console.log(err);
});