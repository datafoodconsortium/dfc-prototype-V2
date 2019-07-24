// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');
// const importModel = require('../ORM/importModel');
const request = require('request');
const SupplyAndImport = require('./../service/supplyAndImport.js');

module.exports = function (router) {
  // this.config = require('./../../configuration.js');
  // Get workspaces
  let supplyAndImport=new SupplyAndImport();
  router.post('/products/clean', async (req, res, next)=>{
    let out= await supplyAndImport.cleanImport();
    res.json(out)
  })

  router.get('/products/me', async (req, res, next)=>{
    let out= await supplyAndImport.getAllImport();
    res.json(out)
  })

  router.post('/products/import', async (req, res, next)=>{
    let source = decodeURI(req.query.source);
    let out= await supplyAndImport.importSource(source);
    res.json(out)
  })
}
