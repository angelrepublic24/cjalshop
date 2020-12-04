const SubCategory = require('../models/subCategory')
const fs = require('fs');


var controllers = {
    
    createSubCategory: function(req, res){
        let body = req.body;

        var subCategory = new SubCategory({
            description: body.description,
            category: body.category
        })

        subCategory.save((err, subCategoryDB)=>{
            if(err) return res.status(500).send({message: 'Error al crear sub-categoria'})
            if(!subCategoryDB) return res.status(400).send({message: 'No existe esta variable'})

            return res.json({
                ok: true,
                subCategory: subCategoryDB,
                message: 'Categoria creada con exito'
            })
        })
    },

    getSubCategory: function(req, res){
        let id = req.params.id

        SubCategory.findById(id, (err, subCategoryDB)=>{
            if(err) return res.status(500).send({message: 'Error al encontrar sub-categoria'})
            if(!subCategoryDB) return res.status(404).send({message: 'No existe este sub-categoria'})
            return res.status(200).json({
                ok:true,
                subCategoryDB
            })
        })
    },

    getAllSubCategory: function(req, res){
        SubCategory.find({})
            .exec((err, subCategoryDB)=>{
                if(err) return res.status(500).send({message: 'Error al buscar todos las categorias'})
                if(!subCategoryDB) return res.status(404).send({message: 'Categorias no encontradas'})

                return res.status(200).json({
                    ok: true,
                    subCategoryDB
                })
            })
    },

    updateSubCategory: function(req, res){
        let idSubCategory = req.params.id;
        let SubcategoryUpdate = req.body;

        SubCategory.findByIdAndUpdate(idSubCategory, SubcategoryUpdate, {new:true, runValidators: true }, (err, subCategoryUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar la categoria'})
            if(!categoryUpdated) return res.status(404).send({message: 'No existe esta categoria para actualizar'})
            return res.status(200).json({
                ok:true,
                message: 'Sub-categoria actualizada',
                SubCategory: subCategoryUpdated
            })
        })

    },

    deleteSubCategory: function(req, res){
        let idSubCategory = req.params.id;

        SubCategory.findByIdAndRemove(idSubCategory, (err, subCategoryRemoved) => {
            if (err) return res.status(500).send({ message: "Error al borrar sub-categoria" });
            if (!categoryRemoved) return res.status(404).send({ message: "No existe la sub-categoria para borrar" });

            return res.status(200).json({ 
                ok: true,
                subCategory: subCategoryRemoved 
            });
        });
    }
}


module.exports = controllers