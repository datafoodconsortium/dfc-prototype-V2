import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
export default class Catalog extends GenericElement {
  constructor() {
    super(view);
    this.subscribe({
      channel: 'catalog',
      topic: 'changeAll',
      callback: (data) => {
        this.setData(data)
      }
    })
  }
  connectedCallback() {
    super.connectedCallback();
    this.publish({
      channel: 'catalog',
      topic: 'loadAll'
    });
  }

  setData(data) {
    let catalogList =this.shadowRoot.getElementById('catalogList');
    console.log('data received',data);
    data.forEach(item=>{
      let divDesc = document.createElement('div');
      catalogList.appendChild(divDesc);
      let textDesc = document.createTextNode(item['DFC:description']);
      divDesc.appendChild(textDesc);


      let divQuantity = document.createElement('div');
      catalogList.appendChild(divQuantity);
      let textQuantity = document.createTextNode(item['DFC:quantity']);
      divQuantity.appendChild(textQuantity);


      let divUnit = document.createElement('div');
      catalogList.appendChild(divUnit);
      let textUnit = document.createTextNode(item['DFC:hasUnit']['@id']);
      divUnit.appendChild(textDesc);
    })
  }
}
window.customElements.define('x-catalog', Catalog);
