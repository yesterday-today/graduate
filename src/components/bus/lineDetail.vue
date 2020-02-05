<template>
  <div class="index">
      <div class="separate"></div>
      <div class="content"  v-if="mode=='transit'">
          <ul>
            <li v-for="(item,index) in lineDetail.steps" :key="index" class="li">
              <div class="wrap">
                <div class="walk" v-if="item.mode=='WALKING'">
                    <p>
                        向{{item.direction}}行走{{item.distance}}米({{item.duration}}分钟)
                    </p>
                </div>
                <div class="bus" v-if="item.mode=='TRANSIT'">
                    <p class="on">{{item.lines[0].geton.title}}</p>
                    <div class="title">
                        <div class="line" v-for="(ite,inde) in item.lines" :key="inde">
                            <div class="titleWrap">
                                <p>{{ite.title}}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail" v-for="(ite,ind) in item.lines" :key="inde" v-if="ind==0">
                        <p class="count">共{{ite.station_count}}站({{ite.duration}}分钟)</p>
                        <ul>
                            <li v-for="(i,ins) in ite.stations" :key="ins">
                                <div class="circle"></div>
                                <p>{{i.title}}</p>
                            </li>
                        </ul>
                    </div>
                    <p class="off">{{item.lines[0].getoff.title}}</p>
                </div>
                </div>
            </li>
          </ul>
      </div>
      <div class="content1" v-if="mode!='transit'">
          <ul>
              <li v-for="(item,index) in lineDetail.steps" :key="index">
                  <div class="circle"></div>
                  <p>{{item.instruction}}</p>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  props:['lineDetail','mode'],
  data () {
      return{
      }
  },
  methods:{
  },
}
</script>

<style lang="less" scoped>
.index{
    border-top:1rpx solid #F2F2F2;
    .separate{
        width:100%;
        height:3rpx;
        background:#F2F2F2;
    }
    .content1{
        ul{
            li{
                line-height: 50rpx;
                font-size: 30rpx;
                display:flex;
                .circle{
                    width: 10rpx;
                    height: 10rpx;
                    background: #000000;
                    border-radius: 50%;
                    margin: 20rpx 20rpx;
                }
            }
        }
    }
    .content{
        padding-top:20rpx;
        ul{
            .li{
                border-bottom:3rpx solid #F2F2F2;
                .wrap{
                    padding-left:30rpx;
                    margin:30rpx 0;
                    overflow: hidden;
                    .walk{
                        font-size:38rpx;
                        font-weight:600;
                    }
                    .bus{
                        .title{
                            font-size:30rpx;
                            color:#000;
                            height:50rpx;
                            margin: 10rpx 0;
                            .line{
                                .titleWrap{
                                    float: left;
                                    border-radius: 5rpx;
                                    margin-right: 5rpx;
                                    padding: 5rpx 10rpx;
                                    color:#fff;
                                    background: #0e8ae8;
                                }
                            }
                        }
                        .detail{
                            .count{
                                color: red;
                                font-size:32rpx;
                            }
                            ul{
                                li{
                                    height: 50rpx;
                                    line-height: 50rpx;
                                    font-size: 30rpx;
                                    display:flex;
                                    .circle{
                                        width: 10rpx;
                                        height: 10rpx;
                                        background: #000000;
                                        border-radius: 50%;
                                        margin: 20rpx 20rpx;
                                    }
                                }
                            }
                        }
                        .on,.off{
                            font-size:38rpx;
                            font-weight: 600;
                        }
                    }
                }
            }
        }
    }
}
</style>
