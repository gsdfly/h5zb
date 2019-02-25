import util from './../util/index'

// const app_device = util.getUUID();
// const app_key='bExvnRJNRcbWFlkqr3cr7CA9r7I+fR/RW9EJFjmX54o=';//h5
// const app_key = 'bExvnRJNRcbWFlkqr3cr7CA9r7I%2bfR%2fRW9EJFjmX54o%3d';
// const app_key = 'kyx+kydm6A1nXQCnfi+PWusy/8We5HYh5QFlqVIUVfk=';  //app
const app_key = 'kyx%2bkydm6A1nXQCnfi%2bPWusy%2f8We5HYh5QFlqVIUVfk%3d';
const nonce = util.getRandom(100000, 999999);
const timestamp = (new Date().getTime() / 1000).toFixed(0);
const version_code = 100000;

// const secret = '0ckf89e19c0d2bf9a0i13f9faf863iu0';//h5
const secret = '0c9f89e19cu9oie9203f9faf863sb3'; //app

let CONFIG = {
  url:document.URL.indexOf('catchme') !== -1 ? 'http://front.catchme.com.cn':'http://front.5zhua.cn',
  jg: {
    appid: 2741915952,
    // appid:3265350344,
    server:'ws://test2-wsliveroom-api.zego.im:8181/ws',//测试
    // server: 'ws://wsliveroom2741915952-api.zego.im:8181/ws',
    idName: "" + new Date().getTime() + Math.floor(Math.random() * 100000),
    nickName: 'ly',
    logUrl: 'ws://wsliveroom2741915952-api.zego.im:8181/log'
  },
  app: {
    secret: secret,
    // app_device: util.GetCookie('open_id') || util.getParamByName('open_id'),//使用用户的open_id注册
    // app_device:'5a6834bbeb121',
    app_device:'5a619d796b748',
    app_key: app_key,
    nonce: nonce,
    timestamp: timestamp,
    version_code: version_code,
  },
  // open_id:util.GetCookie('open_id') || util.getParamByName('open_id'),
  // open_id:'5a6834bbeb121',
  open_id:'5a619d796b748',
  // token:util.GetCookie('token_') || util.getParamByName('token') || 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vcHJveHkuNXpodWEuY24vYXBpL2xvZ2luIiwiaWF0IjoxNTE5Nzg5NzMzLCJleHAiOjE1MjQ5Njc3MzMsIm5iZiI6MTUxOTc4OTczMywianRpIjoiUnduMlFRN1QxSUhFUmVrbSIsInN1YiI6NTM0LCJwcnYiOiIzN2I3YzUwYjI1MDQxYTRjMjBmZTQ3YzI0MmUxYmZkMGY2MzA5MmM1In0.3QyPs4BhpVA-BO8fd2pQ9QqycUCMVmFGu518Jcuheno',
  token:'',
  pageUrl: document.URL.indexOf('catchme') != -1 ? 'http://www.catchme.com.cn/' : 'http://www.5zhua.cn/',
}


export default CONFIG
