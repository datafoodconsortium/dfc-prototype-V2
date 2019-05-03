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
    this.catalogList = this.shadowRoot.getElementById('catalogList');
    this.publish({
      channel: 'catalog',
      topic: 'loadAll'
    });
    this.addCell('source','header');
    this.addCell('desription','header');
    this.addCell('package','header');
    this.addCell('unit','header');
  }
  addCell(value,css){
    let div = document.createElement('div');
    this.catalogList.appendChild(div);
    if(css !=undefined){
      div.classList.add(css);
    }
    let text = document.createTextNode(value);
    div.appendChild(text);
  }

  setData(data) {
    let catalogList =this.shadowRoot.getElementById('catalogList');
    console.log('data received',data);
    data.products.forEach(item=>{
      this.addCell(data.source);
      this.addCell(item['DFC:description'],'cell');
      this.addCell(item['DFC:quantity'],'cell');
      this.addCell(item['DFC:hasUnit']['@id'],'cell')

    })
  }
}
window.customElements.define('x-catalog', Catalog);
