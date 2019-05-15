import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
// import * as $ from 'jquery';
// window.$ = window.jQuery = require('jquery');
// console.log(window.$);
// window.$ = window.jQuery = $;
// import * as w2ui from 'w2ui';
// import $ from 'jquery/dist/jquery.min.js';
// console.log($);
// global.jQuery = global.$ = $;
import w2ui from 'w2ui/w2ui-1.4.3.min.js';
import w2uiCSS from 'w2ui/w2ui-1.4.3.min.css';

export default class W2ui extends GenericElement {
  constructor() {
    super(view);
  }
  connectedCallback() {
    super.connectedCallback();

    $(function() {
      console.log('ALLO');
      // let dom = $(this.shadowRoot.querySelector('#myGrid'));
      let dom = $(this.shadowRoot).find('#myGrid');
      console.log(dom);
      // let dom = $('#myGrid');
      dom.w2grid({
        name: 'myGrid',
        columns: [{
            field: 'fname',
            caption: 'First Name',
            size: '30%'
          },
          {
            field: 'lname',
            caption: 'Last Name',
            size: '30%'
          },
          {
            field: 'email',
            caption: 'Email',
            size: '40%'
          },
          {
            field: 'sdate',
            caption: 'Start Date',
            size: '120px'
          },
        ],
        records: [{
            recid: 1,
            fname: 'John',
            lname: 'Doe',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 2,
            fname: 'Stuart',
            lname: 'Motzart',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 3,
            fname: 'Jin',
            lname: 'Franson',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 4,
            fname: 'Susan',
            lname: 'Ottie',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 5,
            fname: 'Kelly',
            lname: 'Silver',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 6,
            fname: 'Francis',
            lname: 'Gatos',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 7,
            fname: 'Mark',
            lname: 'Welldo',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 8,
            fname: 'Thomas',
            lname: 'Bahh',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          },
          {
            recid: 9,
            fname: 'Sergei',
            lname: 'Rachmaninov',
            email: 'jdoe@gmail.com',
            sdate: '4/3/2012'
          }
        ]
      });
    });



    let injectedStyle = document.createElement('style');
    injectedStyle.appendChild(document.createTextNode(w2uiCSS.toString()));
    this.shadowRoot.appendChild(injectedStyle);
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
window.customElements.define('x-w2ui', W2ui);
