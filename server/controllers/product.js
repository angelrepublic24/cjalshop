const Product = require('../models/product')
const fs = require('fs')

const _ = require('underscore')

var controllers = {
    
    
    
    createProduct: function(req, res){
        let body = req.body;

        var product = new Product({
            description: body.description,
            model: body.model,
            size: body.size,
            price: body.price,
            img: body.img,
            company: body.company,
            category: body.category,
            subCategory: body.subCategory
        })

        product.save((err, productDB)=>{
            if(err) return res.status(500).send({message: 'Error al crear producto'})
            if(!productDB) return res.status(400).send({message: 'No existe esta variable'})

            return res.status(200).json({
                ok: true,
                product: productDB,
                message: 'Producto creada con exito'
            })
        })
    },

    getProduct: function(req, res){
        let id = req.params.id

        Product.findById(id, (err, productDB)=>{
            if(err) return res.status(500).send({message: 'Error al encontrar producto'})
            if(!productDB) return res.status(400).send({message: 'No existe este producto'})
            return res.status(200).json({
                ok:true,
                productDB
            })
        })
    },

    getAllProduct: function(req, res){
        Product.find({})
            .exec((err, productDB)=>{
                if(err) return res.status(500).send({message: 'Error al buscar todos las producto'})
                if(!productDB) return res.status(400).send({message: 'Productos no encontradas'})

                return res.status(200).json({
                    ok: true,
                    productDB
                })
            })
    },

    updateProduct: function(req, res){
        let idProduct = req.params.id;
        let productUpdate = req.body;

        Product.findByIdAndUpdate(idProduct, productUpdate, {new:true, runValidators: true }, (err, productUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar el producto'})
            if(!productUpdated) return res.status(404).send({message: 'No existe este producto para actualizar'})
            return res.status(200).json({
                ok:true,
                message: 'Producto actualizado',
                product: productUpdated
            })
        })

    },

    deleteProduct: function(req, res){
        let idProduct = req.params.id;

        Product.findByIdAndRemove(idProduct, (err, productRemoved) => {
            if (err) return res.status(500).send({ message: "Error al borrar producto" });
            if (!productRemoved) return res.status(404).send({ message: "No existe el producto para borrar" });

            return res.status(200).json({ 
                ok: true,
                product: productRemoved 
            });
        });
    },
    uploadImage: function(req, res) {
        var productId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Product.findByIdAndUpdate(productId, { image: fileName }, { new: true }, (err, productUpdated) => {
                    if (err) return res.status(500).send({ message: "La imagen no ha sido guardada" });
                    if (!productUpdated) return res.status(404).send({ message: "La imagen no ha sido encontrada para guardar" });
                    return res.status(200).send({
                        product: productUpdated
                    });
                });
            } else {

                fs.unlink(filePath, (err) => {
                    return res.status(200).send({ message: 'La extension no es valida' })
                })
            }
        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    }
}


module.exports = controllers