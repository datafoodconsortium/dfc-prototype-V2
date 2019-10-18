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

    // return {
    //   "@context": {
    //     "DFC": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#",
    //     "rdf": "http://www.w3.org/1999/02/22-rdf-syntax-ns#",
    //     "rdfs": "http://www.w3.org/2000/01/rdf-schema#",
    //     "xsd": "http://www.w3.org/2001/XMLSchema#"
    //   },
    //   "@graph": [{
    //     "@id": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#Entreprise"
    //   }, {
    //     "@id": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"
    //   }, {
    //     "@id": "http://localhost:8080/data/core/entrepriseLDP/5da83c675417a50a1250ee08",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#Entreprise"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "maPetiteEntreprise"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#supplies": [{
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2a"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2b"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2c"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2d"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2e"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2f"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee30"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee31"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee32"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee33"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee34"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee35"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee36"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee37"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee38"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee39"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3a"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3b"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3c"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3d"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3e"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3f"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee40"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee41"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee42"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee43"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee44"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee45"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee46"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee47"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee48"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee49"
    //     }, {
    //       "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee4a"
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2a",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Caviar de courgettes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2b",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Houmous de betteraves"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2c",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Le tartinable Chou'prême"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.09
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2d",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Potimarron Curry"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2e",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Rillettes de champignon"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.09
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee2f",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Tartin'algues de carottes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee30",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Green ketchup"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee31",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "ketchup de betteraves"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee32",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Pesto de courgettes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee33",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Pesto vegan"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee34",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Achards de légumes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee35",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Chutney de potimarrons"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee36",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Chutney de tomates vertes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee37",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Curry d'oignons"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.14
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee38",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Coffret \" on a du pot \""
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee39",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Coffret \"Green cooking\""
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3a",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Coffret \"voyage voyage\""
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3b",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Coffret 4 tartinables"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3c",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Coffret signature \"adieu veaux vaches pâtés\""
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 1
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3d",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de betteraves"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3e",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de brocolis"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee3f",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "purée de Butternut"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee40",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de carottes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee41",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de courgettes"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee42",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de patate douce"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee43",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de potimarron"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.13
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee44",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée butternut lentilles corail"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee45",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de betteraves et de quinoa"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee46",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de brocoli et de riz"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee47",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée de courgettes et pois cassés"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee48",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Purée patate douce quinoa carotte"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.2
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee49",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Soupe de potimarron au gingembre"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.75
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/supply/5da83ca85417a50a1250ee4a",
    //     "@type": ["http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#SuppliedProduct"],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#description": [{
    //       "@value": "Velouté de courgettes à la menthe"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#hasUnit": [{
    //       "@id": "http://localhost:8080/unit/u"
    //     }],
    //     "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#quantity": [{
    //       "@value": 0.75
    //     }]
    //   }, {
    //     "@id": "http://localhost:8080/unit/u"
    //   }]
    // }
  }
}

module.exports = new ldpSerializer();
