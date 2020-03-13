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
                    <history @clear="clear" @goMap="goMap" :historyList="historyList"></history>
                </van-tab>
            </van-tabs>
        </div>
        <popupForm v-if="popupBol" @popupCancel="popupCancel" @popupConfirm="popupConfirm" :formText="formText"></popupForm>
  </div>
</template>

<script>
import collect from '@/components/bus/collect'
import history from '@/components/bus/history'
import popupForm from '@/components/popupForm'
export default {
    components:{collect,history,popupForm},
  data () {
      return{
        cityId:82,//城市id
        selectIndex:0,
        busCollect:[],
        bannerList:[{text:'路线'},{text:'上车提醒'}],
        tabList:['收藏','历史路线'],
        formText:{title:'删除确认',text:'您是否删除该条历史路线?'},
        historyList:[],//历史路线列表
        popupBol:false,//true为弹出窗体
        caearId:'',//删除id
        option1: [
            { text: '厦门', value: 82 },
            { text: '漳州', value: 162 },
            { text: '泉州', value: 103 }
        ],
        value1:82,
      }
  },
  methods: {
    // 连接（收藏）数据库
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
    // 连接（历史路线）数据库
    ajax(){
      const db = wx.cloud.database({env: 'ybb-901hf'})
      db.collection('historyLineList').where({
        _openid:this.globalData.openid
      }).get({
        success:res=>{
          this.historyList=res.data;
          console.log(this.historyList)
        }
      });
    },
    onClick(event){
    },
    // selectIndex为0时是路线页面，为1时是上车提醒页面
    goLine(index){
        this.selectIndex=index;
        this.selectIndex==0?mpvue.navigateTo({url:'../line/main'})
       :mpvue.navigateTo({url:'../remind/main?cityId='+this.cityId});
    },
    goSearch(){
        mpvue.navigateTo({url:'../search/main?cityId='+this.value1});
    },
    //获取选择地区
    change(e){
        this.value1=e.mp.detail;
    },
    //从收藏列表跳转到公交详情页
    goBus(id,num){
        mpvue.navigateTo({url:'../busLocation/main?busLine='+num+'&cityId='+this.cityId})
    },
    //-----history组件相关事件
    //从历史路线列表调到腾讯地图
    goMap(geton,getoff){
        let plugin = requirePlugin('mapPlugin');
        geton.name==''?
        mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&endPoint=' + JSON.stringify(getoff)})
        :mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&startPoint=' + JSON.stringify(geton)+ '&endPoint=' + JSON.stringify(getoff)});
    },
    //删除事件
    cancel(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("historyLineList").doc(this.clearId).remove({
            success:res=>{
                this.historyList=[];
                this.ajax();
            },
            fail:res=>{
            }
        })
    },
    //点击确认是否删除
    clear(id){
        this.clearId=id;
        this.popupBol=true;
    },
    popupCancel(){
        this.popupBol=false;
    },
    popupConfirm(){
        this.popupBol=false;
        this.cancel();
    }
  },
  onShow(){
    this.ajax();
  },
  mounted(){
    this.ajx();
    this.ajax();
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
