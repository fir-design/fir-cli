// import { createApp } from 'vue'
// import App from './App.vue'
import { v4 as uuidv4 } from 'uuid';
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
        this.ID = this.uniqueID('[SLUGIFY]');
    }

    uniqueID(prefix) {
        let id = uuidv4();
        return `${prefix}-${id}`
    }
    
    connectedCallback () {
        this.init[CAMEL]()
        this.setClasses()
    }

    setClasses() {
        let classes = this.getAttribute('classname')
        if(classes) {
            this.className = this.getAttribute('classname')
        }
    }

    init[CAMEL] () {  
        // console.log("Init: [CAMEL] ")
        // const { options } = this.props
        // this.initVue()
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