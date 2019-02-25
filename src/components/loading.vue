<template>
  <div class="loading">
    <div>
      <img src="./../assets/loading.gif" alt="">
      <p>加载中</p>
    </div>
  </div>
</template>

<script>
  export default {

  }
</script>

<style lang="scss" scoped>
  .loading{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top:0;
    background: #fff;
    z-index: 777;
    >div{
      position: absolute;
      left: 50%;
      top:50%;
      transform: translate(-50%,-50%);
      img{
        width: 6.51rem;
        height:4.9rem;
      }
      p{
        text-align: center;
        color: #666;
        font-size: 0.36rem;
        line-height: 0.6rem;
      }
    }

  }
</style>
