import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
import config from '../../config/config.json';
import Util from './util.js'
export default class User extends GenericElement {
  constructor() {
    super();
    this.util = new Util();

    this.subscribe({
      channel: 'profil',
      topic: 'set',
      callback: (data) => {
        this.setProfil(data);
      }
    });

    this.subscribe({
      channel: 'user',
      topic: 'get',
      callback: (data) => {

        this.getUser();
      }
    });
    this.subscribe({
      channel: 'user',
      topic: 'createEntreprise',
      callback: (data) => {
        this.createEntrepriseForUser(data);
      }
    });
  }

  setProfil(data){
    console.log('setProfil',data);
    this.profil=data;
    this.publish({
      channel: 'user',
      topic: 'changeOne',
      data: this.profil.user
    });
  }
  createEntrepriseForUser(data){
    console.log('createEntrepriseForUser',this.profil.user,data);
    // this.user['DFC:Entreprise']=data;
    let url = '/data/core/user/'+this.profil.user._id+'/entreprise';
    let option = {
      method: 'POST',
      body:JSON.stringify(data)
    };
    this.util.ajaxCall(url, option).then(data => {
      this.profil.user=data.body;
      // console.log('loadOneSupply',this.selectedSupply);
      this.publish({
        channel: 'user',
        topic: 'changeOne',
        data: this.profil.user
      });
    })
  }

  getUser(data){
    if(this.profil !=undefined  &&  this.profil.user!=undefined){
      this.publish({
        channel: 'user',
        topic: 'changeOne',
        data: this.profil.user
      });
    }

  }


}
window.customElements.define('x-service-user', User);
