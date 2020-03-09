'use strict';
const mongo_client = require('./mongo_client');
const mongoose = require('mongoose');

class RepresentationPivotModel {
  constructor() {
    let mongoclient = mongo_client.getInstance();
    this._model = mongoclient.connection.model('representationPivot', new mongoose.Schema({
      "DFC:represent": [{
        type: mongoose.Schema.Types.ObjectId,
        default: [],
        ref: "supply"
      }],
      "@type": {
        type: String,
        default: "DFC:RepresentationPivot",
        required: true
      },
      "@id": {
        type: String
      }
    }, {
      strict: false
    }))
  }

  get model() {
    return this._model;
  }
}

module.exports = new RepresentationPivotModel();
