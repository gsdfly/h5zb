<template>
  <div class="questions">
    <header-title :title="'常见问题'"></header-title>
    <ul>
      <li v-for="(item,index) in questions" @click="changeShow(index)">
        <div class="question">
          <div class="img">
            <img :src="item.bear" alt="">
          </div>
          <h3>{{item.title}}</h3>
          <i class="iconfont" :class="current == index ? 'icon-fa-angle-up' : 'icon-fa-angle-down'" ></i>
        </div>
        <div class="questionInfo" v-show="current == index">
            <div>
              <p v-html="item.content"></p>
              <img v-for="imgUrl in item.imgs" :src="imgUrl" alt="">
            </div>
          </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {questions} from './../config/questions.js'
  import headerTitle from './header.vue'
  export default {
    name:'questions',
    data(){
      return{
        current:-1,
        questions:questions
      }
    },
    components:{
      headerTitle
    },
    methods:{
      changeShow(index){
        if(this.current == index){
          this.current = -1;
        }else {
          this.current = index;
        }
      }
    }
  }
</script>

<style scoped>
  .questions{
    width: 100%;
    height: 100%;
    padding: 0.48rem 0.36rem;
    background: #fff2f2;
    overflow: auto;
    font-size: 0.48rem;
    color: #494949;
  }
  .questions ul{
    width: 100%;
    margin: 1.26rem 0 0 0;
  }
  .questions ul li{
    width: 100%;
    background: #fff;
    margin: 0 0 0.18rem 0;
    border-radius: 0.18rem;
  }
  .questions ul li .question{
    width: 100%;
    height: 1.62rem;
  }
  .questions ul li .question .img{
    width: 1.74rem;
    height: 100%;
    position: relative;
    float: left;
  }
  .questions ul li .question .img img{
    width: 1.02rem;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
  }
  .questions ul li .question h3{
    float: left;
    line-height: 1.62rem;
  }
  .questions ul li .question i{
    float: right;
    margin: 0 0.36rem 0 0;
    line-height: 1.62rem;
    color: #999999;
  }
  .questions ul li .questionInfo{
    width: 100%;
    padding: 0 0.35rem 0.48rem 0.35rem;
    /*background: red;*/
  }
  .questions ul li .questionInfo>div{
    border-top: 1px solid #e1e1e1;
    padding: 0.3rem 0 0 0;
  }

  .questions ul li .questionInfo p{
    font-size: 0.44rem;
    color: #494949;
    line-height: 0.76rem;
  }
  .questions ul li .questionInfo p span{
    background: #b7c8ff;
    padding: 0.06rem 0.11rem;
    border-radius: 0.04rem;
  }
  .questions ul li .questionInfo img{
    width: 100%;
    margin: 0.3rem 0 0 0;
    display: block;
  }




</style>
