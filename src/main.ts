import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//公共样式
import './assets/global.css'
//字体图标
import './assets/font/iconfont.css'

import axios from 'axios'
//配置请求的根路径 
axios.defaults.baseURL = 'http://lishuo-api.liyangweb.com/'
// axios.defaults.withCredentials = true;
Vue.prototype.$http = axios

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
