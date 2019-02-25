// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import FastClick from 'fastclick'
import store from './store/index'
import callbackUrl from './callbackUrl'
import Vant from 'vant';
import 'vant/lib/vant-css/index.css';
import 'mint-ui/lib/style.css'
import './config/rem'
import {userLogin} from "./api/index";
import CONFIG from './config/config'

Vue.config.productionTip = false

FastClick.attach(document.body)

Vue.use(Vant);
!async function () {
  // await callbackUrl();
  // 用户登录
  await userLogin({open_id:CONFIG.open_id}).then((res)=>{
    CONFIG.token = res.response.user_info.catch_token;
  })
  //获取用户信息
  store.dispatch('getUser')


  new Vue({
    el: '#app',
    template: '<App/>',
    router,
    store,
    components: { App }
  })
}()



