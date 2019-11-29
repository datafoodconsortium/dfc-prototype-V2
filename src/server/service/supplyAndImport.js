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
        await supplyModel.model.remove({});
        resolve({});
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllImport() {
    return new Promise(async (resolve, reject) => {
      try {
        let products = await importModel.model.find({
          supply: {
            $exists: false
          }
        });
        // console.log('products', products);
        resolve(products);
      } catch (e) {
        reject(e);
      }
    })
  }

  getOneImport(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await importModel.model.findOne({
          '@id': id
        });
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

        // console.log('supplies completed', supplies);
        resolve(supplies);
      } catch (e) {
        reject(e);
      }
    })
  }

  getOneSupply(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await supplyModel.model.findById(id).populate('imports');
        // console.log('products', products);
        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  updateOneSupply(supply) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await supplyModel.model.findById(supply._id).populate('imports');
        console.log(product);
        let newImports = supply.imports.filter(i => product.imports.filter(i2 => i2._id == i._id).length == 0);
        newImports.forEach(async i => {
          i.supply = product._id;
          await i.save();
          // await this.convertImportToSupply(i,product);
        })
        let oldImports = product.imports.filter(i => supply.imports.filter(i2 => i2._id == i._id).length == 0);
        oldImports.forEach(async i => {
          i.supply = undefined;
          await i.save();
        })
        product['DFC:description'] = supply['DFC:description'];
        product['DFC:quantity'] = supply['DFC:quantity'];
        product['DFC:hasUnit'] = supply['DFC:hasUnit'];
        product.imports = supply.imports;
        await product.save();

        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  convertAllImportToSupply(importsToConvert, entreprise) {
    return new Promise(async (resolve, reject) => {
      try {
        let inserted = importsToConvert.map(async i => {
          await this.convertImportToSupply(i, undefined, entreprise);
        })
        resolve(inserted)
      } catch (e) {
        reject(e);
      }
    })
  }

  convertImportIdToSupplyId(importId, supplyId, entreprise) {
    return new Promise(async (resolve, reject) => {
      let importItem = await importModel.model.findOne({
        '@id': importId
      });
      let supplyItem = await supplyModel.model.findById(supplyId);
      console.log('convertImportIdToSupplyId', importItem, supplyItem);
      let newSupply = await this.convertImportToSupply(importItem, supplyItem, entreprise);
      resolve(newSupply);
    })
  }

  convertImportToSupply(importToConvert, supply, entreprise) {
    return new Promise(async (resolve, reject) => {
      try {
        if (supply == undefined || supply == null) {
          console.log('convertImportToSupply new', importToConvert, importToConvert['DFC:description']);
          supply = {
            imports: [importToConvert.id],
            'DFC:description': importToConvert['DFC:description'],
            'DFC:quantity': importToConvert['DFC:quantity'],
            'DFC:hasUnit': importToConvert['DFC:hasUnit'],
            'DFC:suppliedBy': entreprise._id
          };
          console.log('convertImportToSupply supply', supply);
          supply = await supplyModel.model.create(supply);
        } else {
          supply.imports.push(importToConvert.id);
          await supply.save();
        }
        importToConvert.supply = supply.id;
        await importToConvert.save();
        resolve(supply);
      } catch (e) {
        reject(e);
      }
    })
  }

  importSource(source, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let entreprise = user['DFC:Entreprise'];
        // console.log('source', source, config.sources);
        let sourceObject = config.sources.filter(so => so.name == source)[0];
        console.log('url', source, sourceObject);
        request({
          url: sourceObject.url,
          json: true,
          headers: {
            'authorization': 'JTW '+user.accessToken
          }
        }, async (err, result, body) => {
          try {
            console.log('result.body', result.body);

            let supplies;
            if (sourceObject.version == "1.1") {
              supplies = result.body['DFC:Entreprise']['DFC:supplies'];
            } else if (sourceObject.version == "1.2") {
              supplies = result.body['DFC:supplies'];
            }

            let context = result.body['@context'] || result.body['@Context']
            supplies.forEach(s => {
              s.source = source;
              s['@id'] = `${context['@base']}${s['@id']}`
            })
            await importModel.model.remove({
              source: source
            });
            let inserted = await importModel.model.insertMany(supplies);
            let exinsting = await supplyModel.model.find({});
            // console.log("exinsting", exinsting);
            if (exinsting.length == 0) {
              this.convertAllImportToSupply(inserted, entreprise);
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
