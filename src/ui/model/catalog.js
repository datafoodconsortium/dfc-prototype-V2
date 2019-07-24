import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
import config from '../../config/config.json';
import Util from './util.js'
export default class Catalog extends GenericElement {
  constructor() {
    super();
    this.util = new Util();
    this.subscribe({
      channel: 'supply',
      topic: 'loadAll',
      callback: (data) => {
        this.loadAllSupply();
      }
    });
    this.subscribe({
      channel: 'import',
      topic: 'loadAll',
      callback: (data) => {
        this.loadAllImport();
      }
    });
    this.subscribe({
      channel: 'import',
      topic: 'loadOne',
      callback: (data) => {
        this.loadOneImport(data);
      }
    });
    this.subscribe({
      channel: 'source',
      topic: 'getAll',
      callback: (data) => {
        this.getSources();
      }
    });

    this.subscribe({
      channel: 'source',
      topic: 'importOne',
      callback: (data) => {
        this.importOne(data.source);
      }
    });

    this.subscribe({
      channel: 'source',
      topic: 'clean',
      callback: (data) => {
        this.cleanAll();
      }
    });
  }

  cleanAll(source) {
    let url = '/data/core/clean';
    let option = {
      method: 'POST'
    };
    this.util.ajaxCall(url, option).then(data => {
      console.log('resolve ajaxCall', data);
      alert('catalogue vidé')
    })
  }

  importOne(source) {
    // let sourceObject = config.sources.filter(so => so.name == source)[0];
    // console.log('importOne',sourceObject);
    let url = '/data/core/import/import?source=' + source;
    let option = {
      method: 'POST'
    };
    this.util.ajaxCall(url, option).then(data => {
      console.log('resolve ajaxCall', data);
      alert(source + ' bien importé')
    })
  }

  getSources() {
    this.publish({
      channel: 'source',
      topic: 'changeAll',
      data: config.sources
    });
  }
  loadAllImport() {
    let url = '/data/core/import';
    this.catalogs = [];
    this.catalogsTree = [];
    this.util.ajaxCall(url).then(data => {
      let newRecords = data.map(record => {
        return {
          '@id': record['@id'],
          'source': record['source'],
          'DFC:description': record['DFC:description'],
          'DFC:quantity': record['DFC:quantity'],
          'DFC:hasUnit': {
            '@id': record['DFC:hasUnit']['@id']
          }
        }
      })

      console.log('newRecords', newRecords);
      this.catalogs = newRecords;
      this.catalogs.sort((a, b) => {
        let dif = a['DFC:description'].localeCompare(b['DFC:description']);
        // console.log(dif);
        return dif;
      });
      newRecords.forEach(nr => {
        let existingRecord = this.catalogsTree.filter(er => er['DFC:description'] == nr['DFC:description']);
        if (existingRecord.length > 0) {
          existingRecord[0].children.push(nr);
        } else {
          let newRoot = {
            'DFC:description': nr['DFC:description'],
            children: [nr]
          };
          this.catalogsTree.push(newRoot);
        }
      })
      // console.log('this.catalogsTree',this.catalogsTree);
      this.publish({
        channel: 'import',
        topic: 'changeAll',
        data: this.catalogs
      });
      this.publish({
        channel: 'import',
        topic: 'changeAllTree',
        data: this.catalogsTree
      });
    })
  }

  loadOneImport(id) {
    let url = `/data/core/import/${id}`;
    this.util.ajaxCall(url).then(data => {
      this.selectedImport=data;
      console.log('loadOneImport',this.selectedImport);
      this.publish({
        channel: 'import',
        topic: 'changeOne',
        data: this.selectedImport
      });
    })
  }

  loadAllSupply() {
    let url = '/data/core/supply';
    this.catalogs = [];
    this.catalogsTree = [];
    this.util.ajaxCall(url).then(data => {
      let newRecords = data.map(record => {
        return {
          'imports': record['imports'],
          'DFC:description': record['DFC:description']
        }
      })

      console.log('newRecords', newRecords);
      this.catalogs = newRecords;
      this.catalogs.sort((a, b) => {
        let dif = a['DFC:description'].localeCompare(b['DFC:description']);
        // console.log(dif);
        return dif;
      });

      // console.log('this.catalogsTree',this.catalogsTree);
      this.publish({
        channel: 'supply',
        topic: 'changeAll',
        data: this.catalogs
      });
    })
  }

}
window.customElements.define('x-service-catalog', Catalog);
