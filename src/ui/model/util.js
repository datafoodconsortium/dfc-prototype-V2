export default class Util {
  ajaxCall(url, option) {
    console.log('ajaxCall',url,option);
    return new Promise((resolve, reject) => {
      fetch(url,option).then(function(response) {
          return response.json();
        })
        .then(function(data) {
          resolve(data)
        }).catch(e => {
          reject(e);
        });
    })
  }
}
