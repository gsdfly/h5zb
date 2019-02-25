<template>
  <div class="index2">
    <audio class="moving">
      <source  src="./../assets/music/moving.mp3" type="audio/mp3">
    </audio>
    <audio class="after_catch">
      <source  src="./../assets/music/after_catch.mp3" type="audio/mp3">
    </audio>
    <div class="gameOperation">
      <div v-if="view === 'front'">
        <button class="forward" @touchstart.prevent.stop="gameMove('forward')"
                :class="{'forwardclick':isClick==='forward'}" @touchend="gameStop('forward')">前
        </button>
        <button class="back" @touchstart.prevent.stop="gameMove('back')" :class="{'backclick':isClick==='back'}"
                @touchend="gameStop('back')">后
        </button>
        <button class="left" @touchstart.prevent.stop="gameMove('left')" :class="{'leftclick':isClick==='left'}"
                @touchend="gameStop('left')">左
        </button>
        <button class="right" @touchstart.prevent.stop="gameMove('right')" :class="{'rightclick':isClick==='right'}"
                @touchend="gameStop('right')">右
        </button>
      </div>
      <div v-else>
        <button class="forward" @touchstart.prevent.stop="gameMove('forward')"
                :class="{'forwardclick':isClick==='forward'}" @touchend="gameStop('forward')">前
        </button>
        <button class="back" @touchstart.prevent.stop="gameMove('back')" :class="{'backclick':isClick==='back'}"
                @touchend="gameStop('back')">后
        </button>
        <button class="right" @touchstart.prevent.stop="gameMove('right')" :class="{'rightclick':isClick==='right'}"
                @touchend="gameStop('right')">左
        </button>
        <button class="left" @touchstart.prevent.stop="gameMove('left')" :class="{'leftclick':isClick==='left'}"
                @touchend="gameStop('left')">右
        </button>
      </div>
      <button class="catch" @touchstart.prevent.stop="gameCatch" :class="{'catchclick':isClick === 'catch'}"
              @touchend="stopCatch">GO
      </button>
      <p class="countDown">{{gameTime}}'</p>
    </div>
  </div>
</template>

<script>
  import CryptoJS from 'crypto-js'
  import CONFIG from './../config/config'
  import util from './../util/index'
  import {queryStatus} from './../api/index'

  export default {
    name: 'mqttws',
    data() {
      return {
        isClick: '',//按钮是否在点击态
        timeout:{},
        startTime: 0,
        endTime: 0,
        reconnectTimeout: 2000,         //连接失败或超时时重连时间
        client: {},
        broadcast: '/broadcast/' + this.appControl.product_key + '/' + this.roomId,
        gainTopic: '/' + this.appControl.product_key + '/' + this.appControl.device_name + '/get',//获取消息订阅的主题
        sendTopic: '/' + this.appControl.product_key + '/' + this.appControl.device_name + '/control_test',//发送消息订阅的主题
        options: {
          userName: this.appControl.device_name + '&' + this.appControl.product_key,
          password: util.getIotSign(this.roomId, this.appControl, CONFIG.app.timestamp),
          onSuccess: this.onConnect,
          onFailure: this.onFailure,
          reconnect: true
        },
//        options: {
//          userName: 'DIANA_10000014&UKVbpSHLp9j',
//          password:util.getIotSign('CATCH_1_100017',{"product_key": "UKVbpSHLp9j",
//            "device_name": "DIANA_10000014",
//            "device_secret": "rv19mqdj9fxqdaVENeCsm0W9Vfd9yOOr"},789),
////          password:'edac6a5d47afc9eaf69fc769efe228a0d5e5931d',
//          onSuccess: this.onConnect,
//          onFailure: this.onFailure,
//          reconnect:true,
////          mqttVersion:4
////          keepAliveInterval:600
//        },
      }
    },
    props: ['appControl', 'roomId', 'view', 'gameTime', 'gameEnd', 'status'],
    created() {
      if (this.status !== 2) {
        this.MQTTconnect();
      }
//      queryStatus({'room_id':this.roomId}).then((res)=>{
//        console.log(res)
//      })
//      console.log(this.gameEnd);
    },
    methods: {
      MQTTconnect() {
//        this.client =  new Paho.MQTT.Client("UKVbpSHLp9j.iot-as-mqtt.cn-shanghai.aliyuncs.com", Number(443), 'CATCH_1_100017|securemode=3,signmethod=hmacsha1,timestamp=789|');
        this.client = new Paho.MQTT.Client(this.appControl.product_key + ".iot-as-mqtt.cn-shanghai.aliyuncs.com", Number(443), this.roomId + '|securemode=3,signmethod=hmacsha1,timestamp=' + CONFIG.app.timestamp + '|');
        this.client.connect(this.options);//连接服务器并注册连接成功处理事件
        this.client.onConnectionLost = this.onConnectionLost;  //连接丢失时调用
        this.client.onMessageArrived = this.onMessageArrived;  //收到消息是调用
      },
      onConnectionLost: function (responseObject) {
        if (responseObject.errorCode !== 0)
          console.log("onConnectionLost:" + responseObject.errorMessage);
//        setTimeout(this.MQTTconnect, this.reconnectTimeout);
      },
      onMessageArrived: function (message) {
//        console.log("收到消息:" + message.payloadString);
//        var protocal = message.payloadString.msg_body.protocal;
        //收到消息是直接触发
        this.$emit('iotMessage', message.payloadString);
      },
      onConnect: function () {
        console.log("onConnected");
//        this.client.subscribe('/broadcast/UKVbpSHLp9j/CATCH_1_100017');//订阅广播主题
        this.client.subscribe(this.broadcast);
        this.client.subscribe(this.gainTopic);//订阅主题
      },
      onFailure(err) {
        console.log(err);
//        setTimeout(this.MQTTconnect, this.reconnectTimeout);
      },
      closeMqtt() {
        if (this.client.connect) {
          this.client.disconnect();
          console.log('关闭mqtt连接')
        }
      },
      gameStop(direction) {
        console.log('22222');
        this.isClick = '';
//        switch (direction){
//          case 'left':this.islClick = false;break;
//          case 'right':this.isrClick = false;break;
//          case 'forward':this.isrClick = false;break;
//          case 'back':this.isbClick = false;break;
//        }
        this.endTime = (new Date().getTime() / 1000).toFixed(0);
        var message = new Paho.MQTT.Message(
          JSON.stringify({
            "TargetDevice": this.roomId,
//            "TargetDevice": "CATCH_1_101278",
            "MsgType": "control",
            "Data": {
              "protocol": "remote_move",
              "data": {
                "left": direction === 'left' ? 2 : 0,
                "right": direction === 'right' ? 2 : 0,
                "forward": direction === 'forward' ? 2 : 0,
                "back": direction === 'back' ? 2 : 0
              }
            }
          }));
        message.destinationName = this.sendTopic;
//        message.destinationName = '/UKVbpSHLp9j/DIANA_10000014/control_test'
        if ((this.endTime - this.startTime) === 0) {
          console.log('33333')
          setTimeout(function () {
            this.client.send(message);
          }.bind(this), 200);
        } else {
          this.client.send(message);
        }
      },
      //移动娃娃机抓子
      gameMove(direction) {
//        var moving = document.querySelector('.moving');
//        moving.play();
        this.$emit('playMusic','.moving');
        switch (direction) {
          case 'left':
            this.isClick = 'left';
            break;
          case 'right':
            this.isClick = 'right';
            break;
          case 'forward':
            this.isClick = 'forward';
            break;
          case 'back':
            this.isClick = 'back';
            break;
        }
        //当游戏视角切换时左右要互换
        this.startTime = (new Date().getTime() / 1000).toFixed(0);
        console.log('1111');
        var message = new Paho.MQTT.Message(
          JSON.stringify({
            "TargetDevice": this.roomId,
//            "TargetDevice": "CATCH_1_101278",
            "MsgType": "control",
            "Data": {
              "protocol": "remote_move",
              "data": {
                "left": direction === 'left' ? 1 : 0,
                "right": direction === 'right' ? 1 : 0,
                "forward": direction === 'forward' ? 1 : 0,
                "back": direction === 'back' ? 1 : 0
              }
            }
          }));
        message.destinationName = this.sendTopic;
//        message.destinationName = '/UKVbpSHLp9j/DIANA_10000014/control_test'
        this.client.send(message);
      },
      //下抓
      gameCatch() {
//        var afterCatch = document.querySelector('.after_catch');
//        afterCatch.play();
        this.$emit('playMusic','.after_catch');
        console.log('ddddd');
        this.isClick = 'catch';
        var message = new Paho.MQTT.Message(JSON.stringify(
          {
            "TargetDevice": this.roomId,
//            "TargetDevice": "CATCH_1_101278",
            "MsgType": "control",
            "Data": {
              "protocol": "remote_catch",
              "data": {
                "catch_force": 0    //下抓操作, 1-强抓力; 2-弱抓力
              }
            }
          }));
        message.destinationName = this.sendTopic;
//        message.destinationName = '/UKVbpSHLp9j/DIANA_10000014/control_test'
        this.client.send(message);
        this.$emit('clearInter');
        //下抓之后过10s,还没有收到任何返回
       this.timeout =  setTimeout(() => {
          console.log('gameEnd-----'+this.gameEnd);
          if (!this.gameEnd) {
            queryStatus({'room_id': this.roomId}).then((res) => {
              console.log(res)
              //空闲中的话，弹出游戏结束
              if (res.response.is_playing === 0) {
                this.$emit('gameFinish', '{"msg_body":{"protocol":"game_finish","data":{"expire":' + res.response.expire + '}}}');
              } else {
                //有人在玩的话重新获取房间信息
                this.$emit('getRoomInfo');
              }
            })
          }
        }, 10000);
      },
      stopCatch() {
        this.isClick = '';
      },
      clearTimeout(){
        console.log(JSON.stringify(this.timeout));
        if(JSON.stringify(this.timeout) !== '{}'){
          clearTimeout(this.timeout);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .gameOperation {
    position: relative;
    .countDown {
      color: #f16cc0;
      font-size: 0.84rem;
      position: absolute;
      right: 0.05rem;
      //top:-0.6rem;
      top: -1.1rem;
      text-shadow: 1px 1px 1px #fff;
      z-index: 999;
    }
  }

  button {
    width: 1.76rem;
    height: 1.76rem;
    outline: none;
    border: none;
    font-size: 0;
    position: absolute;
    z-index: 3;
  }

  .forward {
    top: -1.3rem;
    left: 2rem;
    background: url("./../assets/mqtt/direction_press_up.png") no-repeat;
    background-size: 100% 100%;
  }

  .back {
    top: 1.5rem;
    left: 2rem;
    background: url("./../assets/mqtt/direction_press_down.png") no-repeat;
    background-size: 100% 100%;
  }

  .left {
    top: 0.1rem;
    left: 0.5rem;
    background: url("./../assets/mqtt/direction_press_right.png") no-repeat;
    background-size: 100% 100%;
  }

  .right {
    top: 0.1rem;
    left: 3.5rem;
    background: url("./../assets/mqtt/direction_press_left.png") no-repeat;
    background-size: 100% 100%;
  }

  .catch {
    width: 2.04rem;
    height: 2.04rem;
    right: 0.3rem;
    top: 0.4rem;
    background: url("./../assets/mqtt/press_catch.png") no-repeat;
    background-size: 100% 100%;
  }

  .forwardclick {
    background: url("./../assets/mqtt/direction_press_up_click.png") no-repeat;
    background-size: 100% 100%;
  }

  .backclick {
    background: url("./../assets/mqtt/direction_press_down_click.png") no-repeat;
    background-size: 100% 100%;
  }

  .leftclick {
    background: url("./../assets/mqtt/direction_press_left_click.png") no-repeat;
    background-size: 100% 100%;
  }

  .rightclick {
    background: url("./../assets/mqtt/direction_press_right_click.png") no-repeat;
    background-size: 100% 100%;
  }

  .catchclick {
    background: url("./../assets/mqtt/press_catch_click.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
