const base64url = require('base64url');
const jose = require('node-jose');
const config=require("../../../configuration.js")

async function middlware_express_oidc (req,res,next) {
  console.log('req.headers',req.headers);
  var token = req.headers.authorization.split(' ')[1];
  if (token==null || token==undefined || token=='null') {
    res.status(401)
    next(new Error('Missing Bearer Token'));
  }else{
    var components = token.split('.');
    var header = JSON.parse(base64url.decode(components[0]));
    var payload = JSON.parse(base64url.decode(components[1]));
    var signature = components[2];
    var decodedSignature = base64url.decode(components[2])
    console.log('payload',payload);

    try {

      let publicKey="-----BEGIN PUBLIC KEY-----"+config.OIDC.lesCommuns.public_key+"A"+"-----END PUBLIC KEY-----"
      // console.log('publicKey', publicKey);
      const key = await jose.JWK.asKey(publicKey, 'pem');
      const verifier = jose.JWS.createVerify(key);
      const verified = await verifier
        .verify(token)

      req.oidcPayload=payload;
      next()

    } catch (err) {
      console.log(err);
      res.status(401)
      next(new Error('Invalid Tocken'));
    }
  }
}
module.exports = middlware_express_oidc
