"use strict";

var User = require('../models/user');

var fs = require('fs');

var bcrypt = require('bcrypt');

var _ = require('underscore');

var controllers = {
  createUser: function createUser(req, res) {
    var body = req.body;
    var user = new User({
      name: body.name,
      lname: body.lname,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
      img: body.img,
      status: body.status,
      google: body.google,
      role: body.role
    });
    user.save(function (err, userDB) {
      if (err) return res.status(500).send({
        message: 'Error al crear usuario'
      });
      if (!userDB) return res.status(400).send({
        message: 'No existe esta variable'
      });
      return res.status(200).json({
        ok: true,
        user: userDB,
        message: 'Usuario creado con exito'
      });
    });
  },
  getUser: function getUser(req, res) {
    var id = req.params.id;
    User.findById(id, function (err, userDB) {
      if (err) return res.status(500).send({
        message: 'Error al encontrar usuario'
      });
      if (!userDB) return res.status(404).send({
        message: 'No existe este usuario'
      });
      return res.status(200).json({
        ok: true,
        userDB: userDB
      });
    });
  },
  getAllUsers: function getAllUsers(req, res) {
    User.find({}).exec(function (err, userDB) {
      if (err) return res.status(500).send({
        message: 'Error al buscar todos los usuarios'
      });
      if (!userDB) return res.status(404).send({
        message: 'Usuarios no encontrados'
      });
      return res.status(200).json({
        ok: true,
        userDB: userDB
      });
    });
  },
  updateUser: function updateUser(req, res) {
    var idUser = req.params.id;
    var userUpdate = req.body;
    User.findByIdAndUpdate(idUser, userUpdate, {
      "new": true,
      runValidators: true
    }, function (err, userUpdated) {
      if (err) return res.status(500).send({
        message: 'Error al actualizar usuario'
      });
      if (!userUpdated) return res.status(404).send({
        message: 'No existe este usuario para actualizar'
      });
      return res.status(200).json({
        ok: true,
        message: 'Usuario actualizado',
        user: userUpdated
      });
    });
  },
  deleteUser: function deleteUser(req, res) {
    var idUser = req.params.id;
    User.findByIdAndRemove(idUser, function (err, userRemoved) {
      if (err) return res.status(500).send({
        message: "Error al borrar usuario"
      });
      if (!userRemoved) return res.status(404).send({
        message: "No existe el usuario para borrar"
      });
      return res.status(200).json({
        ok: true,
        user: userRemoved
      });
    });
  }
};
module.exports = controllers;