<template>
  <div class="index">
      <remindList v-if="list==true" :data="data" @clear="clear" @goRemind="goRemind"></remindList>
      <remindListNo v-if="list==false" @add="add" :detail='detail'></remindListNo>
  </div>
</template>

<script>
import remindList from '@/components/bus/remindList'
import remindListNo from '@/components/bus/remindListNo'

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
      this.warn();
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
