import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
export default class Screen1 extends GenericElement {
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

  }
}
window.customElements.define('x-screen1', Screen1);
