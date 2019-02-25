<template>
  <div class="room">
    <div v-if="musicStatus">
      <audio class="background_music" loop>
        <source  src="./../assets/music/background_music.mp3" type="audio/mp3">
      </audio>
      <audio class="catch_failed" >
        <source  src="./../assets/music/catch_failed.mp3" type="audio/mp3">
      </audio>
      <audio class="catch_success" >
        <source  src="./../assets/music/catch_success.mp3" type="audio/mp3">
      </audio>
      <audio class="ready_go">
        <source src="./../assets/music/ready_go.mp3" type="audio/mp3">
      </audio>
      <audio class="moving">
        <source  src="./../assets/music/moving.mp3" type="audio/mp3">
      </audio>
      <audio class="after_catch">
        <source  src="./../assets/music/after_catch.mp3" type="audio/mp3">
      </audio>
    </div>
    <div class="header">
      <i class="iconfont"></i>
      <div class="roomusers">
        <div>
          <div class="users">
            <h3>{{roomOnline.count}}人</h3>
            <p>在房间</p>
          </div>
          <img v-for="(user,index) in roomOnline.user_list.slice(0,3)" :src="user.avatar" alt="" >
        </div>
      </div>
    </div>
    <div class="main">
      <i class="iconfont icon-question" @click="goQuestions()"></i>
      <div class="content">
        <div class="view-wrapper front" id="view-wrapper">
          <!-- 视角切换按钮 -->
          <div @click="switchView" class="switch-btn" id="switch-btn" data-switch="1"></div>
          <div class="frontview-wrapper" :class="{'high':view === 'front'}">
            <!-- 正面视图 -->
            <canvas id="frontview"></canvas>
          </div>
          <div class="sideview-wrapper" :class="{'high':view === 'side'}">
            <!-- 侧面视图 -->
            <canvas id="sideview"></canvas>
          </div>
          <p style="position: absolute;right: 0.36rem;top: 0;line-height: 0.5rem;background: #fff;z-index: 999;padding: 0 0.3rem">在线：{{roomOnline.count}}</p>
        </div>
      </div>
      <div class="content2" v-if="showContent">
        <div class="view-wrapper2">
          <p v-if="roomInfo.status !== 2">游戏准备中...</p>
          <p v-else>当前房间处于离线状态，请更换房间</p>
          <img src="./../assets/room/room_image_ready.png" alt="">
        </div>
      </div>
    </div>
    <div class="footer footer2">
      <div class="status status-free" v-if="roomInfo.status === 0 && !start">
        <button @click="startGame">开始游戏<span>{{price}}币/次</span></button>
        <div class="recharge">
          <p>我的金币</p>
          <p>{{coin}}</p>
          <button @click="goRecharge"><span>+</span>充值</button>
        </div>
      </div>
      <div class="status status-busy" v-if="roomInfo.status === 1 && !start">
           <div class="gameuser">
             <img :src="roomInfo.avatar" alt="">
          <div >
            <h3><span>{{roomInfo.nickname}}</span>游戏中</h3>
            <p>{{price}}币/次</p>
          </div>
        </div>
        <div class="recharge">
          <p>我的金币</p>
          <p>{{coin}}</p>
          <button @click="goRecharge"><span>+</span>充值</button>
        </div>
      </div>
      <div class="status status-control" v-if="appControl.product_key"  v-show="start" >
        <mqttws ref="mqtt" :appControl="appControl" :roomId="roomId" :view="view" :status="roomInfo.status" @iotMessage="roomChange" :gameTime="gameTime" :gameEnd="gameEnd" @clearInter="clearInter" @gameFinish="roomChange" @getRoomInfo="getRoomInfo" @playMusic="playMusic"></mqttws>
      </div>
    </div>
    <div class="bg" v-if="showTip">
      <div class="tip tip1" v-show="tipContent === 'tip1'">
        <h3>差点儿就抓到了</h3>
        <img src="./../assets/room/image_sad.png" alt="">
        <p>还有{{coin}}个币，是否再来一局？</p>
        <ul class="tip-bottom">
          <li @click="abandonGame">稍后再试</li>
          <li @click="continueGame"><span>再来一局（<i>{{countDown}}</i>）</span></li>
        </ul>
      </div>
      <div class="tip tip2" v-show="tipContent === 'tip2'">
        <img src="./../assets/room/image_happy.png" alt="">
        <p>抓到的娃娃可以到“娃娃”中查看，是否现在查看？</p>
        <i v-if="!after" class="iconfont icon-guanbi" style="position: absolute;right: 0.36rem;top: 0.36rem;font-size: 0.6rem" @click="abandonGame"></i>
        <ul class="tip-bottom">
          <li v-if="!after" @click="continueGame">再来一局（<i>{{countDown}}</i>）</li>
          <li @click="closeTip" v-else>稍后再看</li>
          <li @click="goDolllist"><span>去看娃娃</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import CONFIG from './../config/config'
  import {getLoginToken, registerApp, getRoomInfo, gameStart,abandonGame} from './../api/index'
  import util from './../util/index'
  import mqttws from './mqttws.vue'
  import { mapState } from 'vuex'
  import {Toast ,MessageBox} from 'mint-ui';

  export default {
    name: 'room',
    beforeRouteLeave (to, from , next) {
      if(to.path.indexOf('questions') !== -1 || to.path.indexOf('dolllist') !== -1 || to.path.indexOf('recharge') !== -1){
        console.log('111')
        this.quitRoom();
        next();
      }else if(this.start){
        MessageBox.confirm('当前正在游戏中,确定要退出房间吗？','').then(action => {
          this.gameEnd = true;
          setTimeout(async()=>{
            this.$refs.mqtt.gameCatch();
            await abandonGame({room_id:this.roomId});
            this.quitRoom();
            next();
          },0);
        }).catch((err)=>{
          history.forward();
        })
      }else {
        MessageBox.confirm('确定要退出房间吗？','').then(action => {
          this.quitRoom();
          next();
        }).catch((err)=>{
          history.forward();
        })
      }
    },
    data() {
      return {
        start: false,
        token: '',
        showTip:false,
        countDown:10,
        price:1,
        zg: {},
        appControl: {},
        view: 'front',
        roomId: '',
        roomInfo: {},
        tipContent:'',
        gameTime:30,
        gameEnd:false,
        gameTotalTime:30,
        streamList:[],//视频流列表
        after:false,
        inter:{}, //游戏倒计时的定时器
        inter2:{},//是否继续游戏倒计时
        showContent:true,
        roomOnline: {
          count: 0,
          user_list: []
        }
      }
    },
    computed: mapState({
      user: state => state.user.user,
      coin: state => state.user.coin,
      musicStatus:state => state.user.musicStatus
    }),
    components: {
      mqttws
    },
    created() {
      this.roomId = this.$route.query.roomId;
      this.roomInfo.status = this.$route.query.status;
      //注册控制端
      registerApp({
//        "comi_bypass":"comicool_5107",
        "app_device": CONFIG.app.app_device,
        "app_key":CONFIG.app.app_key,
        "nonce": CONFIG.app.nonce,
        "timestamp": CONFIG.app.timestamp,
        "version_code": CONFIG.app.version_code,
        "sign": util.getRegisterAppSign(CONFIG.app.app_device,CONFIG.app.app_key, CONFIG.app.nonce, CONFIG.app.timestamp, CONFIG.app.version_code, CONFIG.app.secret)
      }).then((res) => {
        this.appControl = res.data;
      });
      this.init()
      getLoginToken({
        app_id: CONFIG.jg.appid,
//        app_id:3265350344,
        id_name: CONFIG.jg.idName
      }).then((res) => {
        this.token = res;
        this.doLogin();
      });
      this.getRoomInfo();
    },
    mounted() {
      this.initScreen();
    },
    methods: {
      test(){
        this.gameEnd = true;
      },
      playMusic(name){
        var music = document.querySelector(name);
        if(music){
          music.play();
        }
      },
      stopMusic(name){
        var music = document.querySelector(name);
        if(music){
          music.pause();
          music.currentTime = 0;
        }
      },
      //关闭mqtt连接，停止播放流及退出房间
      quitRoom(){
        this.$refs.mqtt.closeMqtt();
        if(this.roomInfo.status !== 2){
          this.zg.stopPlayingStream(this.streamList[0].stream_id)
          this.zg.stopPlayingStream(this.streamList[1].stream_id)
          this.zg.logout();
        }
      },
      init() {
        this.zg = new ZegoClient();
        // 1.配置参数
        this.zg.config({
          appid: CONFIG.jg.appid,
//          appid:3265350344,
          idName: CONFIG.jg.idName,
          nickName: CONFIG.jg.nickName,
          server: CONFIG.jg.server,
//          server:'ws://106.15.41.49:8181/ws',
          logLevel: 1,
          logUrl: ''
        });
      },
      doLogin() {
        this.zg.login(this.roomId, 0, this.token, function (streamList) {
          console.log('login sucess - data = ', streamList);
          this.streamList = streamList;
          this.zg.startPlayingStream(streamList[0].stream_id, util.getById('frontview'));
          this.zg.startPlayingStream(streamList[1].stream_id, util.getById('sideview'));
          this.showContent = false;
        }.bind(this), function (err) {
          console.log('login error - data = ', err);
        });
      },
      initScreen() {
        if (!navigator.userAgent.match(/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/i)) {
          document.getElementsByTagName('html')[0].style.width = 375 + 'px';
          document.getElementsByTagName('html')[0].style.maxHeight = 690 + 'px';
        }
        // 想要视频满屏，需要canvas的宽高比例和视频的视频流比例一样
        // 如果视频流为高640，宽480，那么比例为640/480 = 1.33
        // 这样，canvas的高和宽的比例也必须是1.33

        // 在本例子中，使用rem布局，浏览器会有一个计算过程，此时动态获取的viewWidth并不准确, 会偏小一点
        // 有一定的误差，所以设置的viewHeight的时候，用的比例是1.3， 如果用的1.33，那么渲染出来的视频上下处可能会有黑边
        var viewWrapper = document.querySelector('.view-wrapper');
        var viewWrapper2 = document.querySelector('.view-wrapper2');

        var footer = document.querySelector('.footer2');
        var viewWidth = viewWrapper.clientWidth;

        var viewHeight = viewWidth * 1.33;
        var footerHight = document.body.clientHeight - viewHeight;
        var fontSize = document.getElementsByTagName('html')[0].style.fontSize;
        var index = fontSize.indexOf('p');
        var marginTop = Number(fontSize.substr(0,index))*0.3;
        viewWrapper.style.height = viewHeight + 'px';
        viewWrapper2.style.height = viewHeight + 'px';
        footer.style.height = footerHight - marginTop + 'px';
      },
      switchView() {
        if (this.view === 'front') {
          this.view = 'side'
        } else {
          this.view = 'front'
        }
      },
      startGame() {
        this.gameEnd = false;
        this.$refs.mqtt.clearTimeout();
//        this.countDown = 10;
        this.$store.dispatch('gameStart',{
          "room_id": this.roomId,
          "app_device": CONFIG.app.app_device,
          "app_key":unescape(CONFIG.app.app_key),
        }).then((res)=>{
          console.log(res);
          console.log('开始游戏成功：' + JSON.stringify(res));
          //播放音频
          this.playMusic('.background_music');
          this.playMusic('.ready_go');
          this.start = true;
          this.roomInfo = {status:2};
          this.gameTotalTime = res.response.expire;
          this.gameTime= res.response.expire; //游戏时间
         this.inter =  setInterval(function () {
            this.gameTime--;
            if(this.gameTime === 0){
              this.$refs.mqtt.gameCatch();
              setTimeout(()=>{
                this.$refs.mqtt.stopCatch();
              },0);
              clearInterval(this.inter)
            }
          }.bind(this),1000);
        }).catch((err)=>{
          console.log('开始游戏失败：' + JSON.stringify(err));
          Toast({
            message: err.msg,
            position:'bottom'
          });
        })
      },
      continueGame(){
        clearInterval(this.inter2);
        this.startGame();
        this.closeTip();
      },
      getRoomInfo() {
        getRoomInfo({'room_id': this.roomId, app_key: unescape(CONFIG.app.app_key),app_device:CONFIG.app.app_device}).then((res) => {
          console.log(res)
          this.roomInfo = res.response;
          this.roomOnline.count = res.response.online_count;
          console.log('---------------'+ this.roomOnline.count );
          this.roomOnline.user_list = res.response.user_list;
          this.price = res.response.price;
        }).catch((err)=>{
          alert('错误信息'+JSON.stringify(err))
        })
      },
      roomChange(message) {
        message = JSON.parse(message);
        console.log('---------------------------------');
        console.log(message);
        console.log('---------------------------------');
        var msg_body = message.msg_body;
        console.log(msg_body);
        if (msg_body.protocol === 'update_room_online') {
          //更新房间当前人员信息
          console.log('更新房间当前人员信息');
          this.roomOnline = msg_body.data;
        } else if (msg_body.protocol === 'room_idle') {
          //通知所有用户当前房间已经闲置
          console.log('通知所有用户当前房间已经闲置')
          this.roomInfo = {status:0};
          this.start = false;
        } else if (msg_body.protocol === 'game_finish') {
          //通知当前玩的用户游戏已经结束
          this.playMusic('.catch_failed');
          this.gameEnd = true;
          this.countDown = msg_body.data.expire;
          setTimeout(function () {
            if(this.tipContent === ''){
              console.log('通知当前玩的用户游戏已经结束');
              this.showTip = true;
              this.tipContent = 'tip1';
//              this.start = false;
              this.inter2 =  setInterval(function () {
                this.countDown--;
                if(this.countDown === 0){
                  this.abandonGame();
                }
              }.bind(this),1000);
              this.gameTime=this.gameTotalTime;
              console.log('游戏结束');
            }
          }.bind(this),1000);
          //游戏结束延时
        } else if (msg_body.protocol === 'gift_change') {
          this.playMusic('.catch_success');
          //通知当前玩的用户礼品掉落
          console.log('通知当前玩的用户礼品掉落');
          this.gameEnd = true;
          this.after = false;
          this.showTip = true;
          this.tipContent = 'tip2';
          this.inter2 =  setInterval(function () {
            this.countDown--;
            if(this.countDown === 0){
              this.after = true;
              abandonGame({room_id:this.roomId}).then((res) => {
                this.start = false;
                this.roomInfo = {status:0};
                clearInterval(this.inter2);
              })
            }
          }.bind(this),1000);
          console.log('恭喜你抓到娃娃');
        } else if (msg_body.protocol === 'update_playing') {
          //更新当前玩游戏人员信息
          console.log('更新当前玩游戏人员信息');
          console.log('更新当前游戏人员');
          this.roomInfo = msg_body.data;
          this.roomInfo.status = 1;
        }
      },
      abandonGame(){
        abandonGame({room_id:this.roomId}).then((res) => {
          this.stopMusic('.background_music');
          console.log(res);
          this.closeTip();
          this.start = false;
          this.roomInfo = {status:0};
          clearInterval(this.inter2);
        })
      },
      closeTip(){
        this.showTip = false;
        this.tipContent = '';
      },
      goDolllist(){
        this.abandonGame();
        this.$router.push('/index/dolllist');
      },
      clearInter(){
        clearInterval(this.inter);
//        this.gameTime=30;
      },
      goQuestions(){
        this.$router.push('/questions');
      },
      goRecharge(){
//        this.$router.push('/questions');
        this.$router.push('/index/recharge');
      }
    }
  }
</script>

<style lang="scss" scoped>
  @mixin center {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  @mixin verticalCenter {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .icon-question{
    position: absolute;
    right: 0.36rem;
    top:1rem;
    z-index: 777;
    width: 0.6rem;
    height: 0.6rem;
    background: #fff;
  }
  .is-active{
    background: red!important;
  }
  .room {
    width: 100%;
    height: 100%;
    background: #ffe6f6;
    padding: 0.1px;
    .bg{
      width: 100%;
      height: 100%;
      background: rgba(0,0,0,0.5);
      position: fixed;
      left: 0;
      top:0;
      z-index: 999;
      .tip{
        width: 8.88rem;
        height: 11.82rem;
        background: #fff;
        @include center;
        border-radius: 0.3rem;
        position: relative;
        padding: 0.75rem 0.75rem 0 0.75rem;
        h3{
          font-size: 0.48rem;
          text-align: center;
          margin: 0 0 0.8rem 0;
        }
        img{
          width: 4.57rem;
          display: block;
          margin:0 auto 0.9rem auto;
        }
        p{
          text-align: center;
          font-size: 0.48rem;
          color: #707070;
        }
        ul{
          width: 100%;
          height: 0.78rem;
          position: absolute;
          left: 0;
          bottom: 0.54rem;
          li{
            width: 50%;
            float: left;
            font-size: 0.48rem;
            line-height: 0.78rem;
            border-right: 1px solid #d1d1d1;
            color: #707070;
            text-align: center;
            span{
              color:#ff78cd;
            }
            &:last-of-type{
              border-right: none;
            }
          }
        }
      }
      .tip1{
        img{
          width: 5.3rem;
        }
      }
    }
    .header {
      display: none;
      width: 100%;
      height: 1.26rem;
      background: #ff9ccf;
      .roomusers {
        width: 5.22rem;
        height: 100%;
        background: #ffe6f6;
        margin: 0 auto;
        padding: 0.18rem 0.36rem 0 0.36rem;
        border-radius: 0.3rem 0.3rem 0 0;
        text-align: center;
        > div {
          width: 100%;
          height: 100%;
          .users {
            width: 1.4rem;
            float: left;
            h3 {
              font-size: 0.44rem;
              line-height: 0.44rem;
              color: #494949;
            }
            p {
              font-size: 0.38rem;
              line-height: 0.38rem;
              color: #999;
              margin: 0.09rem 0 0 0;
            }
          }
          img {
            width: 0.96rem;
            height: 0.96rem;
            border-radius: 50%;
            border: 1px solid #fff;
            float: left;
            margin: 0 0.1rem 0 0;
            display: block;
            &:last-of-type {
              margin: 0;
            }
          }
        }
      }
    }
    .high {
      z-index: 666;
    }
    .main {
      width: 100%;
      /*height: calc(100% - 4.56rem);*/
      position: relative;
      /*background: blue;*/
      /*margin: 0.2rem 0 0 0;*/
      margin: 8px 0 0 0;
      .content {
        padding: 0 0.36rem;
        width: 100%;
//        @include center;
        overflow: hidden;
        .switch-btn {
          position: absolute;
          width: 1.18rem;
          height: 1.18rem;
          z-index: 777;
          border: none;
          outline: none;
          @include verticalCenter;
          right: 0.36rem;
          background: url("./../assets/room/wawa_icon_camera.png") no-repeat;
          background-size: 100% 100%;
        }
        .view-wrapper {
          overflow: hidden;
          background: #fff;
          border-radius: 0.18rem;
          width: 100%;
          .frontview-wrapper, .sideview-wrapper {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            padding: 0 0.36rem;
            canvas {
              width: 100%;
              height: 100%;
              border-radius: 0.18rem;
            }
          }
        }
      }
      .content2{
        padding: 0 0.36rem;
        width: 100%;
        z-index:999;
        @include center;
        overflow: hidden;
        >div{
          background: #ffbdde;
          border-radius: 0.18rem;
          padding: 0.1px;
          width: 100%;
          p{
            font-size: 0.52rem;
            color: #494949;
            margin: 30% 0 0 0;
            text-align: center;
          }
          img{
            width: 5.6rem;
            @include center;
          }
        }
      }
    }
    .footer {
      width: 100%;
      /*height: 3.3rem;*/
      position: relative;
      .status {
        width: 100%;
        height: 100%;
        /*position: absolute;*/
        /*left: 0;*/
        /*top: 0;*/
        padding: 0 0.66rem;
        min-height: 2rem; //新增
        z-index:999; //新增
        @include verticalCenter;
        > button {
          width: 7.08rem;
          height: 1.74rem;
          background: url("./../assets/room/press_begin.png") no-repeat;
          background-size: 100% 100%;
          border: none;
          outline: none;
          color: #fff;
          font-size: 0.62rem;
          @include verticalCenter;
          span {
            display: block;
            font-size: 0.4rem;
          }
        }
        .gameuser {
          width: 7.08rem;
          height: 1.74rem;
          background: url("./../assets/room/room_press_begin_un.png") no-repeat;
          background-size: 100% 100%;
          @include verticalCenter;
          img {
            width: 1.32rem;
            height: 1.32rem;
            border: 1px solid #fff;
            border-radius: 50%;
            @include verticalCenter;
            left: 0.6rem;
          }
          > div {
            text-align: center;
            margin: 0.3rem 0 0 1.92rem;
            h3 {
              font-size: 0.48rem;
              color: #f972c7;
              span {
                color: #707070;
                margin: 0 0.2rem 0 0;
              }
            }
            p {
              font-size: 0.4rem;
              color: #999;
            }
//            @include center;
          }
        }
        .recharge {
          width: 1.86rem;
          height: 1.74rem;
          /*background: red;*/
          @include verticalCenter;
          right: 0.66rem;
          p {
            font-size: 0.4rem;
            line-height: 0.5rem;
            text-align: right;
            color: #707070;
          }
          > button {
            width: 100%;
            outline: none;
            height: 0.72rem;
            border: 1px solid #f972c7;
            background: #fff;
            font-size: 0.45rem;
            text-align: right;
            border-radius: 0.5rem;
            position: relative;
            padding: 0 0.1rem 0 0;
            span {
              width: 0.58rem;
              height: 0.58rem;
              border-radius: 50%;
              font-size: 0.7rem;
              background: #f972c7;
              color: #fff;
              text-align: center;
              line-height: 0.58rem;
              @include verticalCenter;
              left: 0.1rem;
            }
          }
        }
      }
      .status-control {

      }
    }
  }
</style>
