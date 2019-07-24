const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const safe = express.Router();
const unSafeRouteur = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const env = process.env;
const fs = require('fs');
let url = env.CONFIG_URL;
// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');

url = "http://datafoodconsortium.org/dfc-prototype-V2/src/config/config.json"

app.use(cors())
app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))

request(url, {
  json: true
}, (err, result, body) => {
  if (err == undefined) {
    const configJson = result.body
    const content = 'module.exports = ' + JSON.stringify(result.body)
    fs.writeFile('./configuration.js', content, 'utf8', function(err) {
      const productService = require('./api/product.js');
      if (err) {
        throw err
      } else {
        console.log('config good');
        app.use('/data/auth', unSafeRouteur);
        app.use('/data/core', safe);
        productService(safe)
        app.get('/', function(req, res, next) {
          res.redirect('/ui/')
        })
        app.use('/ui', express.static(__dirname + '/../ui', {
          etag: false
        }))
        const port = process.env.APP_PORT || 8080
        app.listen(port, function(err) {
          console.log('serveur started at port', port);
        })
      }
    })
  } else {
    throw err;
  }

})
