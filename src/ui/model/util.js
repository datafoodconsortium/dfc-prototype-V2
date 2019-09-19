export default class Util {
  ajaxCall(url, option) {
    option=option||{};
    console.log('ajaxCall',url,option);
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
        fetch(url,option).then(function(response) {
            return response.json();
          })
          .then(function(data) {
            resolve(data)
          }).catch(e => {
            reject(e);
          });
      } else {
        reject(new Error('no token in localstorage'))
      }

    })
  }
}
