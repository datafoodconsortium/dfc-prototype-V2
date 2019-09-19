import GenericElement from '../../core/genericElement.js';
import view from 'html-loader!./view.html';

import easyui from '../../easyui/jquery-easyui-1.8.1/jquery.easyui.min.js';
import easyuiCss from '../../easyui/jquery-easyui-1.8.1/themes/default/easyui.css';
import easyuiCssIcons from '../../easyui/jquery-easyui-1.8.1/themes/icon.css';
import easyuiCssColors from '../../easyui/jquery-easyui-1.8.1/themes/color.css';

export default class ItemImport extends GenericElement {
  constructor() {
    super(view);

    this.elements = {
      description: this.shadowRoot.querySelector('[name="description"]'),
      unit: this.shadowRoot.querySelector('[name="unit"]'),
      quantity: this.shadowRoot.querySelector('[name="quantity"]'),
      source: this.shadowRoot.querySelector('[name="source"]'),
    };

    this.subscribe({
      channel: 'import',
      topic: 'changeOne',
      callback: (data) => {
        this.setData(data)
      }
    });

    this.subscribe({
      channel: 'supply',
      topic: 'changeAll',
      callback: (data) => {
        this.setDataGrid(data)
      }
    });
    this.subscribe({
      channel: 'import',
      topic: 'convert.done',
      callback: (data) => {
        console.log('navigation');
        this.publish({
          channel: 'main',
          topic: 'navigate',
          data: '/x-catalog-import'
        })
      }
    });
  }
  connectedCallback() {
    super.connectedCallback();
    this.shadowRoot.querySelector('#link').addEventListener('click', e => {
      this.consolidate();
    })
    this.shadowRoot.querySelector('#linkEmpty').addEventListener('click', e => {
      this.consolidate(true);
    })


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

    let regex = /\#\/x-item-import\/(.+)\/?/ig;
    // console.log('document.location.hash',document.location.hash);
    let regExec = regex.exec(document.location.hash);
    let id;
    // console.log('regExec',regExec);
    if (regExec != null) {
      id = regExec[1];
    }
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

  setDataGrid(data) {
    console.log('data received Tree', data);
    let counter = 0;
    let dataEasyUi = data.map(d => {
      counter++;
      return {
        id: d.id,
        description: d['DFC:description'],
        raw: d,
        // 'id': d['@id'],
        children: d.imports.map(c => {
          counter++;
          return {
            id: counter,
            raw: c,
            source: c.source,
            description: c['DFC:description'],
            quantity: c['DFC:quantity'],
            unit: c['DFC:hasUnit']['@id'],
            supply: d,
            '@id': c['@id']
          }
        })
      }
    })
    console.log('gridDomTree', this.gridDomTree, dataEasyUi);
    this.gridDomTree.treegrid('loadData', dataEasyUi);
  }

  setData(data) {
    // console.log('setData',data);
    this.item = data
    this.elements.description.textContent = data['DFC:description'];
    this.elements.unit.textContent = data['DFC:hasUnit']['@id'];
    this.elements.quantity.textContent = data['DFC:quantity'];
    this.elements.source.textContent = data['source'];
  }

  consolidate(newSupply) {
    let supplyId;
    if(newSupply!==true){
      if (this.selectedSupply.supply != undefined) {
        supplyId = this.selectedSupply.supply;
      } else {
        supplyId = this.selectedSupply.id;
      }
    }

    console.log(supplyId, this.item['@id']);
    this.publish({
      channel: 'import',
      topic: 'convert',
      data :{
        importId:this.item['@id'],
        supplyId:supplyId,
      }
    });
  }
}
window.customElements.define('x-item-import', ItemImport);
