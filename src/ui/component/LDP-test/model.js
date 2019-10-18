import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
import {
  PathFactory
} from 'ldflex';
import {
  default as ComunicaEngine
} from 'ldflex-comunica';
import {
  namedNode
} from '@rdfjs/data-model';

// const { PathFactory } = require('ldflex');
// const { default: ComunicaEngine } = require('ldflex-comunica');
// const { namedNode } = require('@rdfjs/data-model');

export default class LDP_test extends GenericElement {
  constructor() {
    super(view);
    this.elements = {
      urlInit: this.shadowRoot.querySelector('#urlInit'),
      urlInit2: this.shadowRoot.querySelector('#urlInit2'),
      result: this.shadowRoot.querySelector('[name="result"]'),
      header: this.shadowRoot.querySelector('[name="header"]'),
      urlTest: this.shadowRoot.querySelector('#urlTest'),
      urlInput: this.shadowRoot.querySelector('[name="urlInput"]'),
    };
    this.subscribe({
      channel: 'testAPI',
      topic: 'testApiHeaderResponse',
      callback: (data) => {
        // console.log('testApiHeaderResponse',data);
        this.setResult(data);
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();

    this.elements.urlTest.addEventListener('click', async e => {
      let url = this.elements.urlInput.value;

      const context = {
        "@context": {
          // "@vocab": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#",
          "DFC": "http://datafoodconsortium.org/ontologies/DFC_FullModel.owl#",
          "label": "http://www.w3.org/2000/01/rdf-schema#label",
        }
      };
      // The query engine and its source
      const queryEngine = new ComunicaEngine('http://localhost:8080/data/core/entrepriseLDP/5da83c675417a50a1250ee08');
      // The object that can create new paths
      // console.log('PathFactory', PathFactory);
      let param = {
        context,
        queryEngine
      };
      // console.log('param',param);
      const path = new PathFactory({
        context,
        queryEngine
      });

      console.log('ALLO1');
      const proxy = path.create({
        subject: namedNode('http://localhost:8080/data/core/entrepriseLDP/5da83c675417a50a1250ee08')
      });
      console.log('ALLO2');
      let description = await proxy['DFC:description'];
      console.log('DFC:description', description.toString());
      // let description2 = await proxy.description;
      // console.log('description', description2);

      console.log(`This entreprise is ${await proxy['DFC:description']}`);


      (async document => {
        for await (const subject of document.subjects)
        console.log(`subject ${subject}`);
      })(proxy);

      (async subject => {
        for await (const property of subject.properties)
        console.log(`property ${property}`);
      })(proxy);


      // const context = {
      //   "@context": {
      //     "@vocab": "http://xmlns.com/foaf/0.1/",
      //     "friends": "knows",
      //     "label": "http://www.w3.org/2000/01/rdf-schema#label",
      //   }
      // };
      // // The query engine and its source
      // const queryEngine = new ComunicaEngine('https://ruben.verborgh.org/profile/');
      // // The object that can create new paths
      // const path = new PathFactory({
      //   context,
      //   queryEngine
      // });
      // const ruben = path.create({
      //   subject: namedNode('https://ruben.verborgh.org/profile/#me')
      // });
      // console.log(`This person is ${await ruben.name}`);



      // console.log(url);
      // this.publish({
      //   channel: 'testAPI',
      //   topic: 'testApiHeaderCall',
      //   data: url
      // })
    })

    // this.elements.urlInit.addEventListener('click',e=>{
    //   let url = window.location.origin+'/login/auth/me';
    //   this.elements.urlInput.value=url;
    // })
    this.elements.urlInit2.addEventListener('click', e => {
      let url = window.location.origin + '/data/core/me/entrepriseLDP';
      this.elements.urlInput.value = url;
    })
  }
  setResult(result) {
    console.log('result', result);
    this.elements.result.value = JSON.stringify(result.body);
    this.elements.header.value = result.headers;
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }


  setData(data) {

  }
}
window.customElements.define('x-ldp-test', LDP_test);
