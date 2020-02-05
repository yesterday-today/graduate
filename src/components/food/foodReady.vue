<template>
    <div class="Ready">
        <div class="Ready-content">
            <ul>
                <li v-for="(item,index) in food" :key="index">
                    <img :src="item.imgUrl" class="photos">
                    <div class="wrap">
                        <div class="detail">
                            <p class="desc1">{{item.title}}</p>
                            <div class="desc2">
                                <div class="img">
                                    <div class="xh"  v-for="(ite,inde) in 5" :key="inde">
                                        <i class="iconfont icon-shoucang2"></i>
                                    </div>
                                </div>
                                <p class="grades">{{item.grade}}分</p>
                                <p class="comment">{{item.comment}}人评论</p> 
                            </div>
                            <p class="desc3">{{item.address}}</p>
                        </div>
                        <div class="price">
                            <p>¥{{item.price}}/人</p>
                        </div>
                    </div>
                    <div class="address" @click="goMap(item.address)">
                        <div class="img">
                        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/location.png" alt="">
                        </div>
                        <p>查看地图</p>
                    </div>
                    <div class="separate"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props:['food'],
  data() {
    return {
      
    }
  },
  methods: {
      goMap(address){
        this.$emit('goMap',address);
      }
    
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
.Ready {
  width: 90%;
  margin: 0 auto;
  &-content {
    width: 100%;
    height: 100%;
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        overflow:hidden;
        border-bottom:1rpx solid #d3d3d3;
        .photos {
          width: 130rpx;
          height: 130rpx;
          display: block;
          float: left;
          padding:15rpx;
        }
        .address{
          height:40rpx;
          line-height:40rpx;
          font-size:22rpx;
          padding:20rpx 0;
          padding-left:150rpx;
          display:flex;
          .img{
            width:50rpx;
            height:50rpx;
            img{
              width:100%;
              height:100%;
              display:block;
            }
          }
          p{
            font-size:25rpx;
            
          }
        }
        .wrap{
          overflow:hidden;
          border-bottom:1rpx dotted #d3d3d3; 
        .detail {
          width: 400rpx;
          padding:10rpx;
          float: left;
          .desc1{
            font-size: 30rpx;
            height:60rpx;
            line-height:60rpx;
          }
          .desc2 {
            font-size:25rpx;
            height:50rpx;
            line-height:50rpx;
            color:#FF9900;
            // overflow:hidden;
            .img{
              float:left;
              .xh{
                float:left;
                i{
                  font-size: 30rpx;
                }
              }
              
            }
            .grades{
              float:left;
              padding:0 10rpx;
            }
            .comment{
              float:left;
            }
            
          }
          .desc3{
            font-size: 25rpx;
            color: #a7a8b8;
          }
        }
        .price {
          width: 90rpx;
          height: 100%;
          line-height:180rpx;
          float: right;
          text-align: center;
          p {
            font-size: 25rpx;
            color: red;
          }
        }
        }
        .separate {
          width: 100%;
          height: 2rpx;
          background: #d3d3d3;
          float: left;
        }
      }
    }
  }
}
</style>