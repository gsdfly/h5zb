<template>
  <!--<div class="addressListManage" v-show="htmlShow">-->
    <div class="addressListManage">
    <header-title :title="'我的地址'"></header-title>
    <div v-if="list.length >0" class="content">
    <div class="btn" @click="createAdd"><i class="iconfont icon-jia"></i>新增地址</div>
    <ul class="addressUl">
      <li v-for="(item,index) in list" @click="changeAddress(item)">
          <h4><span>{{item.name}}</span><i>{{item.phone}}</i></h4>
          <dl class="address">
            <dt><span v-if="index==0" style="color:#f972c7">默认地址:</span><i class="iconfont icon-icon-yxj-address" v-else></i></dt>
            <dd>{{'' + item.province + item.city + item.area + item.address}}</dd>
          </dl>
        <div class="bottom" @click.stop="">
          <i class="iconfont icon-bianji" @click="editAdd(item)"></i>
          <i class="iconfont icon-shanchu1" @click="deleteAdd(item.id,$event)"></i>
        </div>
      </li>
    </ul>
    </div>
    <div class="nothing" v-else>
      <img src="./../assets/image_no_adress.png" alt="">
      <p>您还没有收货地址</p>
      <button @click="createAdd">新建地址</button>
    </div>
    <loading v-show="!htmlShow"></loading>
  </div>
</template>

<script>
  import {MessageBox} from 'mint-ui';
  import {getAddressList, deleteAddress} from './../api/index'
  import headerTitle from './header.vue'
  import loading from './loading.vue'

  export default {
    data() {
      return {
        htmlShow: false,
        chosenAddressId: '1',
        list: []
      }
    },
    components:{
      headerTitle,
      loading
    },
    mounted() {
      getAddressList().then((data) => {
        try {
          this.list = data.response.list;
        }catch (err){}
          this.htmlShow = true;
      })
    },
    methods: {
      //删除地址
      deleteAdd(id, event) {
        MessageBox.confirm('确定要删除该地址吗？','').then(action => {
          deleteAddress({"ids": [id]}).then((data) => {
            getAddressList().then((data) => {
              this.list = data.response.list;
            })
          })
        });
      },
      //编辑地址
      editAdd(item) {
        this.$router.push({path: 'addressedit', query: item});
      },
      //添加地址
      createAdd() {
        if(this.$route.query.form){
          this.$router.push({path: 'addressedit', query: {'nodefault':this.list.length === 0 ? true:false,form:'exchangedolls'}});
        }else {
          this.$router.push({path: 'addressedit', query: {'nodefault':this.list.length === 0 ? true:false}});
        }
      },
      changeAddress(item){
        if(this.$route.query.form){
          this.$router.push({path:'exchangedolls',query:item})
        }
      }
    }
  }
</script>

<style scoped>

  .addressListManage {
    width: 100%;
    height: 100%;
    padding: 0 0.36rem 0.4rem 0.36rem;
    overflow: auto;
    background: #fff2f2;
  }
  .content{
    padding: 0.1px;
    margin: 1.26rem 0 0 0;
  }
  .addressUl {
    width: 100%;
    font-size: 0.48rem;
    color: #494949;
  }

  .addressUl li {
    width: 100%;
    padding: 0.44rem 0.36rem 0 0.36rem;
    overflow: hidden;
    margin: 0.06rem 0 0 0;
    border-radius: 0.18rem;
    background: #fff;
  }
  .addressUl li:first-child {
    border: 1px solid #f972c7;
    margin: 0 0 0.37rem 0;
  }


  .addressUl li h4 {
    line-height: 0.48rem;
    margin: 0 0 0.3rem 0;
  }

  .addressUl li h4 i {
    float: right;
  }

  .addressUl li .address {
    width: 100%;
    overflow: hidden;
    color: #707070;
  }
  .addressUl li:first-child .address dt {
    width: 23%;
  }
  .addressUl li:first-child .address dd {
  width: 77%;
  }
  .addressUl li .address dt {
    float: left;
    width: 8%;
  }

  .addressUl li .address dt i {
    font-size: 0.64rem;
  }

  .addressUl li dd {
    width: 92%;
    line-height: 0.64rem;
    margin: 0.05rem 0 0 0;
    float: left;
  }

  .bottom {
    width: 100%;
    height: 1.22rem;
    margin: 0.42rem 0 0 0;
    font-size: 0.42rem;
    border-top: 1px solid #dfdfdf;
    line-height: 1.22rem;
  }

  .bottom i {
    color: #666666;
    font-size: 0.4rem;
  }
  .bottom i.icon-shanchu1{
    float: right;
    font-size: 0.5rem;
  }
  .bottom .iconfont {
    border: none;
  }
  .btn {
    width: 100%;
    height: 1.5rem;
    color: #999999;
    font-size: 0.44rem;
    display: block;
    text-align: center;
    line-height: 1.5rem;
    background: #fff;
    border-radius: 0.18rem;
    margin: 0.42rem 0 0.34rem 0;
  }
  .btn i{
    font-size: 0.4rem;
    margin: 0 0.12rem 0 0;
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
