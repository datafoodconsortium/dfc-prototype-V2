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
    console.log(catalogList);
    data.forEach(item=>{
      let div = document.createElement('div');
      let text = document.createTextNode(item.name);
      div.appendChild(text);
      catalogList.appendChild(div);
    })
  }
}
window.customElements.define('x-catalog', Catalog);
