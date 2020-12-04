
process.env.PORT = process.env.PORT || 3000;

process.env.NODE_ENV = process.env.NODE_ENV || 'env';


process.env.LIMIT_TOKEN = '48h'
process.env.SECRET = process.env.SECRET || 'secret'




let urlDB

if(process.env.NODE_ENV === 'env'){
    urlDB = 'mongodb://localhost:27017/cjalshop'
}else{
    urlDB = process.env.MONGO_DB;
}

process.env.URLDB = urlDB
