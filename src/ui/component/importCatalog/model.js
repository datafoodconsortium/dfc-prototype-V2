import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
export default class ImportCatalog extends GenericElement {
  constructor() {
    super(view);
    this.subscribe({
      channel: 'source',
      topic: 'changeAll',
      callback: (data) => {
        this.loadSources(data);
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.getElementById('import-button').addEventListener('click', e => {
      let sourceSelect = this.shadowRoot.getElementById("source-select");
      var optionSelected = sourceSelect.options[sourceSelect.selectedIndex];
      this.publish({
        channel: 'source',
        topic: 'importOne',
        data:{source:optionSelected.value}
      });
    });

    this.shadowRoot.getElementById('clean-button').addEventListener('click', e => {
      this.publish({
        channel: 'source',
        topic: 'clean',
      });
    });

    console.log('connectedCallback');
    this.publish({
      channel: 'source',
      topic: 'getAll'
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }

  loadSources(data) {
    console.log('loadSources', data);
    let sourceSelect = this.shadowRoot.getElementById('source-select');
    for (let source of data) {
      let option = document.createElement("option");
      option.innerText = source.name;
      option.value = source.name;
      sourceSelect.append(option);
    }
  }

  setData(data) {

  }
}
window.customElements.define('x-import-catalog', ImportCatalog);
