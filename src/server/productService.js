const mongo_client = require('./mongo_client');
const mongoose = require('mongoose');
const request = require('request');

module.exports = function (router) {
  this.config = require('./../../configuration.js');
  // Get workspaces

  router.get('/products/me', async (req, res, next)=>{
    let mongoclient = mongo_client.getInstance();

    let model = mongoclient.connection.model('supply', new mongoose.Schema({}, {
      strict: false
    }));

    let products = await model.find({});
    console.log('products',products);
    res.json(products)
  })

  router.post('/products/import', async (req, res, next)=>{
    request(this.config.sources[1].url, {
      json: true
    }, async (err, result, body) => {
      let supplies = result.body['DFC:Entreprise']['DFC:supplies'];
      console.log('first source', supplies);
      let mongoclient = mongo_client.getInstance();

      let model = mongoclient.connection.model('supply', new mongoose.Schema({}, {
        strict: false
      }));

      await model.remove({});
      let inserted = await model.insertMany(supplies);
      res.json(inserted)

    })
  })
}
