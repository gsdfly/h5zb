<template>
  <!--<div class="dolllist" v-show="htmlShow">-->
  <div class="dolllist">
  <header-title :title="'我的娃娃'">
      <i slot="history" class="iconfont icon-history" @click="goHistory"></i>
    </header-title>
    <div v-if="this.dolllist.length > 0">
      <ul class="main"  :class="{'entryMy':entryMy}">
        <li v-for="doll in dolllist" :class="{activedoll:doll.status ==1}" @click="goOrder(doll)">
          <img :src="doll.picture" alt="">
          <h3>{{doll.name}}</h3>
          <p>{{doll.created_at}}</p>
          <div class="tip">
            <p>{{doll.status ==1 ? '已兑换' : '未兑换'}}</p>
          </div>
        </li>
      </ul>
      <button v-if="(dolllist.length - already) >= 2" class="btn" :class="{'entryMy':entryMy}" @click="sendDoll">邮寄娃娃</button>
      <button @click="goDollRoom" class="btn btn2" :class="{'entryMy':entryMy}"  v-else>2个以上娃娃才可以邮寄哦~</button>
    </div>
    <div class="nothing" v-else>
      <img src="./../assets/doll/image_nothing.png" alt="">
      <p>暂时还没有抓中哦~</p>
      <button @click="goDollRoom">不信邪，现在就去抓一个!</button>
    </div>
    <loading v-show="!htmlShow"></loading>
  </div>
</template>

<script>
  import {getDollList,getAddressDefault} from './../api/index'
  import headerTitle from './header.vue'
  import CONFIG from './../config/config'
  import loading from './loading.vue'

  export default {
    data(){
      return {
        htmlShow:false,
        dolllist:[],
        dolls:[],
        already:0,
        entryMy:false,
        hasDefault:false
      }
    },
    components:{
      headerTitle,
      loading
    },
    created(){
      if(!CONFIG.token){
        this.htmlShow = true;
      }
      if(this.$route.query.entryMy){
        this.entryMy = true;
      }
      if(CONFIG.token){
      }
    },
    mounted(){
      getDollList().then((data) => {
        try {
          this.dolllist = data.response.list;
          for(var index in this.dolllist){
            if(this.dolllist[index].status){
              this.already++;
            }
          }
        }catch (err){}
        this.htmlShow = true;
      });
      getAddressDefault().then((data)=>{
        if (data.response.length != 0) {
          this.hasDefault = true;
        }
      })
    },
    methods:{
      goHistory(){
        this.$router.push('/gamehistory');
      },
      sendDoll(){
        if(this.hasDefault){
          this.$router.push('/exchangedolls');
        }else {
          this.$router.push({path:'/addressedit',query:{local:'dolllist'}});
        }
      },
      goOrder(doll){
        if(doll.status === 1){
            this.$router.push({path:"/order",query:{dollID:doll.id}});
        }
      },
      goDollRoom(){
        this.$router.push('/index/home');
      }
    }
  }
</script>

<style scoped>
  .dolllist{
    width: 100%;
    height: 100%;
    /*padding: 0 0.36rem;*/
    /*background: #fff2f2;*/
  }
  .dolllist>div{
    width: 100%;
    /*height: calc(100% - 1.26rem);*/
    height: 100%;
    /*overflow: auto;*/
  }

  .dolllist .main{
    width: 100%;
    height: 100%;
    background: #fff2f2;
    padding: 1.62rem 0.36rem 3.42rem 0.36rem;
    /*margin: 0.36rem 0 1.8rem 0;*/
    overflow: auto;
    /*overflow: hidden;*/
  }
  .dolllist ul.entryMy{
    padding: 1.62rem 0.36rem 2.2rem 0.36rem;
  }
  .dolllist .main li{
    width: calc((100% - 0.32rem)/2);
    border-radius: 0.1rem;
    float: left;
    margin: 0 0.32rem 0.36rem 0;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .dolllist .main li:nth-child(2n){
    margin: 0 0 0.32rem 0;
  }
  .dolllist .main li img{
    display: block;
    width: 100%;
    height: 3.65rem;
    vertical-align: top;
  }
  .dolllist .main li>h3{
    font-size: 0.44rem;
    color: #494949;
    font-weight: 600;
    line-height: 0.9rem;
    text-indent: 0.24rem;
  }
  .dolllist .main li>p{
    font-size: 0.36rem;
    color: #707070;
    line-height: 0.36rem;
    text-indent: 0.24rem;
    margin: 0 0 0.38rem 0;
  }
  .dolllist .main li .tip{
    width: 2.1rem;
    height: 2.1rem;
    background: #ff78cd;
    position: absolute;
    top:-1.05rem;
    left: -1.05rem;
    transform: rotate(-45deg);

  }
  .dolllist .main li .tip p{
    width: 100%;
    font-size: 0.36rem;
    color: #fff;
    line-height: 0.64rem;
    text-align: center;
    position: absolute;
    bottom: 0;
  }
  .dolllist .main li.activedoll .tip{
    background: #cacaca;
  }

  .btn{
    width: 8.16rem;
    height: 1.38rem;
    outline: none;
    border: none;
    border-radius: 0.18rem;
    background: #f972c7;
    color: #fff;
    font-size: 0.52rem;
    display: block;
    position: fixed;
    left: 50%;
    bottom:1.96rem;
    transform: translateX(-50%);
  }

  .btn2{
    background: #afafaf;
    font-size: 0.48rem;
  }
  button.entryMy{
    bottom: 0.34rem;
  }
  .nothing{
    width: 100%;
    height: 100%;
    position: relative;
    top:0;
    left: 0;
    padding: 0.1px;
  }
  .nothing>img{
    width: 4.7rem;
    display: block;
    margin: 30% auto 0 auto;
  }
  .nothing>p{
    font-size: 0.52rem;
    color: #999;
    text-align: center;
    margin: 0.6rem 0 0 0;
  }
  .nothing>button{
    width: 7.14rem;
    height: 1.38rem;
    font-size: 0.52rem;
    color: #fff;
    border-radius: 0.18rem;
    background: #f972c7;
    border: none;
    outline: none;
    position: absolute;
    bottom:25%;
    left: 50%;
    transform: translateX(-50%);
  }

</style>
