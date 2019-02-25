<template>
  <div class="index">
    <router-view></router-view>
    <div class="footer">
      <ul>
        <router-link to="/index/home" tag="li"><p class="home"><span></span>首页</p></router-link>
        <router-link to="/index/dolllist" tag="li"><p class="wawa"><span></span>娃娃</p></router-link>
        <router-link to="/index/recharge" tag="li"><p class="recharge"><span></span>充值</p></router-link>
        <router-link to="/index/my" tag="li"><p class="my"><span></span>我的</p></router-link>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  @mixin center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
.index{
  width:100%;
  height: 100%;
  .footer{
    width: 100%;
    height: 1.62rem;
    /*border-top: 1px solid #d4d5d7;*/
    background: rgba(255,255,255,0.9);
    position: fixed;
    left:0;
    bottom:0;
    z-index: 999;
    ul{
      width: 100%;
      height: 100%;
      li{
        float: left;
        width: 25%;
        height: 100%;
        text-align: center;
        font-size: 0.35rem;
        color: #a9a9a9;
        position: relative;
        .home span{
          background: url("./../assets/tab/tab_home_default.png") no-repeat;
          background-size: 100% 100%;
        }
        .wawa span{
          background: url("./../assets/tab/tab_wawa_default.png") no-repeat;
          background-size: 100% 100%;
        }
        .recharge span{
          background: url("./../assets/tab/tab_recharge_default.png") no-repeat;
          background-size: 100% 100%;
        }
        .my span{
          background: url("./../assets/tab/tab_my_default.png") no-repeat;
          background-size: 100% 100%;
        }
        p{
         @include center;
          span{
            display: block;
            width: 0.76rem;
            height: 0.72rem;
          }
        }
      }
      .router-link-active .home span{
        background: url("./../assets/tab/tab_home_selected.png") no-repeat!important;
        background-size: 100% 100%!important;
      }
      .router-link-active .wawa span{
        background: url("./../assets/tab/tab_wawa_selected.png") no-repeat!important;
        background-size: 100% 100%!important;
      }
      .router-link-active .recharge span{
        background: url("./../assets/tab/tab_recharge_selected.png") no-repeat!important;
        background-size: 100% 100%!important;
      }
      .router-link-active .my span{
        background: url("./../assets/tab/tab_my_selected.png") no-repeat!important;
        background-size: 100% 100%!important;
      }
    }
  }
}
</style>
