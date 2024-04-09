import { createApp } from 'vue'
import App from './App.vue'

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
        this.ID = this.uniqueID('[SLUGIFY]');    }


    uniqueID(prefix) {
        let uuid = require("uuid");
        let id = uuid.v4();
        return `${prefix}-${id}`
    }

    connectedCallback () {
        this.init[CAMEL]()
    }

    init[CAMEL] () {
        // console.log("Init: [NAME]")
        this.initVue()

        const { options } = this.props
        const config = {

        }

    }

    initVue() {
        let vueWrapper = this.querySelector('[data-vue]')
        if(vueWrapper){
            vueWrapper.id = this.ID    
            const app = createApp(App)
            app.mount(`#${this.ID}`)
        }
    }
}

customElements.define('fir-[SLUGIFY]', [CAMEL])