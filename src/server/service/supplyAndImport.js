'use strict';
const importModel = require('../ORM/import');
const supplyModel = require('../ORM/supply');
const representationPivotModel = require('../ORM/representationPivot');
const request = require('request');
const config = require('./../../../configuration.js');
const fetch = require('node-fetch');

class SupplyAndImport {
  constructor() {}

  cleanImport(user) {
    return new Promise(async (resolve, reject) => {
      try {
        let supplies=await supplyModel.model.find({user:user._id}).populate("DFC:hasPivot");
        supplies.forEach(async s=>{
          await importModel.model.deleteMany({'DFC:represent':s._id});
        })
        await supplyModel.model.remove({user:user._id});
        resolve({});
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllImport(user) {
    return new Promise(async (resolve, reject) => {
      try {
        console.warn('getAllSupply');
        let supplies = await supplyModel.model.find({
          "DFC:hasPivot": {
            $exists: false
          },
          user: user._id
        });
        // console.log("supplies", supplies);
        resolve(supplies);
      } catch (e) {
        reject(e);
      }
    })
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
        let product = await supplyModel.model.findOne({
          '@id': id
        });
        // console.log('products', products);
        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  getAllSupply(user) {
    return new Promise(async (resolve, reject) => {
      try {
        console.warn('getAllSupply');
        let supplies = await supplyModel.model.find({
          "DFC:hostedBy": {
            "DFC:name": "DFC"
          },
          user: user._id
        }).populate({
          path: 'DFC:hasPivot',
          populate: {
            path: 'DFC:represent'
          }
        });


        // console.log("supplies", supplies);
        supplies.forEach(async s => {
          s["DFC:hasPivot"]["DFC:represent"] = s["DFC:hasPivot"]["DFC:represent"].filter(s => s["DFC:hostedBy"]["DFC:name"] !== "DFC")
        });

        resolve(supplies);
      } catch (e) {
        reject(e);
      }
    })
  }

  getOneSupply(id) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await supplyModel.model.findById(id).populate({
          path: 'DFC:hasPivot',
          populate: {
            path: 'DFC:represent'
          }
        });
        product["DFC:hasPivot"]["DFC:represent"] = product["DFC:hasPivot"]["DFC:represent"].filter(s => s["DFC:hostedBy"]["DFC:name"] !== product["DFC:hostedBy"]["DFC:name"])
        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  updateOneSupply(supply) {
    return new Promise(async (resolve, reject) => {
      try {
        let product = await supplyModel.model.findById(supply._id).populate({
          path: 'DFC:hasPivot',
          populate: {
            path: 'DFC:represent'
          }
        });

        let oldRepresent = product["DFC:hasPivot"]["DFC:represent"].filter(i => {
          if(i["@id"]==product["@id"]){
            return false;
          }else {
            return supply["DFC:hasPivot"]["DFC:represent"].filter(i2 => i2._id == i._id).length == 0
          }
        });
        oldRepresent.forEach(async r=> {
          let unlinkProduct = await supplyModel.model.findById(r._id)
          unlinkProduct["DFC:hasPivot"]=undefined;
          unlinkProduct.save();
          // pivot["DFC:represent"].push(newRepresent._id);
          // await pivot.save();
        })

        // let pivot = await representationPivotModel.model.findById(supply["DFC:pivot"]._id);
        let pivot=product["DFC:hasPivot"];
        pivot["DFC:represent"]=supply["DFC:hasPivot"]["DFC:represent"];
        await pivot.save();

        // let newRepresent = supply["DFC:pivot"]["DFC:represent"].filter(i => {
        //   return i => product.["DFC:pivot"]["DFC:represent"].filter(i2 => i2._id == i._id).length == 0
        // });
        // newRepresent.forEach(async i => {
        //   pivot["DFC:represent"].push(newRepresent._id);
        //   await pivot.save();
        // })
        // let oldRepresent = product["DFC:pivot"]["DFC:represent"].filter(i => {
        //   return i => supply.["DFC:pivot"]["DFC:represent"].filter(i2 => i2._id == i._id).length == 0
        // });
        // oldRepresent.forEach(async i => {
        //   pivot["DFC:represent"].push(newRepresent._id);
        //   await pivot.save();
        // })
        //
        // let oldImports = product.imports.filter(i => supply.imports.filter(i2 => i2._id == i._id).length == 0);
        // oldImports.forEach(async i => {
        //   i.supply = undefined;
        //   await i.save();
        // })
        product['DFC:description'] = supply['DFC:description'];
        product['DFC:quantity'] = supply['DFC:quantity'];
        product['DFC:hasUnit'] = supply['DFC:hasUnit'];
        // product.imports = supply.imports;
        await product.save();

        resolve(product);
      } catch (e) {
        reject(e);
      }
    })
  }

  convertAllImportToSupply(importsToConvert, user) {
    return new Promise(async (resolve, reject) => {
      try {
        let inserted = importsToConvert.map(async i => {
          await this.convertImportToSupply(i, undefined, user);
        })
        resolve(inserted)
      } catch (e) {
        reject(e);
      }
    })
  }

  convertImportIdToSupplyId(importId, supplyId, user) {
    return new Promise(async (resolve, reject) => {
      let importItem = await supplyModel.model.findOne({
        '@id': importId
      });
      let supplyItem = await supplyModel.model.findById(supplyId).populate("DFC:hasPivot");
      // console.log('convertImportIdToSupplyId', importItem, supplyItem);
      let newSupply = await this.convertImportToSupply(importItem, supplyItem, user);
      resolve(newSupply);
    })
  }

  convertImportToSupply(importToConvert, supply, user) {
    return new Promise(async (resolve, reject) => {
      try {
        if (supply == undefined || supply == null) {
          let representationPivotInstance = await representationPivotModel.model.create({
            "DFC:represent": [importToConvert._id]
          });
          representationPivotInstance = await representationPivotInstance.save();
          importToConvert['DFC:hasPivot'] = representationPivotInstance._id;
          await importToConvert.save();
          let DFCSupply = {
            "DFC:description": importToConvert["DFC:description"],
            "DFC:suppliedBy": importToConvert["DFC:suppliedBy"],
            "DFC:quantity": importToConvert["DFC:quantity"],
            "DFC:hasUnit": importToConvert["DFC:hasUnit"],
            "DFC:hasPivot": importToConvert["DFC:hasPivot"],
            "DFC:hostedBy": {
              "DFC:name": "DFC"
            },
            user:user._id
          }
          DFCSupply = await supplyModel.model.create(DFCSupply);
          DFCSupply['@id'] = `http://datafoodconsortium.org/${DFCSupply._id}`;
          await DFCSupply.save();
          representationPivotInstance["DFC:represent"].push(DFCSupply._id);
          await representationPivotInstance.save();
          resolve(importToConvert);
        } else {
          // let representationPivot = await representationPivotInstance.findById(supply['DFC:hasPivot'])
          await supply.populate("DFC:hasPivot");
          let pivot = supply["DFC:hasPivot"];
          pivot["DFC:represent"].push(importToConvert._id);
          await pivot.save();
          importToConvert["DFC:hasPivot"] = pivot._id;
          await importToConvert.save();
          resolve(importToConvert);
        }
      } catch (e) {
        reject(e);
      }
    })
  }

  importSource(source, user) {
    return new Promise(async (resolve, reject) => {
      try {
        // let user = user['DFC:Entreprise'];
        // console.log('source', source, config.sources);
        let sourceObject = config.sources.filter(so => source.includes(so.url))[0];
        // console.log('url', source, sourceObject);
        request({
          url: source,
          json: true,
          headers: {
            'authorization': 'JWT ' + user.accessToken
          }
        }, async (err, result, body) => {
          try {
            // console.log('result.body', result.body);
            await importModel.model.remove({
              'DFC:hostedBy': {
                'DFC:name': sourceObject.name
              }
            });
            let supplies;
            if (sourceObject.version == "1.1") {
              supplies = result.body['DFC:Entreprise']['DFC:supplies'];
            } else if (sourceObject.version == "1.2") {
              supplies = result.body['DFC:supplies'];
            }

            let context = result.body['@context'] || result.body['@Context']


            supplies.forEach(async s => {
              // let representationPivotInstance = await representationPivotModel.model.create({});
              s['DFC:hostedBy'] = {
                'DFC:name': sourceObject.name
              };
              s.user=user._id;
              s['@id'] = `${context['@base']}${s['@id']}`
            })


            let exinsting = await supplyModel.model.find({user:user._id});
            let inserted = await supplyModel.model.insertMany(supplies);

            // console.log("exinsting", exinsting);
            if (exinsting.length == 0) {
              this.convertAllImportToSupply(inserted, user);
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
