const express = require('express');
const cors = require('cors');
const app = express();
const http = require('http');
const safeRouter = express.Router();
const unsafeRouter = express.Router();
const bodyParser = require('body-parser');
const request = require('request');
const env = process.env;
const fs = require('fs');
const session = require('express-session');
const passport = require('passport');
let url = env.CONFIG_URL;

// const mongo_client = require('./mongo_client');
// const mongoose = require('mongoose');

url = "https://simonlouvet.github.io/config-private/DFC-Proto/config.json"

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
      if (err) {
        throw err
      } else {
        const config = require("../../configuration.js")
        const middlware_express_oidc = require('./auth/middlware-express-oidc.js');
        const productService = require('./api/product.js');
        console.log('config',config);
        app.use(session({
          secret: config.express.session_secret,
          maxAge: null
        })); //session secret
        safeRouter.use(middlware_express_oidc);
        app.use('/login/', unsafeRouter);
        app.use('/data/core', safeRouter);
        app.use(passport.initialize());
        app.use(passport.session());
        let addOidcLesCommunsPassportToApp = require('./auth/passport-oidc.js');
        addOidcLesCommunsPassportToApp(unsafeRouter);
        productService(safeRouter)
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
