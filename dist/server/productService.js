// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');
const supplyModel = require('./supplyModel');
const request = require('request');

module.exports = function (router) {
  this.config = require('./../../configuration.js');
  // Get workspaces

  router.get('/products/me', async (req, res, next)=>{
    // let mongoclient = mongo_client.getInstance();

    // let model = mongoclient.connection.model('supply', new mongoose.Schema({}, {
    //   strict: false
    // }));

    let products = await supplyModel.model.find({});
    console.log('products',products);
    res.json(products)
  })

  router.post('/products/import', async (req, res, next)=>{

    // let url = req.query.url;
    let source = decodeURI(req.query.source);
    console.log('source',source,this.config.sources);
    let sourceObject = this.config.sources.filter(so => so.name == source)[0];
    console.log('url',sourceObject.url);
    request(sourceObject.url, {
      json: true
    }, async (err, result, body) => {
      try {
        let supplies = result.body['DFC:Entreprise']['DFC:supplies'];
        await supplyModel.model.remove({});
        let inserted = await supplyModel.model.insertMany(supplies);
        res.json(inserted)
      } catch (e) {
        res.status(500).send({error:e});
      } finally {

      }


    })
  })
}
