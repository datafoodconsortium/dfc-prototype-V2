'use strict';
const mongo_client = require('./mongo_client');
const mongoose = require('mongoose');

class SupplyModel {
  constructor() {
    let mongoclient = mongo_client.getInstance();
    this._model = mongoclient.connection.model('supply', new mongoose.Schema({
      "DFC:description": {
        type: String,
        //required: true
      },
      "DFC:suppliedBy":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "entreprise"
      },
      "DFC:quantity": {
        type: Number,
        //required: true
      },
      "DFC:hasUnit": {
        type: mongoose.Schema.Types.Mixed,
        //required: true
      },
      "DFC:hasPivot": {
        type: mongoose.Schema.Types.ObjectId,
        ref: "representationPivot",
      },
      "DFC:hostedBy": {
        "DFC:name":{
          type: String,
          required: true
        }
      },
      "@type": {
        type: String,
        default: "DFC:SuppliedProduct",
        required: true
      },
      "user":{
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
      "@id": {
        type: String,
      }
    }, {
      strict: false
    }))
  }

  get model() {
    return this._model;
  }
}

module.exports = new SupplyModel();
