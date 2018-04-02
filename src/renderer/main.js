import Vue from 'vue'
import axios from 'axios'
import iView from 'iview';

import App from './App'
import {router} from './router'
import store from './store'
import 'iview/dist/styles/iview.css';


if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false
Vue.use(iView);


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: {App},
})
