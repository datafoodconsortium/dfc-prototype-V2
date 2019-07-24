'use strict';
const importModel = require('../ORM/import');
const supplyModel = require('../ORM/supply');
const request = require('request');
const config = require('./../../../configuration.js');

class SupplyAndImport {
  constructor() {}

  cleanImport() {
    return new Promise((resoleve, reject) => {
      try {
        await importModel.model.remove({});
        resolve({});
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllImport(){
    return new Promise((resoleve, reject) => {
      try {
        let products = await importModel.model.find({});
        console.log('products',products);
        resolve(products);
      } catch (e) {
        reject(e);
      }
    })
  }

  importSource(source) {
    return new Promise((resoleve, reject) => {
      try {
        console.log('source', source, this.config.sources);
        let sourceObject = this.config.sources.filter(so => so.name == source)[0];
        console.log('url', sourceObject.url);
        request(sourceObject.url, {
          json: true
        }, async (err, result, body) => {
          try {
            let supplies = result.body['DFC:Entreprise']['DFC:supplies'];
            supplies.forEach(s => {
              s.source = source;
            })
            await importModel.model.remove({
              source: source
            });
            let inserted = await importModel.model.insertMany(supplies);
            resolve(inserted)
          } catch (e) {
            reject(e);
          }
        })
      } catch (e) {
          reject(e);
      }
    })

  }

}

module.exports = new SupplyAndImport();
