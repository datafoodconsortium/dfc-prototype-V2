import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
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

  loadAll(){
    let data=[
      {
        name : 'product1'
      },
      {
        name : 'product2'
      }
    ]
    this.publish({
      channel: 'catalog',
      topic: 'changeAll',
      data: data
    });
  }
}
window.customElements.define('x-service-catalog', Catalog);
