<template>
  <div class="index">
      <remindList v-if="list==true" :data="data" @clear="clear" @goRemind="goRemind"></remindList>
      <remindListNo v-if="list==false" @add="add" :detail='detail'></remindListNo>
  </div>
</template>

<script>
import remindList from '@/components/bus/remindList'
import remindListNo from '@/components/bus/remindListNo'
import Toast from '../../../dist/wx/static/vant/toast/toast'

export default {
    components:{remindList,remindListNo},
  data () {
      return{
          list:true,
          detail:'',
          stations:[],
          data:[],
      }
  },

  methods: {
    getSet(){
        wx.getSetting({
            //同意获取用户订阅消息的状态
            withSubscriptions: true,
            success (res) {
                //authSetting用户授权结果，subscriptionsSetting用户订阅消息设置
                console.log(res.authSetting)
                // res.authSetting = {
                //   "scope.userInfo": true,
                //   "scope.userLocation": true
                // }
                console.log(res.subscriptionsSetting)
                // res.subscriptionsSetting = {
                //   mainSwitch: true, // 订阅消息总开关
                //   itemSettings: {   // 每一项开关
                //     SYS_MSG_TYPE_INTERACTIVE: 'accept', // 小游戏系统订阅消息
                //     SYS_MSG_TYPE_RANK: 'accept'
                //     zun-LzcQyW-edafCVvzPkK4de2Rllr1fFpw2A_x0oXE: 'reject', // 普通一次性订阅消息
                //     ke_OZC_66gZxALLcsuI7ilCJSP2OJ2vWo2ooUPpkWrw: 'ban',
                //   }
                // }
            }
        })
    },
    remind(){
         wx.cloud.callFunction({
             name:'remindMessage',
             data:{
                 date4:'12月22日 08:45',
                 thing2:'222路',
                 thing1:'200米',
                 thing3:'台东路',
                 thing5:'你好，公交即将到达，请注意出门时间！'
             },
             success:res=>{
                 console.log("remind",res)
                
             },
             
         })
    },
    //判断是否设置了提醒
    warn(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('remindCollect').where({
            _openid:this.globalData.openid,
        }).get({
            success:res=>{
                if(res.data.length!=0){
                    this.list=true;
                    this.data=res.data;
                }else{
                    this.remindBol=false;
                }
            }
        })
    },
    add(){
      mpvue.navigateTo({url:'../addRemind/main'})
    },
    //点击进行删除
    clear(id){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("remindCollect").doc(id).remove({
            success:res=>{
                this.data=[];
                this.warn();
            },
            fail:res=>{
            }
        })
    },
    goRemind(id){
        mpvue.navigateTo({url:'../addRemind/main?id='+id+'&stations='+this.stations})
    }
  },
  mounted(){
      this.getSet();
      this.warn();
      this.remind();
  },
  watch(){
    if (getCurrentPages().length != 0) {
    //刷新当前页面的数据
    getCurrentPages()[getCurrentPages().length - 1].onShow();
   }
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    this.detail=options.detail;
  }
}
</script>

<style lang="less" scoped>

</style>
