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
const mongo_client= require('./mongo_client');
url = "http://datafoodconsortium.org:80/dfc-prototype-V2/dist/config/config.json"
// url = "https://data-players.github.io/StrongBox/public/dev-linux.json"

app.use(cors())
app.use(bodyParser.json({
  limit: '10mb'
}))
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}))

request(url, { json: true }, (err, result, body) => {
  if(err==undefined){
    const configJson = result.body
    const content = 'module.exports = ' + JSON.stringify(result.body)
    fs.writeFile('configuration.js', content, 'utf8', function (err) {
      if (err) {
        throw err
      } else {
        console.log('config good');
        app.use('/data/auth', unSafeRouteur);
        app.use('/data/core', safe);
        app.get('/', function (req, res, next) {
          res.redirect('/ui/')
        })
        app.use('/ui', express.static(__dirname +'/../ui', {
          etag: false
        }))
        const port = process.env.APP_PORT || 8080
        app.listen(port, function (err) {
          console.log('serveur started at port', port);
          mongo_client.getInstance();
          console.log('ALLO3');
        })
      }
    })
  }else{
    throw err;
  }

})
