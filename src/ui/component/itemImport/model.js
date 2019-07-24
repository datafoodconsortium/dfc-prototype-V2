import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
export default class ItemImport extends GenericElement {
  constructor() {
    super(view);

    this.elements = {
      description: this.shadowRoot.querySelector('[name="description"]'),
      unit: this.shadowRoot.querySelector('[name="unit"]'),
      quantity: this.shadowRoot.querySelector('[name="description"]'),
      source: this.shadowRoot.querySelector('[name="source"]'),
    };

    this.subscribe({
      channel: 'import',
      topic: 'changeOne',
      callback: (data) => {
        this.setData(data)
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    let regex = /\#\/x-item-import\?.*id=(.+)\/?/ig;
    // console.log('document.location.hash',document.location.hash);
    let regExec = regex.exec(document.location.hash);
    let id;
    // console.log('regExec',regExec);
    if (regExec!=null) {
      id = regExec[1];
    }
    console.log('id',id);
    this.publish({
      channel: 'import',
      topic: 'loadOne',
      data: id
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();

  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }


  setData(data) {
      // console.log('setData',data);
      this.elements.description.textContent=data['DFC:description'];
      this.elements.unit.textContent=data['DFC:hasUnit']['@id'];
      this.elements.quantity.textContent=data['DFC:quantity'];
      this.elements.source.textContent=data['source'];
  }
}
window.customElements.define('x-item-import', ItemImport);
