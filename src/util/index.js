// 工具函数
import CryptoJS from 'crypto-js'

// 通过id获取元素
function getById(selecotr) {
  return document.getElementById(selecotr);
}


// 隐藏元素
function hideElement(dom) {
  for (var i = 0; i < dom.length; i++) {
    dom[i].style.display = 'none';
  }
}
// 显示元素
function showElement(dom) {
  for (var i = 0; i < dom.length; i++) {
    dom[i].style.display = 'block';
  }
}
// 设置本地存储数据
function setLocal(key, value) {
  localStorage.setItem(key, value);
}
// 获取本地存储数据
function getLocal(key) {
  return localStorage.getItem(key);
}

//生成唯一标识
function  generateUUID(){
  var d = new Date().getTime();
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
//获取用户唯一标识
function getUUID() {
  if(getLocal('UUID')){
    return getLocal('UUID')
  }else {
   setLocal('UUID',generateUUID());
  }
}

function getRandom(m,n) {
  return parseInt(Math.random()*(n-m+1)+m);
}

function getRegisterAppSign(app_device,app_key,nonce,timestamp,version_code,secret) {
  app_key = unescape(app_key);
  console.log(app_device);
  console.log(app_key);
  console.log(nonce);
  console.log(timestamp);
  console.log(version_code);
  console.log('app_device'+app_device+'app_key'+app_key+'nonce'+nonce+'timestamp'+timestamp+'version_code'+version_code);
  console.log(CryptoJS.HmacSHA256('app_device'+app_device+'app_key'+app_key+'nonce'+nonce+'timestamp'+timestamp+'version_code'+version_code, secret).toString().toLocaleUpperCase())
  return CryptoJS.HmacSHA256('app_device'+app_device+'app_key'+app_key+'nonce'+nonce+'timestamp'+timestamp+'version_code'+version_code, secret).toString().toLocaleUpperCase();
}

function getIotSign(clientId,appControl,timestamp) {
  // console.log('clientId'+clientId+'deviceName'+appControl.device_name+'productKey'+appControl.product_key+'timestamp789');
  // console.log( appControl.device_secret);
  // console.log(CryptoJS.HmacSHA1('clientId'+clientId+'deviceName'+appControl.device_name+'productKey'+appControl.product_key+'timestamp789', appControl.device_secret).toString())
  return CryptoJS.HmacSHA1('clientId'+clientId+'deviceName'+appControl.device_name+'productKey'+appControl.product_key+'timestamp'+timestamp, appControl.device_secret).toString()
}

function jsonToStr(obj){
  var str = '';
  if (Object.keys) {
    var keys = Object.keys(obj)
    for (var key in obj) {
      if (key != keys[keys.length - 1]) {
        str += key + '=' + obj[key] + '&';
      } else {
        str += key + '=' + obj[key];
      }
    }
  } else {
    for (var key in obj) {
      str += key + '=' + obj[key] + '&';
    }
  }
  console.log(str);
  return str;
}

// 删除url中某个参数,并跳转
function funcUrlDel(name) {
  var loca = window.location;
  var baseUrl = loca.origin + loca.pathname ;
  var query = loca.search.substr(1);
  if (query.indexOf(name) > -1) {
    var obj = {}
    var arr = query.split("&");
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].split("=");
      obj[arr[i][0]] = arr[i][1];
    }
    ;
    delete obj[name];
    if (JSON.stringify(obj) !== '{}') {
     baseUrl = baseUrl+'?';
    }
    var url = baseUrl + JSON.stringify(obj).replace(/[\"\{\}]/g, "").replace(/\:/g, "=").replace(/\,/g, "&");
    return url
  }
  ;
}

function getParamByName(name){
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i")
  var r = window.location.search.substr(1).match(reg)
  if (r != null) return unescape(r[2]);
  return null
}

function GetCookie(name){
  var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) {
    return unescape(arr[2])
  } else {
    return null
  }
}

function SetCookie(name, value){
  var exp = new Date()
  exp.setTime(exp.getTime() + 60 * 60 * 1000)//过期时间 2分钟
  document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString()
}


export default {
  getById,
  getUUID,
  getRandom,
  getRegisterAppSign,
  getIotSign,
  jsonToStr,
  funcUrlDel,
  hideElement,
  showElement,
  setLocal,
  getLocal,
  getParamByName,
  GetCookie,
  SetCookie
};
