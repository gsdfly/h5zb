<template>
  <div class="addressEdit">
    <header-title :title="title"></header-title>
    <div class="addressContent">
      <div class="section">
        <input type="text" name="name" class="name" placeholder="收件人姓名" v-model.trim="addressInfo.name"/>
      </div>
      <div class="section">
        <input type="tel" name="phone" class="phone" placeholder="手机或固定电话" v-model.trim="addressInfo.phone"/>
      </div>
      <div class="section" @click="isPopup = !isPopup">
        <span>{{addressInfo.province}}</span>
        <span>{{addressInfo.city}}</span>
        <span>{{addressInfo.area}}</span>
      </div>
      <div class="section">
        <input type="text" name="address" class="address" placeholder="详细地址（街道、门牌号等）" v-model.trim="addressInfo.address"/>
      </div>
    </div>
    <div class="default" v-show="!defaultInit">
      <i @click="changeDefault($event)" :class="{'iconfont icon-check':addressInfo.default==1}"></i><span>设为默认地址</span>
    </div>
      <button class="btn" @click="createAdd">保存</button>
    <transition name="fade">
      <div class="popup" v-show="isPopup">
        <van-area :areaList="areaList" @confirm="confirm" @cancel="cancel"/>
      </div>
    </transition>
  </div>
</template>

<script>
  import {Area} from 'vant';
  import {MessageBox} from 'mint-ui';
  import AREALIST from './../config/arealist';
  import {createAddress, updateAddress, deleteAddress, getAddressDefault} from './../api/index'
  import headerTitle from './header.vue'

  export default {
    data() {
      return {
        isShow: false,
        isPopup: false,
        areaList: AREALIST,
        defaultInit: false,
        searchResult: [],
        addressInfo: {
          "name": "",
          "phone": "",
          "province": "选择省份",
          "city": "选择城市",
          "area": "选择地区",
          "address": "",
          "post": "4444",
          "default": 1,
        },
        title:'新增地址'
      }
    },
    components:{
      headerTitle
    },
    mounted() {
      if (this.$route.query.name) {
        this.title = '修改地址';
        this.addressInfo = this.$route.query;
        this.isShow = true;
        if (this.addressInfo.default == 1) {
          this.defaultInit = true;
        }
      }
      if(this.$route.query.nodefault || this.$route.query.local){
        this.defaultInit = true;
      }
    },
    methods: {
      changeDefault(event) {
        if (event.target.className.indexOf('iconfont') != -1) {
          event.target.className = '';
          this.addressInfo.default = 0;
        } else {
          event.target.className = 'iconfont icon-check';
          this.addressInfo.default = 1;
        }
      },
      confirm(data) {
        //需要验证选择的收件地区
        if (data[0].name == '选择省份' || data[1].name == '选择城市' || data[2].name == '选择地区') {
          MessageBox('提示', '请选择正确的收件地区');
          return;
        }
        this.addressInfo.province = data[0].name;
        this.addressInfo.city = data[1].name;
        this.addressInfo.area = data[2].name;
        this.isPopup = !this.isPopup;
      },
      cancel() {
        this.isPopup = !this.isPopup;
      },
      //添加或修改地址
      createAdd() {
        if (this.addressInfo.name == '') {
          MessageBox('', '请填写收件人姓名');
          return;
        }
        if (this.addressInfo.phone == '') {
          MessageBox('', '请填写电话');
          return;
        } else {
          var telReg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
          var phoneReg = /^1(3|4|5|7|8)\d{9}$/;
          if (!(telReg.test(this.addressInfo.phone)) && !(phoneReg.test(this.addressInfo.phone))) {
            MessageBox('', '请填写正确的电话');
            this.addressInfo.phone = '';
            return;
          }
        }
        if (this.addressInfo.province == '选择省份') {
          MessageBox('', '请选择收件地区');
          return;
        }
        if (this.addressInfo.address == '') {
          MessageBox('', '请填写详细地址');
          return;
        }
        if (this.isShow) {
          updateAddress(this.addressInfo).then((data) => {
            MessageBox.alert('修改成功','').then(() => {
              this.$router.push('addresslistmanage');
            });
          })
        } else {
          createAddress(this.addressInfo).then((data) => {
            MessageBox.alert('添加成功','').then(() => {
              if (this.$route.query.local) {
                this.$router.push('exchangedolls');
              } else {
                if(this.$route.query.form){
                  this.$router.push({path:'addresslistmanage',query:{form:'exchangedolls'}});
                }else {
                  this.$router.push('addresslistmanage');
                }
              }
            });
          })
        }
      }
    }
  }
</script>

<style scoped>



  .fade-enter-active, .fade-leave-active {
    transition: transform .5s
  }

  .fade-enter, .fade-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .addressEdit {
    width: 100%;
    height: 100%;
    /*padding: 0 0.36rem;*/
    font-size: 0.48rem;
    color: #707070;
    background: #fff2f2;
    /*padding: 0.1px 0 0 0;*/
    padding: 1.26rem 0 0 0;
  }
  .popup {
    position: fixed;
    background-color: #fff;
    width: 100%;
    left: 0;
    bottom: 0;
  }
  .addressEdit .addressContent{
    margin: 0.42rem 0.36rem 0 0.36rem;
    padding: 0.08rem 0.36rem 0 0.36rem;
    background: #fff;
    border-radius: 0.18rem;
  }

  .section {
    height: 1.52rem;
    border-bottom: 1px solid #e1e1e1;
    line-height: 1.5rem;
  }
  .section:last-of-type {
    border-bottom: none;
  }

  .section input {
    width: 100%;
    height: 100%;
    border: none;
    box-sizing: border-box;
    color: #494949;
  }
  .section input::-webkit-input-placeholder { /* WebKit browsers */
    color:#707070;
  }
  .section input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:#707070;
  }
  .section input::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:#707070;
  }
  .section input:-ms-input-placeholder { /* Internet Explorer 10+ */
    color:#707070;
  }
  .btn {
    width: 8.16rem;
    height: 1.38rem;
    outline: none;
    border: none;
    border-radius: 0.18rem;
    background: #f972c7;
    color: #fff;
    font-size: 0.52rem;
    display: block;
    margin: 4rem auto 0 auto;
    /*position: fixed;*/
    /*position: absolute;*/
    /*left: 50%;*/
    /*bottom:3rem;*/
    /*transform: translateX(-50%);*/
  }

  .default {
    width: 100%;
    /*height: 0.72rem;*/
    padding:0.6rem 0 0 0.36rem ;
    color: #999;
    font-size: 0.36rem;
  }
  .default span{
    display: inline-block;
    vertical-align: middle;
  }

  .default i {
    font-size: 0.72rem;
    width: 0.72rem;
    height: 0.72rem;
    display: inline-block;
    border: 1px solid #e1e1e1;
    vertical-align: middle;
    margin: 0 0.2rem 0 0;
    color: #32d894;
    border-radius: 50%;
  }

  .default i.iconfont {
    border: none;
  }

</style>
