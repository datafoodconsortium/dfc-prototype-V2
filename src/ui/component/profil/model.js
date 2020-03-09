import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
export default class Profil extends GenericElement {
  constructor() {
    super(view);
    this.elements = {
      email: this.shadowRoot.querySelector('[name="email"]'),
      entreprise: this.shadowRoot.querySelector('[name="entreprise"]'),
      createEntrepriseButton : this.shadowRoot.querySelector('#createEntrepriseButton'),
      logout: this.shadowRoot.querySelector('#logout'),
    };
    this.subscribe({
      channel: 'user',
      topic: 'changeOne',
      callback: (data) => {
        // console.log('screen', data);
        this.setUser(data);
      }
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this.publish({
      channel: 'user',
      topic: 'get',
    });
    this.elements.createEntrepriseButton.addEventListener('click', e => {
      this.publish({
        channel: 'user',
        topic: 'createEntreprise',
        data:{'DFC:description':'maPetiteEntreprise'}
      });
    });
    this.elements.logout.addEventListener('click', e => {
      this.publish({
        channel: 'user',
        topic: 'logout'
      });
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }


  setData(data) {

  }

  setUser(user) {
    this.elements.email.textContent = user.login;
    if (user['DFC:Entreprise'] != undefined) {
      this.elements.createEntrepriseButton.classList.add("hide");
      this.elements.entreprise.classList.remove("hide");
      this.elements.entreprise.textContent = user['DFC:Entreprise']['DFC:description'];
    }else {
      this.elements.createEntrepriseButton.classList.remove("hide");
      this.elements.entreprise.classList.add("hide");
    }
  }
}
window.customElements.define('x-profil', Profil);
