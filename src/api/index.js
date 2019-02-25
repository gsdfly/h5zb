import ajax from './../config/ajax'
import util from './../util/index'
import CONFIG from './../config/config'

const BaseUrl = document.URL.indexOf('catchme') !== -1 ? 'http://proxy.catchme.com.cn/api/':'http://proxy.5zhua.cn/api/';
// const BaseUrl = 'http://proxy.catchme.com.cn/api/';
const ApiUrl = document.URL.indexOf('catchme') !== -1 ? 'http://core.catchme.com.cn/':'http://core.5zhua.cn/';

//获取登录token
export const getLoginToken = (params) => {
  return ajax('GET','http://106.15.41.49:8181/token',params);
}

export const registerApp = (params) => {
  // return ajax('POST','http://core.5zhua.cn/register_app','app_device=7ba560dac7484242bc2e0a691d7cd67c&comi_bypass=comicool_5107&app_key=kyx%2bkydm6A1nXQCnfi%2bPWusy%2f8We5HYh5QFlqVIUVfk%3d&version_code=1');
  return ajax('POST',ApiUrl+'register_app',util.jsonToStr(params));
  // return ajax('POST','http://core.5zhua.cn/register_h5',util.jsonToStr(params));

}
//获取房间列表
export const getRoomList = (params)=>{
  return ajax('POST',BaseUrl+'get_room_list',params);
}
//获取房间信息
export const getRoomInfo = (params)=>{
  return ajax('POST',BaseUrl+'get_room_info',params);
}
//开始游戏
export const gameStart = (params)=>{
  return ajax('POST',BaseUrl+'game_start',params);
}
//获取默认地址
export const getAddressDefault = () => {
  return ajax('GET',BaseUrl+'address/default',{app_key:CONFIG.app.app_key,token:CONFIG.token});
}
//获取娃娃列表
export const getDollList = (params) => {
  return ajax('GET',BaseUrl+'doll',Object.assign({},{app_key:CONFIG.app.app_key,token:CONFIG.token},params));
}

//娃娃兑换
export const exchangeDolls = (params) => {
  return ajax('POST',BaseUrl+'doll/exorder/create',Object.assign({},{app_key:unescape(CONFIG.app.app_key),token:CONFIG.token},params));
}

//获取地址列表
export const getAddressList = () => {
   return ajax('GET',BaseUrl+'address',{app_key:CONFIG.app.app_key,token:CONFIG.token});
}
//删除地址
export const deleteAddress = (params) => {
  console.log(Object.assign({},{app_key:unescape(CONFIG.app.app_key),token:CONFIG.token},params));
   return ajax('POST',BaseUrl+'address/delete',Object.assign({},{app_key:unescape(CONFIG.app.app_key),token:CONFIG.token},params))
}
//创建地址
export const createAddress = (params) => {
  return ajax('POST',BaseUrl+'address/create',Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params));
}
//更新地址
export const updateAddress = (params) => {
  return ajax('POST',BaseUrl+'address/update',Object.assign({},{app_key:unescape(CONFIG.app.app_key),token:CONFIG.token},params))
}
//用户登录
export const userLogin = (params) => {
  return ajax('POST',BaseUrl+'login',Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params));
}
//获取用户信息
export const getUser = (params) => {
  return ajax('POST',BaseUrl+'user_refresh',Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params));
}
//放弃继续游戏
// http://yapi.5zhua.cn/mock/18/api/abandon_game
export const abandonGame = (params) => {
  return ajax('POST',BaseUrl+'abandon_game',Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params));
}
//娃娃id获取订单
export const dollIDGetOrder = (params) => {
   return ajax('POST',BaseUrl+'doll/order',Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params));
}
//获取游戏记录
export const gameHistory = (params) => {
    return ajax('GET',BaseUrl+'game/record',Object.assign({},{app_key:CONFIG.app.app_key,token:CONFIG.token},params));
}
//获取游戏状态http://yapi.5zhua.cn/mock/18/api/query_status
export const queryStatus = (params) => {
  return ajax('POST',BaseUrl+'query_status',Object.assign(Object.assign({},{app_key:unescape(CONFIG.app.app_key)},params)));
}


