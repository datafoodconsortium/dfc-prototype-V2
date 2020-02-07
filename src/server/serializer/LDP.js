'use strict';
// const mongo_client = require('./mongo_client');
const json_ldSerializer = require('./JSON-LD.js');

class ldpSerializer {
  constructor() {

  }

  serialize(data, res) {

    let out = json_ldSerializer.serialize(data)
    out['@id'] = '/data/core/me/entrepriseLDP'
    // return out;


    return {
      "@context": {
        "DFC": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#",
      },
      "@id": "http://localhost:8080/data/core/entrepriseLDP/5da83c675417a50a1250ee08",
      "@type": "DFC:Entreprise",
      "DFC:description" : "maPetiteEntreprise",
      "DFC:supplies": [{
          "@id": "http://localhost:8080/data/core/suppliedProduct/item1",
          "DFC:hasUnit": {
            "@id": "/unit/unit"
          },
          "DFC:quantity": "1",
          "DFC:description": "Aillet botte 1 pièce"
        },
        {
          "@id": "http://localhost:8080/data/core/suppliedProduct/item2",
          "DFC:hasUnit": {
            "@id": "/unit/kg"
          },
          "DFC:quantity": "1",
          "DFC:description": "Blette 1 kg"
        }
      ]
    }
  }
}

module.exports = new ldpSerializer();
