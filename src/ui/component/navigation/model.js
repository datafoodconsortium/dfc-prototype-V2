import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
import header from '../header/model.js';
import home from '../home/model.js';
import menu from '../menu/model.js';
// import screen1 from '../catalog/model.js';
// import screen3 from '../w2ui/model.js';
import catalogImport from '../catalogImport/model.js';
import catalogIntegration from '../catalogSupply/model.js';
import itemImport from '../itemImport/model.js';
import profil from '../profil/model.js';
import importCatalog from '../importCatalog/model.js';

export default class Navigation extends GenericElement {
  constructor() {
    super(view);
    this.subscribe({
      channel: 'main',
      topic: 'screen',
      callback: (data) => {
        console.log('screen', data);
        this.loadComponent(data);
      }
    });
  }

  loadComponent(comp) {
    console.log(comp);
    let screen = this.shadowRoot.querySelector('#screen');
    let component = document.createElement(comp);
    component.setAttribute("style", "flex:1");
    component.classList.add('containerV')
    while (screen.firstChild != null) {
      screen.removeChild(screen.firstChild);
    }
    screen.appendChild(component);

    this.propagatedStyle.forEach(style=>{
      component.appendChild(style.cloneNode(true));
    })
    return component;
  }

  connectedCallback() {
    super.connectedCallback();
    // this.loadComponent('home-wc');
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }

}
window.customElements.define('x-navigation', Navigation);
