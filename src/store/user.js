import {gameStart, getUser} from "../api/index";

const state = {
  user: {},
  coin: 0,
  routerList:[],
  direction:'',
  musicStatus:true
}
const mutations = {
  setUser(state, user) {
    state.user = user;
  },
  setCoin(state, coin) {
    state.coin = coin
  },
  changeRouterList(state,router){
    var index = state.routerList.indexOf(router);
    var length = state.routerList.length;
    if(length===0){
      state.routerList.push(router);
      return;
    }
    if( index === -1){
      state.routerList.push(router);
      state.direction = 'right';
    }else {
      state.routerList.splice(index+1,(length-index-1));
      state.direction = 'left';
    }
  },
  changeDirection(state,direction){
    state.direction = direction;
  },
  changeMusicStatus(state,status){
    state.musicStatus = status;
  }
}
const actions = {
  getUser({commit}) {
    return new Promise((success, error) => {
      getUser().then((res) => {
        commit('setUser', res.response);
        commit('setCoin', res.response.user_wallet.coin);
        success(res);
      }).catch((err) => {
        error(err);
      })
    })
  },
  gameStart({commit}, params) {
    return new Promise((success, error) => {
      gameStart(params).then((res) => {
        if (res.ret === 0) {
          commit('setCoin', res.response.coin);
          success(res);
        } else {
          error(res);
        }
      }).catch((err) => {
        error(err);
      })
    })
  },
}

export default {
  state,
  mutations,
  actions
}
