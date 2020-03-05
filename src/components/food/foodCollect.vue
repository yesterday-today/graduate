<template>
    <div class="Ready">
        <div class="Ready-content">
            <ul>
                <li v-for="(item,index) in food" :key="index">
                    <div v-if="item.data.imgUrl!=''">
                        <img :src="item.data.imgUrl" class="photos">
                    </div>
                    <div v-if="item.data.imgUrl==''">
                        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/pictureNo.png" class="photos">
                    </div>
                    <div class="wrap">
                        <div class="detail">
                            <p class="desc1">{{item.data.title}}</p>
                            <div class="desc2">
                                <div class="img">
                                    <van-rate
                                        :value="item.data.grade"
                                        :size="10"
                                        :gutter=0
                                        allow-half
                                        readonly
                                        void-icon="star"
                                    />
                                </div>
                                <p class="grades">{{item.data.grade}}分</p>
                                <p class="comment">{{item.data.comment}}人评论</p> 
                            </div>
                            <p class="desc3">{{item.data.address}}</p>
                        </div>
                        <div class="price">
                            <p>¥{{item.data.price}}/人</p>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="address" @click="goMap(item.data.address)">
                            <div class="img">
                            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/location.png" alt="">
                            </div>
                            <p>查看地图</p>
                        </div>
                        <div class="collect">
                            <div class="img" @click="change(item.data.id)">
                                <i class="iconfont icon-shoucang" v-if="collect==false"></i>
                                <i class="iconfont icon-shoucang2" v-if="collect==true"></i>
                            </div>
                        </div>
                    </div>
                    <div class="separate"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props:['food','tab'],
  data() {
    return {
       collect:true,//是否收藏
       id:0,//获取美食收藏id
       data:[],//获取美食收藏数据

    }
  },
  methods: {
    goMap(address){
      this.$emit('goMap',address);
    },
    change(id){
      this.id=id;
      this.$emit('change',id);
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
        .bottom{
            .address{
                height:40rpx;
                line-height:40rpx;
                font-size:22rpx;
                padding:20rpx 0;
                padding-left:150rpx;
                display:flex;
                float: left;
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
            .collect{
                float: right;
                padding: 20rpx 0;
                i{
                    color: #ff0000;
                }
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
            width: 350rpx;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .desc2 {
            font-size:25rpx;
            height:50rpx;
            line-height:50rpx;
            color:#FF9900;
            // overflow:hidden;
            .img{
              float:left;
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
          width: 100rpx;
          height: 100%;
          line-height:180rpx;
          float: right;
          text-align: center;
          overflow: hidden;
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