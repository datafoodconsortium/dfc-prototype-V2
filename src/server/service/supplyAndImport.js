'use strict';
const importModel = require('../ORM/import');
const supplyModel = require('../ORM/supply');
const request = require('request');
const config = require('./../../../configuration.js');

class SupplyAndImport {
  constructor() {}

  cleanImport() {
    return new Promise(async (resolve, reject) => {
      try {
        await importModel.model.remove({});
        resolve({});
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllImport() {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await importModel.model.find({});
        // console.log('products', products);
        resolve(products);
      } catch (e) {
        reject(e);
      }
    })
  }

  getOneImport(id){
    return new Promise(async (resolve, reject) => {
      try {
        let product = await importModel.model.findOne({'@id':id});
        // console.log('products', products);
        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllSupply() {
    return new Promise(async (resolve, reject) => {
      try {
        console.warn('getAllSupply');
        let supplies = await supplyModel.model.find({}).populate('imports');
        // console.log('supplies', supplies);
        // supplies = supplies.forEach(async supply => {
        //   console.log('supply',supply);
        //   console.log('supply imports',supply['imports']);
        //   supply.imports = supply.imports.map(async i => {
        //     await importModel.findOne({
        //       _id: i
        //     })
        //   })
        // })

        console.log('supplies completed', supplies);
        resolve(supplies);
      } catch (e) {
        reject(e);
      }
    })
  }

  convertAllImportToSupply(importsToConvert) {
    return new Promise(async (resolve, reject) => {
      try {
        let inserted = importsToConvert.map(async i => {
          this.convertImportToSupply(i)
        })
        resolve(inserted)
      } catch (e) {
        reject(e);
      }
    })
  }

  convertImportToSupply(importToConvert) {
    return new Promise(async (resolve, reject) => {
      try {
        let supply = {
          imports: [importToConvert.id],
          'DFC:description': importToConvert['DFC:description']
        };
        let inserted = await supplyModel.model.create(supply);
        importToConvert.set('supply', inserted.id)
        // importToConvert.supply=inserted.id;
        await importToConvert.save();
        // await importModel.model.update(importToConvert);
        resolve(inserted);
      } catch (e) {
        reject(e);
      }
    })
  }

  importSource(source) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log('source', source, config.sources);
        let sourceObject = config.sources.filter(so => so.name == source)[0];
        console.log('url', source, sourceObject);
        request(sourceObject.url, {
          json: true
        }, async (err, result, body) => {
          try {
            let supplies = result.body['DFC:Entreprise']['DFC:supplies'];
            supplies.forEach(s => {
              s.source = source;
              s['@id']=`${result.body['@context']['@base']}${s['@id']}`
            })
            await importModel.model.remove({
              source: source
            });
            let inserted = await importModel.model.insertMany(supplies);
            let exinsting = await supplyModel.model.find({});
            console.log("exinsting", exinsting);
            if (exinsting.length == 0) {
              this.convertAllImportToSupply(inserted);
            }

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

module.exports = SupplyAndImport;
