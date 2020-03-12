<template>
  <div class="set"> 
    <div class="content2">
        <ul>
            <li v-for="(item,index) in tabList" :key="index" @click="go(index)">
                <img :src="item.img" class="left">
                <p>{{item.text}}</p>
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
        tabList:[{text:'地址设置',img:'cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/houseLocation.png'}]
    }
  },
  methods: {
      go(index){
          mpvue.navigateTo({url:'../setLocation/main'})
      }
  }
}
</script>

<style lang="less" scoped>
.set{
  .content2{
    height:600rpx;
    margin:0 auto;
    margin-top:40rpx;
    border-radius:20rpx;
    ul{
      width:90%;
      margin:0 auto;
      li{
        height:90rpx;
        line-height:90rpx;
        border-bottom:1rpx solid #f2f2f2;
        color: #a19f9f;
        .left{
          width:38rpx;
          height:38rpx;
          padding: 26rpx 0;
          float:left;
        }
        p{
          font-size:30rpx;
          float:left;
          padding-left:30rpx;
        }
        i{
          float:right;
          font-size:26rpx;
        }
      }
    }
  }
}
</style>