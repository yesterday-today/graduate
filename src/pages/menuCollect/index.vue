<template>
  <div class="menu">
    <menuCollect :menuList="menuList" @go="go"></menuCollect>
  </div>  
</template>

<script>
import menuCollect from '@/components/food/menuCollect'
export default {
    components:{menuCollect},
  data(){
    return{
     menuList:'',
     index:'',
     id:'',
     openid:'',//获取openid
    }
  },
  methods:{
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('menuCollect').where({
            _openid:this.globalData.openid
        }).get({
            success:res=>{
                this.menuList=res.data;
            }
        });
    },
    go(index,id){
        this.index=index;
        this.id=id;
        mpvue.navigateTo({url:'../menuDetail/main?index='+this.index+'&id='+this.id+'&type='+'menuCollect'+'&url='+this.getPages()});
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
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    this.openid=options.openid;
  }
}
</script>

<style lang="less" scoped>

</style>