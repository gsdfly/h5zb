<template>
  <div id="header">
      <h3><i class="iconfont icon-back" @click="goBack()"></i>{{title}}<slot name="history"></slot>
      </h3>
  </div>
</template>

<script>
  export default {
    props:['title'],
    methods:{
      goBack(){
        this.$router.back();
      }
    }
  }
</script>

<style>
  #header{
    width: 100%;
    height: 1.26rem!important;
    position: fixed;
    left: 0;
    top: 0;
    background: linear-gradient(to right,#ffb2b3,#ff90bc);
    color: #fff;
    font-size: 0.5rem;
    line-height: 1.26rem;
    text-align: center;
    z-index: 999;
  }
  #header .icon-back{
    position: absolute;
    left: 0.36rem;
    top: 0;
  }
  #header .icon-history{
    float: right;
    margin: 0 0.36rem 0 0;
  }

</style>
