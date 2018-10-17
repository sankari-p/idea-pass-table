import Vue from 'vue'
import App from './App.vue'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import VueGoodTablePlugin from 'vue-good-table'
import 'vue-good-table/dist/vue-good-table.css'

Vue.use(BootstrapVue)
Vue.use(VueGoodTablePlugin)

Vue.config.productionTip = false

global.VueTable = class VueTable {
  constructor (element, id, headerClassName) {
    this.app = new Vue({
      data: {
        id: id
      },
      render: h => {
        return h(App, {
          props: {
            id: id,
            headerClassName: headerClassName
          }
        })
      }
    }).$mount(element)
  }

  updateItems (id) {
    this.app.id = id
  }

  destroy () {
    this.app.$destroy()
  }
}

if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line
  new VueTable('#vue-app', 'someID', 'table-header')
}
