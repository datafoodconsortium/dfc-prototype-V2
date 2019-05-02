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
      fetch(source).then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            throw new Error(response.status)
          } else {
            return response.json();
          }
        }).then(data => {
          console.log(data);
          let out = data['DFC:Entreprise']['DFC:manages'].map(manage => manage['DFC:references']);
          console.log(out);
          this.publish({
            channel: 'catalog',
            topic: 'changeAll',
            data: out
          });
        })
        .catch(function(err) {
          console.log('Fetch Error :', err);
        });
    })
  }
}
window.customElements.define('x-service-catalog', Catalog);
