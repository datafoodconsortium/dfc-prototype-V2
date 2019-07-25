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
    }, {
      strict: false
    }))
  }

  get model(){
    return this._model;
  }
}

module.exports = new ImportModel();
