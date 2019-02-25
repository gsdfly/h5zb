<template>
  <!--<div class="gamehistory" v-if="htmlShow" @scroll="addEventScroll($event)">-->
    <div class="gamehistory" @scroll="addEventScroll($event)">
    <header-title :title="'游戏记录'"></header-title>
    <ul v-if="dataList.length > 0" class="main">
      <li v-for="item in dataList">
          <div class="doll"><img :src="item.image" alt=""></div>
            <div class="dollInfo">
              <h3>{{item.doll_name}}</h3>
              <p>{{item.start_time}}</p>
            </div>
            <div class="caught">
              <img v-if="item.prize" src="./../assets/stamp_success.png" alt="">
              <span v-else>抓取失败</span>
            </div>
      </li>
    </ul>
    <div class="nothing" v-else>
      <img src="./../assets/history_none.png" alt="">
      <p>您还没有进行过一场游戏</p>
      <button @click="goDollRoom">去游戏</button>
    </div>
    <loading v-show="!htmlShow"></loading>
  </div>
</template>

<script>
  import {gameHistory} from './../api/index'
  import headerTitle from './header.vue'
  import loading from './loading.vue'

  export default {
    name:'gamehistory',
    data(){
      return {
        htmlShow:false,
        dataList:{},
        current_page:1,
        hasNext:true,
        size:20,
        loading:true,
      }
    },
    components:{
      headerTitle,
      loading
    },
    mounted(){
      gameHistory({page:1,size:this.size}).then((res)=>{
        try {
          this.dataList = res.response.list;
          this.current_page = res.response.pagination.current_page;
          if(res.response.pagination.current_page === res.response.pagination.total_pages){
            this.hasNext = false;
          }
        }catch(err) {}
        this.htmlShow = true;
      })
    },
    methods:{
      goDollRoom(){
        this.$router.push('index/home')
      },
      addEventScroll(event){
        if((event.target.scrollTop + event.target.clientHeight*3/2)>= document.querySelector('.main').offsetHeight){
          if(this.loading){
            this.getGameHistory();
          }
        }
      },
      getGameHistory(){
        this.loading = false;
        console.log(this.hasNext);
        if(this.hasNext){
          gameHistory({page:(this.current_page+1),size:this.size}).then((res)=>{
            this.loading = true;
           try {
             res.response.list.forEach(function (value) {
               this.dataList.push(value);
             }.bind(this))
             this.current_page = res.response.pagination.current_page;
             if(res.response.pagination.current_page === res.response.pagination.total_pages){
               this.hasNext = false;
             }
           }catch(err) {}
          }).catch(()=>{
            this.loading = true;
          })
        }
      }
    }
  }
</script>

<style scoped>
  .gamehistory{
    width: 100%;
    height: 100%;
    background: #fff2f2;
    overflow: auto;
    font-size: 0.48rem;
  }
  .gamehistory ul{
    width: 100%;
    /*height: 100%;*/
    padding:0.36rem 0.36rem 0.3rem 0.36rem;
    /*overflow: auto;*/
    margin: 1.26rem 0 0 0;
  }
  .gamehistory ul li{
    width: 100%;
    height: 2.46rem;
    padding: 0.18rem 0.28rem;
    background: #fff;
    margin: 0 0 0.06rem 0;
    border-radius: 0.18rem;
  }
  .gamehistory ul li .doll{
    width: 2.1rem;
    height: 100%;
    float: left;
  }
  .gamehistory ul li .doll img{
    display: block;
    width: 100%;
    height: 100%;
    border-radius: 0.18rem;
  }
  .gamehistory ul li .dollInfo{
    /*width: 100;*/
    float: left;
    margin: 0 0 0 0.54rem;
       }
  .gamehistory ul li .dollInfo h3{
    line-height: 1.3rem;
  }
  .gamehistory ul li .dollInfo p{
    font-size: 0.36rem;
    color: #999999;
  }

  .gamehistory ul li .caught{
    float: right;
    font-size: 0.36rem;
    color: #999999;
    line-height: 2.1rem;
  }
  .gamehistory ul li .caught img{
    margin: 0.2rem 0 0 0;
    width: 1.82rem;
    height: 1.69rem;
    display: block;
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
    width: 2.84rem;
    display: block;
    margin: 30% auto 0 auto;
  }
  .nothing>p{
    font-size: 0.52rem;
    color: #999;
    text-align: center;
    margin: 2rem 0 0 0;
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
