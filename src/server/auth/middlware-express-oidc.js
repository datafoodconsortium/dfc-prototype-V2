const base64url = require('base64url');
const jose = require('node-jose');
const config=require("../../../configuration.js")

async function middlware_express_oidc (req,res,next) {
  console.log('req.headers',req.headers);
  var token = req.headers.authorization.split(' ')[1];
  // console.log('token',token,req.headers.authorization);
  if (token==null || token==undefined || token=='null') {
    res.status(401)
    next(new Error('Missing Bearer Token'));
  }else{
    var components = token.split('.');
    // console.log(components);
    var header = JSON.parse(base64url.decode(components[0]));
    var payload = JSON.parse(base64url.decode(components[1]));
    var signature = components[2];
    var decodedSignature = base64url.decode(components[2])
    // console.log('header', header);
    // console.log('payload', payload);
    // console.log('resource_access', payload.resource_access);
    // console.log('signature', signature);
    // console.log('decoded signature', decodedSignature);

    try {


      // let publicKey = fs.readFileSync('/home/simon/GIT/OIDC-LesCommuns/src/server/login/key.pem');

      let publicKey="-----BEGIN PUBLIC KEY-----"+config.OIDC.lesCommuns.public_key+"A"+"-----END PUBLIC KEY-----"
      // console.log('publicKey', publicKey);
      const key = await jose.JWK.asKey(publicKey, 'pem');
      const verifier = jose.JWS.createVerify(key);
      const verified = await verifier
        .verify(token)

      // console.log('verified',verified);
      // res.json(payload);
      req.oidcPayload=payload;
      next()

      // console.log('decoded', decoded);
    } catch (err) {
      console.log(err);
      //console.log('decoded err', err);
      res.status(401)
      // err
      next(new Error('Invalid Tocken'));
    }
  }

  // console.log('token',token);



  // clientGlobal.userinfo(token).then(oidcResponse => {
  //   console.log('oidcResponse', oidcResponse);
  //   res.json(oidcResponse);
  // }).catch(e => {
  //   // res.redirect('/ui/login.html');
  //   res.status(401).end();
  // });

}

module.exports = middlware_express_oidc
