import Vue from 'vue'
import Buefy from 'buefy'
import axios from 'axios'
import VueAxios from 'vue-axios'

import VueCookies from 'vue-cookies'

import 'buefy/dist/buefy.css'

Vue.use(Buefy)
Vue.use(VueCookies)
Vue.use(VueAxios, axios)


import App from './App.vue'

new Vue({
  el: '#app',
  render: h => h(App)
  
})
