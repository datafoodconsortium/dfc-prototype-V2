import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
import config from '../../config/config.json';
import Util from './util.js'
export default class Catalog extends GenericElement {
  constructor() {
    super();
    this.util = new Util();
    this.subscribe({
      channel: 'catalog',
      topic: 'loadAll',
      callback: (data) => {
        this.loadAllFront();
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
  }

  importOne(source) {
    // let sourceObject = config.sources.filter(so => so.name == source)[0];
    // console.log('importOne',sourceObject);
    let url = '/data/core/products/import?source=' + source;
    let option = {
      method: 'POST'
    };
    this.util.ajaxCall(url,option).then(data => {
      console.log('resolve ajaxCall', data);
    })
  }

  getSources() {
    this.publish({
      channel: 'source',
      topic: 'changeAll',
      data: config.sources
    });
  }

  loadAllFront() {
    console.log(config);
    this.catalogs = [];
    this.catalogsTree = [];
    this.publish({
      channel: 'catalog',
      topic: 'changeAll',
      data: this.catalogs
    });
    config.sources.forEach(source => {
      fetch(source.url).then(response => {
          if (response.status !== 200) {
            console.log('Looks like there was a problem. Status Code: ' +
              response.status);
            console.error(response);
            throw new Error(response.status)
          } else {
            return response.json();
          }
        }).then(data => {
          console.log(source.url, data);
          let newRecords = data['DFC:Entreprise']['DFC:supplies'].map(record => {
            return {
              source: source.name,
              'DFC:description': record['DFC:description'],
              'DFC:quantity': record['DFC:quantity'],
              'DFC:hasUnit': {
                '@id': record['DFC:hasUnit']['@id']
              }
            }
          })

          console.log('newRecords', newRecords);
          this.catalogs = this.catalogs.concat(newRecords);
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
            channel: 'catalog',
            topic: 'changeAll',
            data: this.catalogs
          });
          this.publish({
            channel: 'catalog',
            topic: 'changeAllTree',
            data: this.catalogsTree
          });
        })
        .catch(function(err) {
          console.error('Fetch Error ', source.url, err);
        });
    })
  }
}
window.customElements.define('x-service-catalog', Catalog);
