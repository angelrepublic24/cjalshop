const express = require('express');
const path = require('path')
const morgan = require('morgan');    
const cors = require('cors');


const bodyParser = require('body-parser')

const app = express();

app.use(express.static(__dirname + '/public'));


// Middleware
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(morgan('dev'));
app.use(cors());

// Cargar Rutas
var user_router = require('./routes/user')
var login_router = require('./routes/login')
var company_router = require('./routes/company')
var category_router = require('./routes/category')
var subCategory_router = require('./routes/subCategory')
var product_router = require('./routes/product')
var branchOffice_router = require('./routes/branchOffice')






// CORS
// Configurar cabeceras y cors
// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//     res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//     next();
// });


// Rutas
app.use('/api', user_router);
app.use('/api', login_router);
app.use('/api', company_router);
app.use('/api', category_router);
app.use('/api', product_router);
app.use('/api', subCategory_router);
app.use('/api', branchOffice_router);




module.exports = app;