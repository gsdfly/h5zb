import util from './util/index'
import CONFIG from './config/config'


const callbackUrl = () => {
  return new Promise((resolve, reject) => {
    // 删除url中某个参数,并跳转
    var open_id = util.getParamByName('open_id');
      if (open_id) {
        util.SetCookie('open_id', open_id)
        window.location.href = util.funcUrlDel('open_id');
      } else if (util.GetCookie('open_id')) {
        //用户登录
        resolve()
        return
      } else {
          // window.location.href = `${CONFIG.url}/h5/oauth/wechat?callback=http://www.5zhua.cn/catchzb/&app_key=${CONFIG.app.app_key}`
        var url = document.URL;
        if(document.URL.indexOf('#') !== -1){
           url = document.URL.substring(0,document.URL.indexOf('#'));
        }
        window.location.href = `${CONFIG.url}/h5/oauth/wechat?callback=${url}&app_key=${CONFIG.app.app_key}`
      }
    })
}

export default callbackUrl
