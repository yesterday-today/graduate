<template>
  <div class="index">
      <div class="index-top">
          <div class="index-top-left">
            <van-dropdown-menu>
              <van-dropdown-item :value="value1" :options="option1" @change="change"/>
            </van-dropdown-menu>
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
                    <collect :busCollect="busCollect" @goBus="goBus"></collect>
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
        cityId:82,//城市id
        selectIndex:0,
        busCollect:[],
        bannerList:[{
            text:'路线',
        },
        {
            text:'上车提醒',
        }],
        tabList:['收藏','历史路线'],
        option1: [
            { text: '厦门', value: 82 },
            { text: '漳州', value: 162 },
            { text: '泉州', value: 103 }
        ],
        value1:82,
      }
  },
  methods: {
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('busCollect').where({
            _openid:this.globalData.openid
        }).get({
            success:res=>{
                this.busCollect=res.data;
            }
        });
    },
    onClick(event){

    },
    popupCancel(){
          this.locationBol=false;
      },
    popupConfirm(){

      },
    // selectIndex为0时是路线页面，为1时是上车提醒页面
    goLine(index){
        this.selectIndex=index;
        console.log(this.selectIndex)
        this.selectIndex==0?mpvue.navigateTo({url:'../line/main'})
        :mpvue.navigateTo({url:'../remind/main?cityId='+this.cityId});
    },
    goSearch(){
        mpvue.navigateTo({url:'../search/main?cityId='+this.value1});
    },
    //从收藏列表跳转到公交详情页
    goBus(id,num){
        console.log(num)
        mpvue.navigateTo({url:'../busLocation/main?busLine='+num+'&cityId='+this.cityId})
    },
    //获取选择地区
    change(e){
        this.value1=e.mp.detail;
    }
},
    mounted(){
        this.ajx()
  }
}
</script>

<style lang="less" scoped>
.index{
    // width:90%;
    // margin:0 auto;
    &-top{
        width: 100%;
        margin: 0 auto;
        height:60rpx;
        line-height:60rpx;
        padding:25rpx 0;
        &-left{
            width:140rpx;
            overflow:hidden;
            float:left;
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
