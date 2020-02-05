<template>
  <div class="menu">
    <houseCollect @goDetail="goDetail" :houseData="houseData"></houseCollect>
  </div>  
</template>

<script>
import houseCollect from '@/components/house/houseCollect';
export default {
    components:{houseCollect},
  data(){
    return{
     houseData:[],
     index:'',
     id:'',
    }
  },
  methods:{
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('houseCollect').get({
            success:res=>{
                this.houseData=res.data;
                console.log(this.houseData)
            }
        });
    },
    goDetail(id){
        mpvue.navigateTo({url:'../houseDetail/main?id='+id});
      },
  },
  mounted(){
      this.ajx();
  }
}
</script>

<style lang="less" scoped>

</style>