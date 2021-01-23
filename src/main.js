import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { request } from './utils'
import './utils/rem'
import store from './store';
import Vant from 'vant';
import 'vant/lib/index.css';

const { getCookie, setCookie } = require('./utils/cookie')

//

import Router from 'vue-router'
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return routerPush.call(this, location).catch(error => error)
}

//


Vue.use(Vant)

Vue.config.productionTip = false
Vue.prototype.$ajax = request;
Vue.prototype.$setCookie = setCookie;
Vue.prototype.$getCookie = getCookie;

new Vue({
    // 4. 注入根实例
    router,
    // 把store注入到根实例
    store,
    render: h => h(App),
}).$mount('#app')