"use strict";

var Company = require('../models/company');

var fs = require('fs');

var _ = require('underscore');

var controllers = {
  createCompany: function createCompany(req, res) {
    var body = req.body;
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
    });
    company.save(function (err, companyDB) {
      if (err) return res.status(500).send({
        message: 'Error al crear producto'
      });
      if (!companyDB) return res.status(400).send({
        message: 'No existe esta variable'
      });
      return res.status(200).json({
        ok: true,
        company: companyDB,
        message: 'Producto creada con exito'
      });
    });
  },
  getCompany: function getCompany(req, res) {
    var id = req.params.id;
    Company.findById(id, function (err, companyDB) {
      if (err) return res.status(500).send({
        message: 'Error al encontrar compañia'
      });
      if (!companyDB) return res.status(400).send({
        message: 'No existe esta compañia'
      });
      return res.status(200).json({
        ok: true,
        companyDB: companyDB
      });
    });
  },
  getAllCompany: function getAllCompany(req, res) {
    Company.find({}).exec(function (err, companyDB) {
      if (err) return res.status(500).send({
        message: 'Error al buscar todas las compañias'
      });
      if (!companyDB) return res.status(400).send({
        message: 'compañias no encontradas'
      });
      return res.status(200).json({
        ok: true,
        companyDB: companyDB
      });
    });
  },
  updateCompany: function updateCompany(req, res) {
    var idCompany = req.params.id;
    var companyUpdate = req.body;
    Company.findByIdAndUpdate(idCompany, companyUpdate, {
      "new": true,
      runValidators: true
    }, function (err, companyUpdated) {
      if (err) return res.status(500).send({
        message: 'Error al actualizar el producto'
      });
      if (!companyUpdated) return res.status(404).send({
        message: 'No existe este producto para actualizar'
      });
      return res.status(200).json({
        ok: true,
        message: 'Producto actualizado',
        company: companyUpdated
      });
    });
  },
  deleteCompany: function deleteCompany(req, res) {
    var idCompany = req.params.id;
    Company.findByIdAndRemove(idCompany, function (err, companyRemoved) {
      if (err) return res.status(500).send({
        message: "Error al borrar producto"
      });
      if (!companyRemoved) return res.status(404).send({
        message: "No existe el producto para borrar"
      });
      return res.status(200).json({
        ok: true,
        company: companyRemoved
      });
    });
  }
};
module.exports = controllers;