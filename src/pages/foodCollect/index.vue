<template>
  <div class="food">
    <foodCollect :food="foodList" @goMap="goMap" @change="change"></foodCollect>
    <van-toast id="van-toast"/>
  </div>
  
</template>

<script>
import foodCollect from '@/components/food/foodCollect'
import Toast from '../../../static/vant/toast/toast';

export default {
  components: {foodCollect},
  data(){
    return{
        foodList:[],
        id:0,//取消收藏的id
    }
  },
  methods:{
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('foodCollect').where({
            _openid:this.globalData.openid
        }).get({
            success:res=>{
                this.foodList=res.data;
                console.log(this.foodList)
            }
        });
    },
    //移除数据
    removeCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("foodCollect").doc(parseInt(this.id)).remove({
            success:res=>{
                console.log(res);
                Toast('删除成功');
                this.foodList=[];
                this.ajx();
            },
            fail:res=>{
                console.log(res);
            }
        })
    },
    //查看路线规划
    goMap(address){
        this.address=address;
        mpvue.navigateTo({url:'../map/main?address='+this.address})
    },
    //取消收藏
    change(id){
        this.id=id;
        this.removeCollect();
    }
  },
  mounted(){
      this.ajx();
  },
}
</script>

<style lang="less" scoped>
</style>