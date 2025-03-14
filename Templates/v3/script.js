class [CAMEL] extends HTMLElement {

    constructor (...args) {
        const self = super(...args)
        self.init()
        return self
    }

    init () {
        this.props = this.getInitialProps()
        this.resolveElements()
      }
    
    getInitialProps () {
        let data = {}
        try {
            data = JSON.parse(this.querySelector('script[type="application/json"]').innerText)
        } catch (e) {}
        return data
    }

    resolveElements() {
        this.ID = 'fir-[SLUGIFY]';
    }

    connectedCallback () {
        this.init[CAMEL]()
    }

    init[CAMEL] () {
  

    }

}

customElements.define('fir-[SLUGIFY]', [CAMEL])