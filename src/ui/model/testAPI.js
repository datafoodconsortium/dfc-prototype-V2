import Navigo from 'navigo';
import GenericElement from '../core/genericElement.js';
import config from '../../config/config.json';
import Util from './util.js'
export default class TestAPI extends GenericElement {
  constructor() {
    super();
    this.util = new Util();
    this.subscribe({
      channel: 'testAPI',
      topic: 'testApiHeaderCall',
      callback: (data) => {
        console.log('testApiHeaderCall');
        this.testApiHeader(data);
      }
    });

  }

  testApiHeader(url) {
    url=window.location.origin +'/data/core/redirectAPI?url='+url;
    this.util.ajaxCall(url).then(data => {
      console.log('ajaxCall callback',data);
      this.publish({
        channel: 'testAPI',
        topic: 'testApiHeaderResponse',
        data: data
      })
    })
  }
}
window.customElements.define('x-test-api', TestAPI);
