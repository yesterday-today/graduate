<template>
  <div class="index">
      <div class="wrap">
        <ul>
          <li>
              <div class="img">
                  <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/clock1.png" alt="">
              </div>
              <div class="content">
                  <div class="top-left">
                      <p>18路</p>
                  </div>
                  <div class="cet-left">
                      <p>体育学院东门</p>
                  </div>
                  <div class="bot-left">
                      <p>下一站·西直北门</p>
                  </div>
              </div>
              <div class="content1" v-if="url!='pages/addRemind/main'">
                  <div class="time">
                      <p>提醒 · 工作日</p>
                  </div>
                  <div class="switch">
                    <van-switch :checked="checked" @change="onChange" size="50rpx" />
                  </div>
              </div>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
        checked:true,
        url:''
      }
  },

  methods: {
    onChange(){
        this.checked=!this.checked;
    }
  },
  mounted(){
      var page= getCurrentPages();//获取加载的页面
      var currentPage = page[page.length-1] //获取当前页面的对象
      this.url = currentPage.route //当前页面url
  }
}
</script>

<style lang="less" scoped>
.index{
    .wrap{
        ul{
            border-top:3rpx solid #F2F2F2;
            li{
                width:100%;
                height:200rpx;
                border-bottom:1rpx solid #F2F2F2;
                .img{
                    width:100rpx;
                    height:100rpx;
                    padding:50rpx 20rpx;
                    float:left;
                    img{
                        width:100%;
                        height:100%;
                        display:block;
                    }
                }
                .content{
                    float:left;
                    padding-top:40rpx;
                    &-left{
                        float:left;
                    }
                    .top-left{
                        font-size:35rpx;
                        font-weight:bold;
                    }
                    .cet-left{
                        font-size:30rpx;
                        padding:10rpx 0;
                        font-weight:bold;
                    }
                    .bot-left{
                        font-size:25rpx;
                    }
                }
                .content1{
                    float:right;
                    padding-top:25px;
                    padding-right:20rpx;
                    .time{
                        color:#075fe4;
                        font-size:25rpx;
                    }
                    .switch{
                        overflow: hidden;
                        padding:20rpx 10rpx;
                    }
                }
            }
        }
    }
}
</style>
