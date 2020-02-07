'use strict';
const mongo_client = require('./mongo_client');
const mongoose = require('mongoose');

class ImportModel {
  constructor() {
    let mongoclient = mongo_client.getInstance();
    this._model = mongoclient.connection.model('import', new mongoose.Schema({
      supply: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "supply"
      },
      "DFC:description": {
        type: String,
        //required: true
      },
      "DFC:quantity": {
        type: Number,
        //required: true
      },
      "DFC:hasUnit": {
        type: mongoose.Schema.Types.Mixed,
        //required: true
      },
      "@type": {
        type: String,
        default: "DFC:SuppliedProduct",
        required: true
      },
      "source": {
        type: String,
        //required: true
      },
      "@id": {
        type: String,
        //required: true
      },
    }, {
      strict: false
    }))
  }

  get model() {
    return this._model;
  }
}

module.exports = new ImportModel();
