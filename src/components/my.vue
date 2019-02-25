<template>
  <div class="my" v-if="user.user_info">
    <div class="header">
      <div>
        <img :src="user.user_info.avatar" alt="">
        <h3>{{user.user_info.nickname}}</h3>
        <p>ID:{{user.user_info.catch_uid}}</p>
      </div>
    </div>
    <div class="main">
      <ul>
        <li @click="go('wawa')"><span></span>我的娃娃<i class="iconfont icon-go1"></i></li>
        <li @click="go('jinb')"><span></span>我的金币<i class="iconfont icon-go1"></i></li>
        <li @click="go('address')"><span></span>地址<i class="iconfont icon-go1"></i></li>
        <li><span></span>音效
          <div class="switch" @click="changeSwitch">
            <span :class="{'switch-on':musicStatus,'switch-off':!musicStatus}"></span>
          </div>
        </li>
        <li><span></span>关于<i class="iconfont icon-go1"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    name: 'my',
    data(){
      return {}
    },
    computed: mapState({
      user: state => state.user.user,
      musicStatus:state => state.user.musicStatus
    }),
    methods: {
      go(param) {
        switch (param) {
          case 'wawa':
            this.$router.push('/dolllist?entryMy=true');
            break;
          case 'jinb':
            this.$router.push('/index/recharge');
            break;
          case 'address':
            this.$router.push('/addresslistmanage');
            break;
        }
      },
      changeSwitch(){
        this.$store.commit('changeMusicStatus',!this.musicStatus);
      }
    },
  }
</script>


<style lang="scss" scoped>
  .switch {
    width: 1.4rem;
    height: 0.7rem;
    position: absolute;
    right: 0.3rem;
    top: 50%;
    transform: translateY(-50%);
    span {
      width: 1.4rem;
      height: 0.7rem;
      position: absolute;
      top: 0;
      left: 0;
      background: #d9d9d9;
      border-radius: 0.35rem;
      border: 1px solid #666;
      box-sizing: content-box;
      &.switch-on{
        background: #f972c7;
        border: 1px solid #f972c7;
      }
      &.switch-off::before {
        content: '';
        width: 0.7rem;
        height: 0.7rem;
        background: #fff;
        border-radius: 50%;
        float: left;
      }
      &.switch-on::after{
        content: '';
        width: 0.7rem;
        height: 0.7rem;
        background: #fff;
        border-radius: 50%;
        float: right;
      }
    }
  }

  .my {
    width: 100%;
    height: 100%;
    background: #fff2f2;
    .header {
      width: 100%;
      height: 5rem;
      background: linear-gradient(to right, #ffb1c4, #ff91d3);
      position: relative;
      > div {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
        color: #fff;
        img {
          width: 2.16rem;
          height: 2.16rem;
          border: 2px solid #fff;
          border-radius: 50%;
        }
        h3 {
          font-size: 0.48rem;
          line-height: 0.48rem;
          margin: 0.36rem 0 0 0;
        }
        p {
          font-size: 0.36rem;
          line-height: 0.36rem;
          margin: 0.24rem 0 0 0;
        }
      }
    }
    .main {
      width: 100%;
      padding: 0 0.36rem;
      ul {
        width: 100%;
        padding: 0.3rem 0 0 0;
        li {
          width: 100%;
          height: 1.56rem;
          line-height: 1.56rem;
          background: #fff;
          border-radius: 0.18rem;
          margin: 0 0 0.3rem 0;
          font-size: 0.48rem;
          color: #494949;
          text-indent: 1rem;
          position: relative;
          i {
            font-size: 0.8rem;
            line-height: 1.56rem;
            float: right;
            color: #999999;
          }
          > span {
            float: left;
            width: 0.74rem;
            height: 0.9rem;
            margin: 0.33rem 0 0 0.54rem;
          }
          &:first-child > span {
            background: #fff url("./../assets/my/icon_toy.png") no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(2) > span {
            background: #fff url("./../assets/my/home_icon_bi.png") no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(3) > span {
            background: #fff url("./../assets/my/icon_dizhi.png") no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(4) > span {
            background: #fff url("./../assets/my/icon_personal_sound.png") no-repeat;
            background-size: 100% 100%;
          }
          &:nth-child(5) > span {
            background: #fff url("./../assets/my/icon_toy.png") no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
</style>
