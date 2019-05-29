import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
import easyui from '../../easyui/jquery-easyui-1.8.1/jquery.easyui.min.js';
import easyuiCss from '../../easyui/jquery-easyui-1.8.1/themes/default/easyui.css';
import easyuiCssIcons from '../../easyui/jquery-easyui-1.8.1/themes/icon.css';
import easyuiCssColors from '../../easyui/jquery-easyui-1.8.1/themes/color.css';

export default class Easyui extends GenericElement {
  constructor() {
    super(view);
    this.subscribe({
      channel: 'catalog',
      topic: 'changeAll',
      callback: (data) => {
        this.setDataGrid(data)
      }
    });

    this.subscribe({
      channel: 'catalog',
      topic: 'changeAllTree',
      callback: (data) => {
        this.setDataTree(data)
      }
    })

  }
  connectedCallback() {
    super.connectedCallback();
    $(this.shadowRoot.querySelector("#panel")).panel({
      fit: true
    });
    this.gridDom = $(this.shadowRoot.querySelector("#grid"));
    this.gridDomTree = $(this.shadowRoot.querySelector("#treeGrid"));

    let datagrid = this.gridDom.datagrid({
      fit: true,
      autoLoad: false,
      columns: [
        [{
            field: 'description',
            title: 'description',
            width: 300,
            sortable :true,
          },
          {
            field: 'quantity',
            title: 'quantity',
            width: 100,
            sortable :true
          }, {
            field: 'unit',
            title: 'unit',
            width: 100,
            sortable :true
          },
          {
            field: 'source',
            title: 'source',
            width: 200,
            sortable :true
          }
        ]
      ]
    });

    let treegrid = this.gridDomTree.treegrid({
      fit: true,
      autoLoad: false,
      idField:'id',
      treeField: 'description',
      columns: [
        [{
            field: 'description',
            title: 'description',
            width: 300
          },
          {
            field: 'quantity',
            title: 'quantity',
            width: 100
          }, {
            field: 'unit',
            title: 'unit',
            width: 100
          },
          {
            field: 'source',
            title: 'source',
            width: 200
          }
        ]
      ]
    });
    // this.gridDom.datagrid('loadData', dataEasyUi);

    this.publish({
      channel: 'catalog',
      topic: 'loadAll'
    });

    this.gridDom.datagrid('getPanel').find('.datagrid-header .datagrid-htable').css('height', '');
    this.gridDom.datagrid('getPanel').find('.datagrid-header').css('height', '');
    this.gridDomTree.datagrid('getPanel').find('.datagrid-header .datagrid-htable').css('height', '');
    this.gridDomTree.datagrid('getPanel').find('.datagrid-header').css('height', '');
    // this.gridDom.datagrid('resize');

    let injectedStyle = document.createElement('style');
    injectedStyle.appendChild(document.createTextNode(easyuiCss.toString()));
    this.shadowRoot.appendChild(injectedStyle);
    let injectedStyle2 = document.createElement('style');
    injectedStyle2.appendChild(document.createTextNode(easyuiCssIcons.toString()));
    this.shadowRoot.appendChild(injectedStyle2);
    let injectedStyle3 = document.createElement('style');
    injectedStyle3.appendChild(document.createTextNode(easyuiCssColors.toString()));
    this.shadowRoot.appendChild(injectedStyle3);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }

  setDataGrid(data) {
    // let catalogList =this.shadowRoot.getElementById('catalogList');
    // console.log('data received', data);
    let dataEasyUi = data.map(d => {
      return {
        source: d.source,
        description: d['DFC:description'],
        quantity: d['DFC:quantity'],
        unit: d['DFC:hasUnit']['@id']
      }
    })
    // console.log('dataEasyUi', dataEasyUi);
    this.gridDom.datagrid('loadData', dataEasyUi);
  }

  setDataTree(data) {
    // let catalogList =this.shadowRoot.getElementById('catalogList');
    console.log('data received Tree', data);
    let counter=0;
    let dataEasyUi = data.map(d => {
      counter++;
      return {
        id:counter,
        description: d['DFC:description'],
        children: d.children.map(c => {
          counter++;
          return {
            id:counter,
            source: c.source,
            description: c['DFC:description'],
            quantity: c['DFC:quantity'],
            unit: c['DFC:hasUnit']['@id'],
          }
        })
      }
    })
    console.log('dataEasyUi', dataEasyUi);
    this.gridDomTree.treegrid('loadData', dataEasyUi);
  }
}
window.customElements.define('x-easyui', Easyui);
