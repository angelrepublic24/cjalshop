const BranchOffice = require('../models/branchOffice');
const fs = require('fs');
const _ = require('underscore');
const path = require('path');

var controllers = {
    createBranchOffice: function(req, res){
        let body = req.body;

        let branchOffice = new BranchOffice({
            name: body.name,
            company: body.company,
            img: body.img,
            country: body.country,
            city: body.city,
            address: body.address,
            phone: body.phone
        });
        branchOffice.save((err, branchOfficeDB)=>{
            if(err) return res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al crear sucursal'
                }
            })
            if(!branchOfficeDB) res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encuentra esta variable'
                }
            })
           return res.json({
                ok: true,
                branchOffice: branchOfficeDB
            })
        })
    },
    getBranchOffice: function(req, res){
        let id = req.params.id

        BranchOffice.findById(id, (err, branchOfficeDB)=>{
            if(err) res.status(500).json({
                ok: false,
                err: {
                    message: 'Hubo un error'
                }
            })
            if(!branchOfficeDB) res.status(400).json({
                ok: false,
                err: {
                    message: 'No existe esta sucursal'
                }
            })
            return res.json({
                ok: true,
                 branchOfficeDB
            })

        })
    },
    getAllBranchOffice: function(req, res){
        BranchOffice.find({})
            .exec((err, branchOfficeDB)=>{
                if(err) res.status(500).json({
                    ok: false,
                    err: {
                        message: 'Ocurrio un error'
                    }
                })
                if(!branchOfficeDB) res.status(400).json({
                    ok: false,
                    err: {
                        message: 'No se encontro ninguna sucursal'
                    }
                })
                return res.json({
                    ok: true,
                    branchOfficeDB
                })
            })
    },
    updateBranchOffice: function(req, res){
        let id = req.params.id;
        let branchOfficeUpdate = req.body;

        BranchOffice.findByIdAndUpdate(id, branchOfficeUpdate, {new: true, runsValidators: true}, (err, branchOfficeDB)=>{
            if(err) res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al actualizar '
                }
            })
            if(!branchOfficeDB) res.status(400).json({
                ok: false,
                err: {
                    message: 'No se encontro este usuario'
                }
            })
            return res.json({
                ok: true,
                branchOfficeDB
            })
        })

    },
    removeBranchOffice: function(req, res){
        let id = req.params.id;

        BranchOffice.findByIdAndRemove(id, (err, branchOfficeRemoved)=>{
            if(err) res.status(500).json({
                ok: false,
                err: {
                    message: 'Error al eliminar sucursal'
                }
            })
            if(!branchOfficeRemoved) res.status(400).json({
                ok: false,
                err: {
                    message: 'Sucursal no encontrado'
                }
            })
            return res.json({
                ok: true,
                branchOfficeRemoved
            })
        })
    },
    uploadImage: function(req, res) {
        var branchOfficeId = req.params.id;
        var fileName = 'Imagen no subida...';

        if (req.files) {
            var filePath = req.files.image.path;
            var fileSplit = filePath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                BranchOffice.findByIdAndUpdate(branchOfficeId, { image: fileName }, { new: true }, (err, branchOfficeUpdated) => {
                    if (err) return res.status(500).send({ message: "La imagen no ha sido guardada" });
                    if (!companyUpdated) return res.status(404).send({ message: "La imagen no ha sido encontrada para guardar" });
                    return res.status(200).send({
                        branchOffice: branchOfficeUpdated
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