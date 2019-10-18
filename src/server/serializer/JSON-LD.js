'use strict';
// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');

class json_ldSerializer {
  constructor() {
    this.context = {
      "DFC": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#",
      "@base": "http://localhost:8080"
    };

    this.resourcePathMap={
      'DFC:Entreprise':'/entreprise/',
      'DFC:SuppliedProduct':'/supply/',
    }
  }

  serializeObject(data) {
    let out = {
      '@type': data['@type']
    };

    if (data['@id'] == undefined) {
      out['@id'] = this.resourcePathMap[data['@type']] + data._id;
    } else {
      out['@id'] = data['@id'];
    }

    switch (data['@type']) {
      case "DFC:Entreprise":
        out['DFC:description'] = data['DFC:description'];
        out['DFC:supplies'] = data['DFC:supplies'].map(s => this.serializeObject(s))
        break;
      case "DFC:SuppliedProduct":
        out['DFC:description'] = data['DFC:description'];
        out['DFC:hasUnit'] = data['DFC:hasUnit'];
        out['DFC:quantity'] = data['DFC:quantity'];
        break;
      default:
    }
    return out;
  }

  serialize(data) {

    let out = {
      "@context": this.context
    };
    let dataJson = this.serializeObject(data);
    Object.assign(out,dataJson);
    return out;
  }
}

module.exports = new json_ldSerializer();
