<template>
  <div class="menu">
    <foodCollect :menuList="menuList" @go="go"></foodCollect>
  </div>  
</template>

<script>
import foodCollect from '@/components/food/foodCollect'
export default {
    components:{foodCollect},
  data(){
    return{
     menuList:'',
     index:'',
     id:'',
    }
  },
  methods:{
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('foodCollect').get({
            success:res=>{
                this.menuList=res.data;
            }
        });
    },
    go(index,id){
        this.index=index;
        this.id=id;
        mpvue.navigateTo({url:'../menuDetail/main?index='+this.index+'&id='+this.id+'&type='+'foodCollect'+'&url='+this.getPages()});
    },
    //获取页面url
    getPages(){
        var pages = getCurrentPages() //获取加载的页面
        var currentPage = pages[pages.length-1] //获取当前页面的对象
        var url = currentPage.route //当前页面url
        return url;
    }
  },
  mounted(){
      this.ajx();
  }
}
</script>

<style lang="less" scoped>

</style>