const Company = require('../models/company');
const fs = require('fs');
const path = require('path');

const _ = require('underscore');

var controllers = {
    
    
    
    createCompany: function(req, res){
        let body = req.body;

        var company = new Company({
            name: body.name,
            img: body.img,
            category: body.category,
            country: body.country,
            state: body.state,
            city: body.city,
            address: body.address,
            phone: body.phone,
            user: body.user

        })

        company.save((err, companyDB)=>{
            if(err) return res.status(500).send({message: 'Error al crear compañia'})
            if(!companyDB) return res.status(400).send({message: 'No existe esta variable'})

            return res.status(200).json({
                ok: true,
                company: companyDB,
                message: 'Compañia creada con exito'
            })
        })
    },

    getCompany: function(req, res){
        let id = req.params.id

        Company.findById(id, (err, companyDB)=>{
            if(err) return res.status(500).send({message: 'Error al encontrar compañia'})
            if(!companyDB) return res.status(400).send({message: 'No existe esta compañia'})
            return res.status(200).json({
                ok:true,
                companyDB
            })
        })
    },

    getAllCompany: function(req, res){
        Company.find({})
            .exec((err, companyDB)=>{
                if(err) return res.status(500).send({message: 'Error al buscar todas las compañias'})
                if(!companyDB) return res.status(400).send({message: 'compañias no encontradas'})

                return res.status(200).json({
                    ok: true,
                    companyDB
                })
            })
    },

    updateCompany: function(req, res){
        let idCompany = req.params.id;
        let companyUpdate = req.body;

        Company.findByIdAndUpdate(idCompany, companyUpdate, {new:true, runValidators: true }, (err, companyUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar el producto'})
            if(!companyUpdated) return res.status(404).send({message: 'No existe este producto para actualizar'})
            return res.status(200).json({
                ok:true,
                message: 'Producto actualizado',
                company: companyUpdated
            })
        })

    },

    deleteCompany: function(req, res){
        let idCompany = req.params.id;

        Company.findByIdAndRemove(idCompany, (err, companyRemoved) => {
            if (err) return res.status(500).send({ message: "Error al borrar producto" });
            if (!companyRemoved) return res.status(404).send({ message: "No existe el producto para borrar" });

            return res.status(200).json({ 
                ok: true,
                company: companyRemoved 
            });
        });
    },
    uploadImage: function(req, res) {
        var companyId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Company.findByIdAndUpdate(companyId, { image: fileName }, { new: true }, (err, companyUpdated) => {
                    if (err) return res.status(500).send({ message: "La imagen no ha sido guardada" });
                    if (!companyUpdated) return res.status(404).send({ message: "La imagen no ha sido encontrada para guardar" });
                    return res.status(200).send({
                        company: companyUpdated
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