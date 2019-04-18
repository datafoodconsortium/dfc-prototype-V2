import postal from 'postal';
export default class GenericElement extends HTMLElement {
  constructor(view) {
    super();
    this.subscriptions = [];
    this.propagatedStyle=[];
    this.genericElementChildren=[];

    if(view!=undefined){
      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.innerHTML = view;
    }

    new MutationObserver((mutationsList) => {
      mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(addedNode => {
          if (addedNode.tagName == "STYLE") {
            let injectedStyle = document.createElement('style');
            injectedStyle.appendChild(document.createTextNode(addedNode.innerText));
            this.appendPropagatedStyle(injectedStyle);
          }
          addedNode.remove();
        })
      })
    }).observe(this, {
      attributes: false,
      childList: true
    });

    this.host=this.getRootNode().host;
    if (this.host instanceof GenericElement){
      this.host.genericElementChildren.push(this);
    }
  }

  appendPropagatedStyle(injectedStyle){
    this.propagatedStyle.push(injectedStyle);
    this.shadowRoot.appendChild(injectedStyle);
    this.genericElementChildren.forEach(child=>{
      child.appendPropagatedStyle(injectedStyle.cloneNode(true));
    })
  }

  connectedCallback() {
  }

  disconnectedCallback() {
    this.subscriptions.forEach(s => {
      s.unsubscribe();
    })
  }

  attributeChangedCallback(attrName, oldVal, newVal) {
  }

  subscribe(options) {
    this.subscriptions.push(postal.subscribe(options))
  }

  publish(options) {
    postal.publish(options);
  }

}
