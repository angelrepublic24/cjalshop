"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var productSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  img: {
    type: String,
    required: false
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  company: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Company'
  },
  category: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Category'
  }
});