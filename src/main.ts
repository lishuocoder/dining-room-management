import Vue from 'vue';
import App from './App.vue';
import router from './router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
//公共样式
import './assets/global.css';
//字体图标
import './assets/font/iconfont.css';
//导入nprogress包对应的js和css
import NProgress from 'nprogress'
import 'nprogress/nprogress.css';

import axios from 'axios'
//配置请求的根路径 
axios.defaults.baseURL = 'http://lishuo-api.liyangweb.com/'

router.beforeEach((to, from, next) => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})

Vue.prototype.$http = axios

Vue.config.productionTip = false;
Vue.use(ElementUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
