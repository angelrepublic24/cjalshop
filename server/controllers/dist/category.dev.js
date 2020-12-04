"use strict";

var Category = require('../models/category');

var fs = require('fs');

var _ = require('underscore');

var controllers = {
  createCategory: function createCategory(req, res) {
    var body = req.body;
    var category = new Category({
      description: body.description,
      user: body.user
    });
    category.save(function (err, categoryDB) {
      if (err) return res.status(500).send({
        message: 'Error al crear categoria'
      });
      if (!categoryDB) return res.status(400).send({
        message: 'No existe esta variable'
      });
      return res.status(200).json({
        ok: true,
        category: categoryDB,
        message: 'Catogoria creada con exito'
      });
    });
  },
  getCategory: function getCategory(req, res) {
    var id = req.params.id;
    Category.findById(id, function (err, categoryDB) {
      if (err) return res.status(500).send({
        message: 'Error al encontrar categoria'
      });
      if (err) return res.status(404).send({
        message: 'No existe este categoria'
      });
      return res.status(200).json({
        ok: true,
        categoryDB: categoryDB
      });
    });
  },
  getAllCategory: function getAllCategory(req, res) {
    Category.find({}).exec(function (err, categoryDB) {
      if (err) return res.status(500).send({
        message: 'Error al buscar todos las categorias'
      });
      if (!categoryDB) return res.status(404).send({
        message: 'Categorias no encontradas'
      });
      return res.status(200).json({
        ok: true,
        categoryDB: categoryDB
      });
    });
  },
  updateCategory: function updateCategory(req, res) {
    var idCategory = req.params.id;
    var categoryUpdate = req.body;
    Category.findByIdAndUpdate(idCategory, categoryUpdate, {
      "new": true,
      runValidators: true
    }, function (err, categoryUpdated) {
      if (err) return res.status(500).send({
        message: 'Error al actualizar la categoria'
      });
      if (!categoryUpdated) return res.status(404).send({
        message: 'No existe esta categoria para actualizar'
      });
      return res.status(200).json({
        ok: true,
        message: 'Usuario actualizado',
        category: categoryUpdated
      });
    });
  },
  deleteCategory: function deleteCategory(req, res) {
    var idCategory = req.params.id;
    Category.findByIdAndRemove(idCategory, function (err, categoryRemoved) {
      if (err) return res.status(500).send({
        message: "Error al borrar categoria"
      });
      if (!categoryRemoved) return res.status(404).send({
        message: "No existe la categoria para borrar"
      });
      return res.status(200).json({
        ok: true,
        category: categoryRemoved
      });
    });
  }
};
module.exports = controllers;