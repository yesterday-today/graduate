<template>
  <div class="index">
      <remindList></remindList>
      <div class="separate"></div>
      <div class="remind">
        <van-cell title="提醒站距" :value="nums" @click="go($event)"/>
        <van-cell title="重复" :value="repeat" @click="go($event)"/>
        <van-cell title="开始时间" value="22:00"/>
        <van-cell title="结束时间" value="22:10"/>
        <van-cell title="提醒多辆">
            <van-switch :checked="checked" @change="onChange" size="30rpx"/>
        </van-cell>
      </div>
      <van-action-sheet :show="show" :actions="actionsValue" :title="title" @close="onClose" @select="onSelect">
      </van-action-sheet>
  </div>
</template>

<script>
import remindList from '@/components/bus/remindList'
export default {
    components:{remindList},
  data () {
      return{
          show:false,
          checked:false,
          title:'',
          actionsValue:'',
          tabId:0,
          nums:'即将到站',
          repeat:'工作日',
          actions: [
              [{subname: '即将到站'},{subname: '一站'},{subname: '两站'},{subname: '三站'},
              {subname: '四站'},{subname: '五站'},{subname: '六站'}],
              [{subname: '周一'},{subname: '周二'},{subname: '周三'},{subname: '周四'},
              {subname: '周五'},{subname: '周六'},{subname: '周日'}]
            ]
      }
  },

  methods: {
      go(e){
          this.show=true;
          this.tabId=e.currentTarget.dataset.eventid;
          this.title=this.tabId==0?'提醒站距':'重复';
          this.actionsValue=e.currentTarget.dataset.eventid==0?this.actions[0]:this.actions[1];
      },
      onClose(){
          this.show=false;
      },
      onSelect(event){
          if(this.tabId==0){
              this.nums=event.mp.detail.subname;
          }
          else if(this.tabId=1){
              this.repeat=event.mp.detail.subname;
          }
      },
       onChange(){
        this.checked=!this.checked;
    }
  },
  mounted(){
      console.log(this.actions[0])
  }
}
</script>

<style lang="less" scoped>
.index{
    .separate{
        width:100%;
        height:20rpx;
        background: #f2f2f2;
    }
}
</style>
