import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'
import CONFIG from './../config/config'

const INDEX  = r => require.ensure([], () => r(require('@/components/index')))
const HOME  = r => require.ensure([], () => r(require('@/components/home')))
const ROOM  = r => require.ensure([], () => r(require('@/components/room')))
const LOGIN  = r => require.ensure([], () => r(require('@/components/login')))
const MY  = r => require.ensure([], () => r(require('@/components/my')))
const DOLLLIST  = r => require.ensure([], () => r(require('@/components/dolllist')))
const RECHARGE  = r => require.ensure([], () => r(require('@/components/recharge')))
const EXCHANGEDOLLS  = r => require.ensure([], () => r(require('@/components/exchangedolls')))
const ADDRESSLISTMANAGE = r => require.ensure([], () => r(require('@/components/addresslistmanage')))
const ADDRESSEDIT = r => require.ensure([], () => r(require('@/components/addressedit')))
const ORDER = r => require.ensure([], () => r(require('@/components/order')))
const GAMEHISTORY = r => require.ensure([], () => r(require('@/components/gamehistory')))
const QUESTIONS = r => require.ensure([], () => r(require('@/components/questions')))

Vue.use(Router)

var router = new Router({
  // mode: 'history',
  routes: [
    {
      path: '/index',
      component: INDEX,
      children:[
        {path: 'home',component: HOME},
        {path: 'recharge',component: RECHARGE,
          // beforeEnter: (to, from, next) => {
          //   if(!CONFIG.token){
          //     next({path:'/login'})
          //   }else {
          //     next();
          //   }
          // }
        },
        {path: 'my',component: MY,
          // beforeEnter: (to, from, next) => {
          //   if(!CONFIG.token){
          //     next({path:'/login'})
          //   }else {
          //     next();
          //   }
          // }
        },
        {path: 'dolllist',component: DOLLLIST,
          // beforeEnter: (to, from, next) => {
          //   if(!CONFIG.token){
          //     next({path:'/login'})
          //   }else {
          //     next();
          //   }
          // }
        },

      ]
    },
    {
      path:'/room',
      component:ROOM
    },
    {
      path:'/home',
      component:HOME
    },
    {
      path:'/login',
      component:LOGIN
    },
    {
      path:'/dolllist',
      component:DOLLLIST
    },
    {
      path:'/exchangedolls',
      component:EXCHANGEDOLLS
    },
    {
      path:'/addresslistmanage',
      component:ADDRESSLISTMANAGE
    },
    {
      path:'/addressedit',
      component:ADDRESSEDIT
    },
    {
      path:'/order',
      component:ORDER
    },
    {
      path:'/gamehistory',
      component:GAMEHISTORY
    },
    {
      path:'/questions',
      component:QUESTIONS
    },
    {
      path:'/',
      redirect:'/index/home'
    }
  ]
})

router.beforeEach(function (to, from, next) {

  store.commit('changeRouterList',to.path);
  next()
});

export default router
