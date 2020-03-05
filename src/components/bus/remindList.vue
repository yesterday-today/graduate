<template>
  <div class="index">
      <div class="wrap">
        <ul>
          <li v-for="(item,index) in data" :key="index">
            <van-swipe-cell id="swipe-cell" :right-width="65" :disabled="disabled" class="van-swipe-cell" async-close @close="onClose(item._id)">
              <van-cell-group>
                <div @click="goAddRemind(item._id)">
                  <div class="img">
                    <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/clock1.png" alt="">
                  </div>
                  <div class="content">
                    <div class="top-left">
                        <p>{{item.data.busName}}路</p>
                    </div>
                    <div class="cet-left">
                        <p v-if="name!=''">上车点:{{item.data.name.lineName}}站</p>
                        <p v-else>提醒站名</p>
                    </div>
                    <div class="bot-left">
                        <p>({{item.data.lineNum}}前提醒)</p>
                    </div>
                  </div>
                </div>
                <div class="content1" v-if="url!='pages/addRemind/main'">
                    <div class="time">
                        <p>提醒 · {{item.data.repeat}}</p>
                    </div>
                    <div class="switch">
                        <van-switch :checked="checked" @change="onChange" size="50rpx" />
                    </div>
                </div>
              </van-cell-group>
              <view slot="right" class="van-swipe-cell__right" v-if="url!='pages/addRemind/main'">删除</view>
            </van-swipe-cell>
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data () {
      return{
        checked:true,
        disabled:false,
        url:''
      }
  },

  methods: {
    onChange(){
        this.checked=!this.checked;
    },
    onClose(id){
      this.$emit('clear',id);
    },
    goAddRemind(id){
        this.$emit('goRemind',id);
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
            .van-swipe-cell{
                background: #ff0000 !important;
            }
            li{
                width:100%;
                height:200rpx;
                background: #fff;
                border-bottom:1rpx solid #F2F2F2;
                .van-swipe-cell__right {
                    display: inline-block;
                    width: 155rpx;
                    height: 200rpx;
                    font-size:32rpx;
                    line-height: 200rpx;
                    color: #fff;
                    text-align: center;
                    background-color: #f44;
                }
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
