"use strict";

var Product = require('../models/product');

var fs = require('fs');

var _ = require('underscore');

var controllers = {
  createProduct: function createProduct(req, res) {
    var body = req.body;
    var product = new Product({
      name: body.name,
      img: body.img,
      description: body.description,
      company: body.company,
      category: body.category
    });
    product.save(function (err, productDB) {
      if (err) return res.status(500).send({
        message: 'Error al crear producto'
      });
      if (!productDB) return res.status(400).send({
        message: 'No existe esta variable'
      });
      return res.status(200).json({
        ok: true,
        product: productDB,
        message: 'Producto creada con exito'
      });
    });
  },
  getProduct: function getProduct(req, res) {
    var id = req.params.id;
    Product.findById(id, function (err, productDB) {
      if (err) return res.status(500).send({
        message: 'Error al encontrar producto'
      });
      if (!productDB) return res.status(400).send({
        message: 'No existe este producto'
      });
      return res.status(200).json({
        ok: true,
        productDB: productDB
      });
    });
  },
  getAllProduct: function getAllProduct(req, res) {
    Product.find({}).exec(function (err, productDB) {
      if (err) return res.status(500).send({
        message: 'Error al buscar todos las producto'
      });
      if (!productDB) return res.status(400).send({
        message: 'Productos no encontradas'
      });
      return res.status(200).json({
        ok: true,
        productDB: productDB
      });
    });
  },
  updateProduct: function updateProduct(req, res) {
    var idProduct = req.params.id;
    var productUpdate = req.body;
    Product.findByIdAndUpdate(idProduct, productUpdate, {
      "new": true,
      runValidators: true
    }, function (err, productUpdated) {
      if (err) return res.status(500).send({
        message: 'Error al actualizar el producto'
      });
      if (!productUpdated) return res.status(404).send({
        message: 'No existe este producto para actualizar'
      });
      return res.status(200).json({
        ok: true,
        message: 'Producto actualizado',
        product: productUpdated
      });
    });
  },
  deleteProduct: function deleteProduct(req, res) {
    var idProduct = req.params.id;
    Product.findByIdAndRemove(idProduct, function (err, productRemoved) {
      if (err) return res.status(500).send({
        message: "Error al borrar producto"
      });
      if (!productRemoved) return res.status(404).send({
        message: "No existe el producto para borrar"
      });
      return res.status(200).json({
        ok: true,
        product: productRemoved
      });
    });
  }
};
module.exports = controllers;