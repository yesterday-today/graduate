<template>
  <div class="my clear"> 
    <div class="head">
      <div class="header">
        <div class="user">
          <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/userPhotos.png">
          <div class="user-name">
            <span>用户名</span>
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
        <li>
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
</template>

<script>
export default {
  data() {
    return {
      tabList:[{
        imgUrl:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/myFood1.png',
        title:'美食最爱'
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
      if(index==4){
        mpvue.navigateTo({url:'../plan/main'})
      }else if(index==3){
        mpvue.navigateTo({url:'../menuCollect/main'})
      }
    },
    //去设置页面
    goSet(){
        mpvue.navigateTo({url:'../set/main'})
    },
    //去关于它的页面
    goIt(){
        mpvue.navigateTo({url:'../aboutIt/main'})
    }
  }
}
</script>

<style lang="less" scoped>
.my{
  background:#f2f2f2;
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
          width:200rpx;
          height:120rpx;
          line-height:120rpx;
          float:left;
          margin-top:20rpx;
          margin-left:20rpx;
          span{
            font-size:40rpx;
            color:#ffffff;
            display:block;
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