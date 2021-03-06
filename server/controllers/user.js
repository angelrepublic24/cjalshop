const User = require('../models/user');
const fs = require('fs')
require('../config/config')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const _ = require('underscore');

var controllers = {
    createUser: function(req, res){
        let body = req.body;

        var user = new User({
            name: body.name,
            lname: body.lname,
            email: body.email,
            password: bcrypt.hashSync(body.password, 10),
            birth: body.birth,
            sex: body.sex,
            phone: body.phone,
            role: body.role
        })

        user.save((err, userDB)=>{
            if(err) return res.status(500).json({
                ok: false,
                message: 'Error al crear usuario'
            })
            if(!userDB) return res.status(400).send({message: 'No existe esta variable'})

            var token = jwt.sign({
                user: userDB
              }, process.env.SECRET, {expiresIn: process.env.LIMIT_TOKEN});
            return res.status(200).json({
                ok: true,
                user: userDB,
                token,
                message: 'Usuario creado con exito'
            })
        })
    },

    getUser: function(req, res){
        let id = req.params.id

        User.findById(id, (err, userDB)=>{
            if(err) return res.status(500).send({message: 'Error al encontrar usuario'})
            if(!userDB) return res.status(404).send({message: 'No existe este usuario'})
            return res.status(200).json({
                ok:true,
                userDB
            })
        })
    },

    getAllUsers: function(req, res){
        User.find({})
            .exec((err, userDB)=>{
                if(err) return res.status(500).send({message: 'Error al buscar todos los usuarios'})
                if(!userDB) return res.status(404).send({message: 'Usuarios no encontrados'})

                return res.status(200).json({
                    ok: true,
                    userDB
                })
            })
    },

    updateUser: function(req, res){
        let idUser = req.params.id;
        let userUpdate = req.body;

        User.findByIdAndUpdate(idUser, userUpdate, {new:true, runValidators: true }, (err, userUpdated)=>{
            if(err) return res.status(500).send({message: 'Error al actualizar usuario'})
            if(!userUpdated) return res.status(404).send({message: 'No existe este usuario para actualizar'})
            return res.status(200).json({
                ok:true,
                message: 'Usuario actualizado',
                user: userUpdated
            })
        })

    },

    deleteUser: function(req, res){
        let idUser = req.params.id;

        User.findByIdAndRemove(idUser, (err, userRemoved) => {
            if (err) return res.status(500).send({ message: "Error al borrar usuario" });
            if (!userRemoved) return res.status(404).send({ message: "No existe el usuario para borrar" });

            return res.status(200).json({ 
                ok: true,
                user: userRemoved 
            });
        });
    },
    getProfile: function(req, res){
        User.findOne({_id: req.decoded.user.id}, (err, user)=>{
            res.json({
                ok: true,
                user,
                message: "Successful"
            })
        })
    },
    updateProfile: function(req, res, next){
        User.findOne({_id: req.decoded.user.id}, (err, user)=>{
            if (err) return next(err);

            if (req.body.name) user.name = req.body.name;
            if (req.body.email) user.email = req.body.email;
            if (req.body.password) user.password = req.body.password;

            user.save();
            res.json({
                ok: true,
                message: "Successfully edited your profile"
            })
        })
    }
}


module.exports = controllers