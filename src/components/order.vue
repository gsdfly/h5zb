<template>
  <!--<div class="order" v-if="htmlShow">-->
  <div class="order">
  <header-title :title="'我的订单'"></header-title>
    <div class="orderInfo" v-if="htmlShow">
      <div class="imgs">
        <img v-for="(doll,index) in orderInfo.doll_snapshot.slice(0,2)" :src="doll.picture" alt="">
      </div>
      <dl>
        <dt>当前状态</dt>
        <dd>{{orderInfo.status}}</dd>
      </dl>
      <dl>
        <dt>快递</dt>
        <dd>{{orderInfo.express_company}}</dd>
      </dl>
      <dl>
        <dt>订单号</dt>
        <dd>{{orderInfo.express_no}}</dd>
      </dl>
    </div>
    <div class="userInfo" v-if="htmlShow">
      <dl>
        <dt>收件人</dt>
        <dd>{{orderInfo.address_snapshot.name}}</dd>
      </dl>
      <dl>
        <dt>联系电话</dt>
        <dd>{{orderInfo.address_snapshot.phone}}</dd>
      </dl>
      <dl>
        <dt>地址</dt>
        <dd>
          {{'' + '' + orderInfo.address_snapshot.province + orderInfo.address_snapshot.city + orderInfo.address_snapshot.area + orderInfo.address_snapshot.address}}
        </dd>
      </dl>
    </div>
    <loading v-show="!htmlShow"></loading>
  </div>
</template>

<script>
  import {dollIDGetOrder} from './../api/index'
  import headerTitle from './header.vue'
  import loading from './loading.vue'

  export default {
    name: 'order',
    data() {
      return {
        orderInfo: {},
        htmlShow: false
      }
    },
    components:{
      headerTitle,
      loading
    },
    mounted() {
      var id = this.$route.query.dollID
      dollIDGetOrder({id: id}).then((res) => {
        this.orderInfo = res.response;
        this.htmlShow = true;
      })
    }
  }
</script>

<style scoped>
  .order {
    width: 100%;
    height: 100%;
    padding: 0.36rem;
    background: #fff2f2;
    overflow: auto;
    font-size: 0.44rem;
    color: #999999;
  }

  .order .orderInfo {
    width: 100%;
    padding: 0.36rem 0.36rem 0 0.36rem;
    background: #fff;
    border-radius: 0.18rem;
    overflow: hidden;
    margin: 1.26rem 0 0 0;
  }

  .order .orderInfo .imgs {
    width: 100%;
    /*height: 2.1rem;*/
    overflow: auto;
    margin: 0 0 0.12rem 0;
    /*display: flex;*/
    /*justify-content: space-between;*/
    /*flex-wrap: wrap;*/
  }

  .order .orderInfo .imgs img {
    width: 2.1rem;
    /*height: 100%;*/
    float: left;
    border-radius: 0.18rem;
    /*margin: 0 0.3rem 0.3rem 0;*/
    margin-right:calc((100% - 8.4rem)/3);
    margin-bottom:calc((100% - 8.4rem)/3);
  }
  .order .orderInfo .imgs img:nth-of-type(4n) {
    margin: 0;
  }

  .order dl {
    width: 100%;
    min-height: 1.66rem;
    line-height: 1.65rem;
    border-top: 1px solid #dfdfdf;
    overflow: hidden;
  }

  .order dl dt {
    float: left;
  }

  .order dl dd {
    float: right;
    max-width: 88%;
    color: #494949;
  }

  .order .userInfo {
    width: 100%;
    padding: 0 0.36rem 0.36rem 0.36rem;
    background: #fff;
    margin: 0.36rem 0 0 0;
    border-radius: 0.18rem;
  }

  .order .userInfo dl:first-of-type {
    border-top: none;
  }

  .order .userInfo dl:last-of-type {
    line-height: 0.5rem;
    padding: 0.6rem 0 0 0;
  }


</style>
