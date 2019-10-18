export default class Util {
  ajaxCall(url, option) {
    option = option || {};
    // console.log('ajaxCall', url, option);
    return new Promise((resolve, reject) => {
      let token = localStorage.getItem('token');

      if (token != undefined && token != 'undefined') {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", 'JTW' + ' ' + token);
        myHeaders.append("Content-Type", 'application/json');
        var myInit = {
          headers: myHeaders,
          mode: 'cors'
        };

        Object.assign(option, myInit);
        fetch(url, option).then(async function(response) {

          if (response.ok) {
            // console.log('OK!',response);
            let headers = {};
            let headerString = response.status.toString();

            response.headers.forEach(function(value, name) {
              // headers[name] = value;
              headerString = headerString.concat(String.fromCharCode(10))
              headerString = headerString.concat(name + ": " + value)

              // console.log(name + ": " + value);
            });
            console.log('headerString', headerString);
            let body = await response.json();
            resolve({
              body: body,
              headers: headerString
            })
            // return response.json();
          } else {
            console.log('error', response);
            let errorMessage;
            try {
              let error = await response.json();
              errorMessage= error.message;
              // throw new Error (error.message)
              reject(new Error(error.message));
            } catch (e) {
              errorMessage= await response.text();
            } finally {

            }
            // let error = await response.json();
            // throw new Error (error.message)
            reject(new Error(errorMessage));
          }

        })
        // .then(function(data) {
        //   resolve(data)
        // }).catch(e => {
        //   reject(e);
        // });
      } else {
        reject(new Error('no token in localstorage'))
      }

    })
  }
}
