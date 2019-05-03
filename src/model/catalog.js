import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
import config from '../config.json';
export default class Catalog extends GenericElement {
  constructor() {
    super();
    this.subscribe({
      channel: 'catalog',
      topic: 'loadAll',
      callback: (data) => {
        this.loadAll();
      }
    })

  }

  loadAll() {
    console.log(config);
    config.sources.forEach(source => {
      fetch(source.url).then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            throw new Error(response.status)
          } else {
            return response.json();
          }
        }).then(data => {
          console.log(data);
          let out = {
            source:source.name,
            products :data['DFC:Entreprise']['DFC:supplies']
          }
          console.log(out);
          this.publish({
            channel: 'catalog',
            topic: 'changeAll',
            data: out
          });
        })
        .catch(function(err) {
          console.error('Fetch Error ',source.url, err);
        });
    })
  }
}
window.customElements.define('x-service-catalog', Catalog);
