<template>
  <div class="index">
      <div class="index-top">
          <div class="index-top-left">
              <p>厦门</p>
              <i class="iconfont icon-xiala"></i>
          </div>
          <div class="index-top-right" @click="goSearch">
            <i class="iconfont icon-sousuo"></i>
            <p>搜索公交线路、车站、地点</p>
          </div>
      </div>
        <div class="index-banner">
            <ul>
                <li v-for="(item,index) in bannerList" :key="index" @click="goLine(index)">
                    <div class="icon1" v-if="index==0">
                        <i class="iconfont icon-luxian"></i>
                    </div>
                    <div class="icon2" v-if="index==1">
                        <i class="iconfont icon-naozhong"></i>
                    </div>
                    <p>{{item.text}}</p>
                </li>
            </ul>
        </div>
        <div class="index-tab">
            <van-tabs @click="onClick">
                <van-tab title="收藏">
                    <collect></collect>
                </van-tab>
                <van-tab title="历史路线">
                    <history></history>
                </van-tab>
            </van-tabs>
        </div>
      <location v-if="locationBol" @popupConfirm="popupConfirm" @popupCancel="popupCancel"></location>
  </div>
</template>

<script>
import location from '@/components/location'
import collect from '@/components/bus/collect'
import history from '@/components/bus/history'

export default {
    components:{location,collect,history},
  data () {
      return{
        locationBol:false,
        selectIndex:0,
        bannerList:[{
            text:'路线',
        },
        {
            text:'上车提醒',
        }],
        tabList:['收藏','历史路线']
      }
  },
  methods: {
    onClick(event){

    },
    popupCancel(){
          this.locationBol=false;
          console.log(this.popBol)
      },
    popupConfirm(){

      },
    // selectIndex为0时是路线页面，为1时是上车提醒页面
    goLine(index){
        this.selectIndex=index;
        console.log(this.selectIndex)
        this.selectIndex==0?mpvue.navigateTo({url:'../line/main'}):mpvue.navigateTo({url:'../remind/main'});
    },
    goSearch(){
        mpvue.navigateTo({url:'../search/main'})
    }
  },
}
</script>

<style lang="less" scoped>
.index{
    // width:90%;
    // margin:0 auto;
    &-top{
        width: 90%;
        margin: 0 auto;
        height:60rpx;
        line-height:60rpx;
        padding:25rpx 0;
        &-left{
            width:110rpx;
            overflow:hidden;
            float:left;
            p{
                font-size:30rpx;
                float:left;
            }
            img{
                float:right;
                width:50rpx;
                height:50rpx;
                display:block;
                padding:15rpx 0;
            }
        }
        &-right{
            width:500rpx;
            height:100%;
            float: left;
            border-radius:30rpx;
            margin-left:20rpx;
            background: #f2f2f2;
            i{
                font-size:40rpx;
                padding-left:10rpx;
                display:block;
                float: left;
            }
            p{
                font-size:30rpx;
                float:left;
                padding-left:10rpx;
                color:#a7a8b8;
            }
        }
    }
    &-banner{
        width:100%;
        height:110rpx;
        margin:0 auto;
        margin-top:10rpx;
        ul{
            padding:15rpx 0;
            overflow:hidden;
            li{
                float:left;
                width:100rpx;
                padding:0 10rpx;
                .icon1,.icon2{
                    width:45rpx;
                    height:45rpx;
                    line-height: 45rpx;
                    margin:0 auto;
                    color:#0e8ae8;
                }
                .icon1{
                    i{
                        font-size:30rpx;
                        font-weight: 600;
                    }
                }
                .icon2{
                    i{
                        font-size: 40rpx;
                        font-weight: 600;
                    }
                }
                p{
                    font-size:24rpx;
                    text-align:center;
                }
            }
        }
    }
}
</style>
