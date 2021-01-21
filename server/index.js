const mongoose = require('mongoose');
require('./config/config')
const app = require('./app')

mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.URLDB,{ useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
        .then(()=>{
            console.log("Conexion a la base de datos satisfactoriamente");

            app.listen(process.env.PORT, ()=>{
                console.log(`Servidor corriendo correctamente en la url: localhost:${process.env.PORT}`);
            })


        })
        .catch((err)=>{
            console.log(err);
        })


