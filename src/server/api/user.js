// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');
// const importModel = require('../ORM/importModel');
const request = require('request');
const User = require('./../service/user.js');

module.exports = function (router) {
  // this.config = require('./../../configuration.js');

  let user = new User();

  router.post('/user/:id/entreprise', async (req, res, next)=>{
    console.log('post user',req.body);
    // console.log('supply',req.params.id);
    let out= await user.createEntreprise(req.params.id,req.body);
    res.json(out)
  })
}
