<template>
  <div class="home">
    <header-title :title="'我抓'"></header-title>
    <div class="banner">
      <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in banner"><img :src="item.picture" alt="" style="width: 100%"></mt-swipe-item>
      </mt-swipe>
    </div>
    <div style="height: 0.2rem;background:#fff2f2"></div>
    <div class="tabBar" style=" position: sticky;left: 0;top: 1.24rem;z-index: 777;">
      <ul>
        <li :class="{'is-click':isTag === 0}" @click.prevent.stop="getTagList(0)">全部</li>
        <li v-for="item in tagList" :class="{'is-click':isTag === item.id}" @click.prevent.stop="getTagList(item.id)">{{item.name}}</li>
      </ul>
    </div>
    <div class="line">
      <div></div>
    </div>
    <div class="roomList">
      <div class="room" v-for="item in roomTagList" @click="goRoom(item.room_id,item.status)">
        <div class="dollimg">
          <img :src="item.picture" alt="" @click.prevent="">
          <p><span :class="{'kx':item.status ==0,'yx':item.status == 1,'lx':item.status == 2}"></span><i>{{item.status === 1 ? '游戏中' : (item.status === 2 ? '离线' : '空闲中')}}</i></p>
          <b v-if="item.tags.indexOf(4) !== -1">代抓</b>
        </div>
        <h3>{{item.room_id}}</h3>
        <p><span></span>{{item.price}}币/次</p>
      </div>
    </div>
    <loading v-show="!htmlShow"></loading>
  </div>
</template>

<script>
  import {userLogin,getRoomList} from './../api/index'
  import headerTitle from './header.vue'
  import { Swipe, SwipeItem } from 'mint-ui';
  import CONFIG from './../config/config'
  import { mapState } from 'vuex'
  import loading from './loading.vue'

  export default {
    name:'home',
    data(){
      return {
        roomList:[],
        banner:[],
        tagList:[],
        isTag:0,
        roomTagList:[],
        htmlShow:false
      }
    },
    computed: mapState({
      user: state => state.user,
    }),
    components:{
      mtSwipe:Swipe,
      mtSwipeItem:SwipeItem,
      headerTitle,
      loading
    },
    created(){
//      this.$store.dispatch('getUser')
      getRoomList({
        app_key:unescape(CONFIG.app.app_key)
      }).then((res)=>{
        this.htmlShow = true;
        this.roomList = res.response.room_list;
        this.banner = res.response.banner;
        this.tagList = res.response.tag_list;
        this.roomTagList = this.roomList;
      })
    },
    methods:{
      goRoom(roomId,status){
        this.$router.push({path:'/room',query:{roomId:roomId,status:status}});
      },
      getTagList(tagId){
        this.isTag = tagId;
        if(tagId === 0){
          this.roomTagList = this.roomList;
          return;
        }
        var currentRoomList = [];
        for(var i=0;i<this.roomList.length;i++){
          if(this.roomList[i].tags.indexOf(tagId) !== -1){
            currentRoomList.push(this.roomList[i]);
          }
        }
        this.roomTagList = currentRoomList;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .home{
    width: 100%;
    height:100%;
    background: #fff;
    color: #494949;
    overflow: auto;
    /*padding: 1.26rem 0 0 0;*/
    .header{
      width: 100%;
      height: 1.26rem;
      background: #ff9bcf;
      color: #fff;
      font-size: 0.5rem;
      line-height: 1.26rem;
      text-align: center;
    }
    .banner{
      width: 100%;
      height: 5.34rem;
      padding: 0.36rem;
      background: #fff;
      margin: 1.26rem 0 0 0;
      div{
        border-radius: 0.3rem;
      }
    }
    .tabBar{
      width: 100%;
      height: 1.26rem;
      /*padding: 0.2rem 0 0 0;*/
      font-size: 0.45rem;
      line-height: 1.26rem;
      color: #99999a;
      ul{
        width: 100%;
        height: 1.26rem;
        padding: 0 0.36rem;
        background: #fff;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .is-click{
        color: #f972c7;
      }
    }
    .line{
      width: 100%;
      padding: 0 0.36rem;
      background: #fff;
      >div{
        /*margin: 0 0.36rem;*/
        width: 100%;
        margin: 0 auto;
        height: 0.03rem;
        background:url("./../assets/home/line.png") no-repeat left bottom;
      }
    }
    .roomList{
      background: #fff;
      overflow: hidden;
      padding:0.36rem;
      width: 100%;
      margin: 0 0 0.92rem 0;
      .room{
        width: 4.86rem;
        float: left;
        margin: 0 0 0.7rem 0;
        .dollimg{
          /*height: 4.86rem;*/
          border-radius: 0.3rem;
          border: 1px solid #f972c7;
          overflow: hidden;
          position: relative;
          b{
            position: absolute;
            left: 0.2rem;
            top:-0.01rem;
            background: url("./../assets/home/home_bg_replace.png") no-repeat;
            background-size: 100% 100%;
            width: 0.84rem;
            height: 0.9rem;
            color: #fff;
            text-align: center;
            line-height: 0.9rem;
            font-size: 0.36rem;
          }
          img{
            width: 100%;
          }
          p{
            height: 0.9rem;
            background: rgba(251,250,241,0.8);
            line-height: 0.9rem;
            font-size: 0.38rem;
            position: absolute;
            width: 100%;
            bottom: 0;
            span{
              width: 0.38rem;
              height: 0.38rem;
              border-radius: 50%;
              display: inline-block;
              vertical-align: middle;
              margin: 0 0.1rem 0 0.2rem;
              &.kx{
                background: #3b8ede;
              }
              &.lx{
                background: #999;
              }
              &.yx{
                background: #ff9edb;
              }
            }
            i{
              display: inline-block;
              vertical-align: middle;
            }
          }
        }
        h3{
          line-height: 0.84rem;
          font-size: 0.45rem;
          margin: 0.1rem 0 0 0;
        }
        >p{
          width: 100%;
          height: 0.42rem;
          font-size: 0.36rem;
          color: #fdc72f;
          span{
            width: 0.42rem;
            height: 0.42rem;
            background: url("./../assets/home/home_icon_bi.png") no-repeat;
            background-size: 100% 100%;
            float: left;
            margin: 0 0.1rem 0 0;
          }
        }
        &:nth-child(2n){
          float: right;
        }
      }
    }
  }
</style>
