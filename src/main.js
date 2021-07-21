import Vue from 'vue'
import App from "./App.vue";
import router from "./router";
import store from "@/core/services/store";
import ApiService from "@/core/services/api.service";

import JwtService from "@/core/services/jwt.service";
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
// API service init
ApiService.init();

import helpers from './helpers/mixins.js';

const plugin = {
  install () {
    Vue.prototype.$helpers = helpers
  }
}
Vue.use(plugin);


router.beforeEach((to, from, next) => {
    if (to.name !== 'login' && !JwtService.getToken()) next({ name: 'login' })
    else {
        if(to.name === 'login' && JwtService.getToken())
            next({name:'blogs'})
        else
            next()
    }
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");




