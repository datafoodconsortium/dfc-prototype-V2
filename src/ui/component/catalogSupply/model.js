import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';
import easyui from '../../easyui/jquery-easyui-1.8.1/jquery.easyui.min.js';
import easyuiCss from '../../easyui/jquery-easyui-1.8.1/themes/default/easyui.css';
import easyuiCssIcons from '../../easyui/jquery-easyui-1.8.1/themes/icon.css';
import easyuiCssColors from '../../easyui/jquery-easyui-1.8.1/themes/color.css';

export default class CatalogSupply extends GenericElement {
  constructor() {
    super(view);
    this.subscribe({
      channel: 'supply',
      topic: 'changeAll',
      callback: (data) => {
        this.setDataGrid(data)
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    $(this.shadowRoot.querySelector("#panel")).panel({
      fit: true
    });

    this.gridDomTree = $(this.shadowRoot.querySelector("#treeGrid"));

    let treegrid = this.gridDomTree.treegrid({
      fit: true,
      autoLoad: false,
      idField: 'id',
      treeField: 'description',
      onSelect: (rowData) => {
        this.selectedSupply = rowData.raw
      },
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
        // console.warn('ALLO');

    this.publish({
      channel: 'supply',
      topic: 'loadAll'
    });

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

    this.shadowRoot.querySelector('#edit').addEventListener('click', e => {
      this.edit();
    })
  }

  disconnectedCallback() {
    super.disconnectedCallback();
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
    super.attributeChangedCallback(attrName, oldVal, newVal);
  }

  edit(){
    this.publish({
      channel: 'main',
      topic: 'navigate',
      data : '/x-item-supply/'+encodeURIComponent(this.selectedSupply.id)
    })
  }

  setDataGrid(data){
    console.log('data received Tree', data);
    let counter = 0;
    let dataEasyUi = data.map(d => {
      counter++;
      return {
        id: counter,
        description: d['DFC:description'],
        raw: d,
        children: d.imports.map(c => {
          counter++;
          return {
            id:counter,
            source: c.source,
            raw: d,
            description: c['DFC:description'],
            quantity: c['DFC:quantity'],
            unit: c['DFC:hasUnit']['@id'],
            '@id': c['@id']
          }
        })
      }
    })
    this.gridDomTree.treegrid('loadData', dataEasyUi);
  }
}
window.customElements.define('x-catalog-supply', CatalogSupply);
