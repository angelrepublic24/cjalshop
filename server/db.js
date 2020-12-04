const mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(()=>{
            console.log("Conexion a la base de datos satisfactoriamente");

            app.listen(port, ()=>{
                console.log("Servidor corriendo correctamente en la url: localhost:3000");
            })


        })
        .catch((err)=>{
            console.log(err);
        })

module.exports = mongoose