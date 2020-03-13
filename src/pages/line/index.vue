<template>
  <div class="index">
      <find></find>
      <history @clear="clear" @goMap="goMap" :historyList="historyList"></history>
      <popupForm v-if="popupBol" @popupCancel="popupCancel" @popupConfirm="popupConfirm" :formText="formText"></popupForm>
  </div>
</template>

<script>
import find from '@/components/bus/find'
import history from '@/components/bus/history'
import popupForm from '@/components/popupForm'

export default {
  components:{find,history,popupForm},
  data () {
      return{
        popupBol:false,
        historyList:[],
        formText:{title:'删除确认',text:'您是否删除该条历史路线?'},
      }
  },
  methods:{
    // 连接（历史路线）数据库
    ajax(){
      const db = wx.cloud.database({env: 'ybb-901hf'})
      db.collection('historyLineList').where({
        _openid:this.globalData.openid
      }).get({
        success:res=>{
          this.historyList=res.data;
        }
      });
    },
    //从历史路线列表调到腾讯地图
    goMap(geton,getoff){
        let plugin = requirePlugin('mapPlugin');
        geton.name==''?
        mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&endPoint=' + JSON.stringify(getoff)})
        :mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&startPoint=' + JSON.stringify(geton)+ '&endPoint=' + JSON.stringify(getoff)});
    },
    //点击确认是否删除
    clear(id){
        this.clearId=id;
        this.popupBol=true;
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
    popupCancel(){
        this.popupBol=false;
    },
    popupConfirm(){
        this.popupBol=false;
        this.cancel();
    }
  },
  mounted(){
      this.ajax();
  },
  onShow(){
      this.ajax();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
  }
}
</script>

<style lang="less" scoped>
</style>
