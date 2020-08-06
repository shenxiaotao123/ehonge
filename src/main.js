// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import less from 'less'
import VueCookies from 'vue-cookies'

Vue.config.productionTip = false //阻止启动生产消息
Vue.use(less)
Vue.use(VueCookies) 

import axios from 'axios'
import qs from 'qs'
Vue.prototype.$ajax = axios    //全局注册，使用方法为:this.$axios
Vue.prototype.qs = qs           //全局注册，使用方法为:this.qs
axios.defaults.timeout = 5000 // 请求超时
axios.defaults.baseURL = 'http://api.ehonge.com/api'
axios.interceptors.request.use((config) => {
  if (config.method === 'get') {
    var querystring = require('querystring');
    config.data = querystring.encode(config.data);
  }
  if (config.method === 'post') {
    var querystring = require('querystring');
    config.data = querystring.encode(config.data);
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});


/* eslint-disable no-new */
new Vue({// 页面入口
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
