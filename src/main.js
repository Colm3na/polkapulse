import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueGtag from "vue-gtag";

Vue.use(VueGtag, {
  config: { id: "UA-169023180-1" }
});
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

new Vue({
  render: h => h(App)
}).$mount('#app')
