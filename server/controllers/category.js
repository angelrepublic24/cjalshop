const Category = require('../models/category')
const fs = require('fs')

const _ = require('underscore')

var controllers = {
    
    createCategory: function(req, res){
        let body = req.body;

        var category = new Category({
            description: body.description,
            user: body.user
        })

        category.save((err, categoryDB)=>{
            if(err) return res.status(500).send({message: 'Error al crear categoria'})
            if(!categoryDB) return res.status(400).send({message: 'No existe esta variable'})

            return res.json({
                ok: true,
                category: categoryDB,
                message: 'Categoria creada con exito'
            })
        })
    },

    getCategory: function(req, res){
        let id = req.params.id

        Category.findById(id, (err, categoryDB)=>{
            if(err) return res.status(500).send({message: 'Error al encontrar categoria'})
            if(!categoryDB) return res.status(404).send({message: 'No existe este categoria'})
            return res.status(200).json({
                ok:true,
                categoryDB
            })
        })
    },

    getAllCategory: function(req, res){
        Category.find({})
            .sort('description')
            .exec((err, categoryDB)=>{
                if(err) return res.status(500).send({message: 'Error al buscar todos las categorias'})
                if(!categoryDB) return res.status(404).send({message: 'Categorias no encontradas'})

                return res.status(200).json({
                    ok: true,
                    categoryDB
                })
            })
    },

    updateCategory: function(req, res){
        let idCategory = req.params.id;
        let categoryUpdate = req.body;

        Category.findByIdAndUpdate(idCategory, categoryUpdate, {new:true, runValidators: true }, (err, categoryUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar la categoria'})
            if(!categoryUpdated) return res.status(404).send({message: 'No existe esta categoria para actualizar'})
            return res.status(200).json({
                ok:true,
                message: 'Categoria actualizada',
                category: categoryUpdated
            })
        })

    },

    deleteCategory: function(req, res){
        let idCategory = req.params.id;

        Category.findByIdAndRemove(idCategory, (err, categoryRemoved) => {
            if (err) return res.status(500).send({ message: "Error al borrar categoria" });
            if (!categoryRemoved) return res.status(404).send({ message: "No existe la categoria para borrar" });

            return res.status(200).json({ 
                ok: true,
                category: categoryRemoved 
            });
        });
    }
}


module.exports = controllers