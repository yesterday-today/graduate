<template>
    <div class="Ready">
        <div class="Ready-content">
            <div class="all">
                <p>共有<span>{{all}}</span>条租房信息</p>
            </div>
            <ul>
                <li v-for="(item,index) in houseData" :key="index" @click="houseDetail(item.id)">
                    <div class="img">
                    <img :src="item.img">
                    </div>
                    <div class="detail">
                        <p class="desc1">{{item.title}}</p>
                        <p class="desc2">{{item.address}}/{{item.type}}/{{item.size}}</p>
                        <div class="bottom clear">
                            <p v-for="(ite,inde) in item.object" :key="inde">{{ite}}</p>
                        </div>
                        <P class="money">{{item.price}}元/月</P>
                    </div>
                    <div class="separate"></div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
  props:['houseData','all'],
  data() {
    return {
      id:0,
      vals: ["最近", "最便宜", "销量最高"],
      value: "最近"
    };
  },
  methods:{
    houseDetail(index){
      this.id=index;
      // 跳转到房源详情页
      this.$emit('goDetail',this.id);
    }
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
    .all{
        p{
            color: gray;
            font-size:30rpx;
            text-align: center;
            letter-spacing:5rpx;
        }
        span{
            color: #fa5741;
        }
    }
    ul {
      width: 100%;
      height: 100%;
      li {
        width: 100%;
        overflow:hidden;
        .img {
            width:170rpx;
            height:100%;
            float: left;
            padding:30rpx 0;
            padding-right:20rpx;
            img{
                width: 170rpx;
                height: 170rpx;
                display: block;
                border-radius:5rpx;
            }
        }
        .detail {
            width:470rpx;
            padding:20rpx 0;
            float: left;
            .desc1 {
                font-size: 30rpx;
            }
            .desc2 {
                height:60rpx;
                line-height:60rpx;
                font-size: 24rpx;
                color: #a7a8b8;
            }
            .money{
                width:100%;
                color:#fa5741;
                font-size:28rpx;
                font-weight:bold;
                margin-top:20rpx;
            }
            .bottom{
                color:#849aae;
                font-size:24rpx;
                overflow:hidden;
                p{
                    float:left;
                    padding:6rpx 10rpx;
                    background:rgba(132,154,174,.1);
                    border-radius:6rpx;
                    margin-right:15rpx;
                    margin-top:10rpx;
                }
                p:nth-child(1){
                    margin-left:0;
                }
            }
        }
        .separate {
          width: 100%;
          height:3rpx;
          background: #d3d3d3;
          float: left;
        }
      }
    }
  }
}
</style>