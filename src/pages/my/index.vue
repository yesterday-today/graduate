<template>
  <div class="my clear">
    <div>
      <div class="head">
        <div class="header">
            <div class="user" v-if="warnBol==false">
                <img :src="userInfo.avatarUrl">
                <div class="user-name">
                    <span>{{userInfo.nickName}}</span>
                </div>
            </div>
            <div class="user" v-if="warnBol==true">
                <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/userPhotos.png">
                <div class="user-name">
                    <button open-type="getUserInfo" @getuserinfo="bindGetUserInfo" @click="getUserInfo1">一键登录</button>
                </div>
            </div>
        </div>
        </div>
        <div class="content1">
            <ul>
                <li v-for="(item,index) in tabList" :key="index" @click="go(index)">
                <img :src="item.imgUrl"><p>{{item.title}}</p>
                </li>
            </ul>
        </div>
        <div class="content2">
        <ul>
            <li @click="goNotify">
                <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/warn.png" class="left">
                <p>通知提醒</p>
                <i class="iconfont icon-qianjin"></i>
            </li>
            <li @click="goSet">
                <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/set.png" class="left">
                <p>更多设置</p>
                <i class="iconfont icon-qianjin"></i>
            </li>
            <li @click="goIt">
                <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myIt.png" class="left">
                <p>关于它</p>
                <i class="iconfont icon-qianjin"></i>
            </li>
        </ul>
      </div>
    </div>
    <van-notify id="van-notify" />
  </div>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
export default {
  components:{Notify},
  data() {
    return {
      warnBol:false,
      userInfo:'',
      tabList:[{
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myFood1.png',
        title:'美食最爱',
      },
      {
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myItem.png',
        title:'事项助手'
      },
      {
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myHouse.png',
        title:'房源最爱'
      },
      {
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myFood.png',
        title:'菜谱收藏'
      },
      {
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myPlan.png',
        title:'计划单'
      },]
    }
  },
  methods: {
    go(index){
      this.warnBol==true&&Notify({ type: 'danger', message: '您还未登录，请登录后在进行查看' });
      if(index==4){
        this.warnBol==false&&mpvue.navigateTo({url:'../plan/main'})
      }else if(index==3){
        this.warnBol==false&&mpvue.navigateTo({url:'../menuCollect/main'})
      }else if(index==2){
        this.warnBol==false&&mpvue.navigateTo({url:'../houseCollect/main'})
      }else if(index==0){
        this.warnBol==false&&mpvue.navigateTo({url:'../foodCollect/main'})
      }
    },
    //去通知提醒页面
    goNotify(){
        this.warnBol==true&&Notify({ type: 'danger', message: '您还未登录，请登录后在进行查看' });
        if(this.warnBol==false){
            mpvue.navigateTo({url:'../notify/main'});
            wx.requestSubscribeMessage({
                tmplIds: ['VHgVCRPbHrILy--JCeOwBi18Vmtu8To1JLhm1nKXYDs'],
                success (res) {console.log('已授权接收订阅消息')}
            })
        }
    },
    //去设置页面
    goSet(){
        this.warnBol==true&&Notify({ type: 'danger', message: '您还未登录，请登录后在进行查看' });
        this.warnBol==false&&mpvue.navigateTo({url:'../set/main'})
    },
    //去关于它的页面
    goIt(){
        mpvue.navigateTo({url:'../aboutIt/main'})
    },
    // 登录
    getUserInfo1(){
      console.log('click事件首先触发')
      // 判断小程序的API，回调，参数，组件等是否在当前版本可用。  为false 提醒用户升级微信版本
      // console.log(wx.canIUse('button.open-type.getUserInfo'))
      if(wx.canIUse('button.open-type.getUserInfo')){
        // 用户版本可用
      }else{
        console.log('请升级微信版本')
      }
    },
    //添加用户信息
    userInformation(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').add({
            data:{
                _id:this.globalData.openid,
                address:{
                    province:'',
                    city:'',
                    district:'',
                    title:'',
                    street:'',
                },
                notifyBol:false,
            },
            success:res=>{
                console.log(res);
            },
            fail:res=>{
                console.log(res)
            }
        });
    },
    bindGetUserInfo(e) {
      // console.log(e.mp.detail.rawData)
      if (e.mp.detail.rawData){
        //用户按了允许授权按钮
        this.warnBol=false;
        this.getSetting();
        console.log('用户按了允许授权按钮')
        this.userInformation();
      } else {
        //用户按了拒绝按钮
        console.log('用户按了拒绝按钮')
      }
    },
    getSetting(){
      wx.getSetting({
        success:res=>{
          if (res.authSetting['scope.userInfo']) {
            wx.getUserInfo({
              success: res=> {
                this.userInfo=res.userInfo;
                this.warnBol=false;
                //用户已经授权过
                console.log('用户已经授权过')
              }
            })
          }else{
            this.warnBol=true;
            console.log('用户还未授权过')
          }
        }
      })
    }
  },
  mounted(){
    this.getSetting()
  },
  onLoad(){
  }
}
</script>

<style lang="less" scoped>
.my{
  background:#f2f2f2;
  .get{
    background: #075fe4;
    border-radius: 50rpx;
    width: 80%;
    margin: 0 auto;
    margin-top: 300rpx;
  }
  .head{
    background: #ffffff;
    padding:40rpx 0;
    .header{
      width:90%;
      height:240rpx;
      background:#075fe4;
      box-shadow:0rpx 10rpx 40rpx 0rpx #075fe4;
      border-radius:20rpx;
      margin:0 auto;
      .user{
        width:90%;
        height:160rpx;
        margin:0 auto;
        padding:40rpx 0;
        img{
          width:160rpx;
          height:160rpx;
          border-radius:50%;
          background:#FFFFFF;
          float:left;
        }
        &-name{
          height:120rpx;
          line-height:120rpx;
          float:left;
          margin-top:20rpx;
          margin-left:20rpx;
          span{
            font-size:40rpx;
            color:#ffffff;
            display:block;
            letter-spacing:5rpx;
          }
          button{
              padding:0rpx;
              font-size:40rpx;
              background: none;
              border: none;
              color: #FFFFFF;
          }
          button{
            ::after{
                 border: none;
            }
          }
        }
      } 
    }
  }
  .content1{
    width:90%;
    height:300rpx;
    background:#ffffff;
    margin:0 auto;
    margin-top:40rpx;
    border-radius:20rpx;
    ul{
      li{
        width:25%;
        float:left;
        padding:20rpx 0;
        img{
          width:80rpx;
          height:80rpx;
          margin:0 auto;
          display:block;
        }
        p{
          font-size:26rpx;
          text-align:center;
        }
      }
    }
  }
  .content2{
    width:90%;
    height:600rpx;
    background: #ffffff;
    margin:0 auto;
    margin-top:40rpx;
    border-radius:20rpx;
    ul{
      width:90%;
      margin:0 auto;
      li{
        height:110rpx;
        line-height:110rpx;
        border-bottom:1rpx solid #f2f2f2;
        .left{
          width:38rpx;
          height:38rpx;
          padding: 36rpx 0;
          float:left;
        }
        p{
          font-size:36rpx;
          float:left;
          padding-left:10rpx;
        }
        i{
          float:right;
        }
      }
    }
  }

}
</style>