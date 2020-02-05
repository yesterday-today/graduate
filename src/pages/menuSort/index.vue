<template>
  <div class="sort">
    <van-search
      :value="val"
      placeholder="请输入搜索关键词"
      shape="round"
      use-action-slot
      @search="onSearch"
      @change="onChange"
    >
      <view  slot="action" @tap="onClick">搜索</view>
    </van-search>
    <div class="separate"></div>
    <foodMenu :menuList="menuList" @go="go"></foodMenu>
    <div class="loading" v-if="loadValue==true">
        <div class="wrap">
            <van-loading color="#1989fa" size="30px"/>
        </div>
    </div>
    <div class="loadingNo" v-if="loadingNo==true">
        <div class="icon">
            <van-icon name="warn-o" />
        </div>
        <p>暂无您想要搜索的内容</p>
    </div>
  </div>
</template>

<script>
import foodMenu from '@/components/food/foodMenu'
export default {
  components:{foodMenu},
  data(){
    return{
      id:0,
      index:'',
      menuList:[],
      loadValue:false,
      loadingNo:false,
      operateValue:1,//输入时为1，搜索为2
      form:0,//0为实用分类，1为每日三餐，2为家常菜谱....
      type:0,//0为早餐，2为午餐，3为下午茶....
      val:'',
      dataBank:[['','','','vegetarian'],['breakfast','lunch']],
      dataValue:'',
    }
  },
  methods:{
    //获取页面url
    getPages(){
        var pages = getCurrentPages() //获取加载的页面
        var currentPage = pages[pages.length-1] //获取当前页面的对象
        var url = currentPage.route //当前页面url
        return url;
    },
    onSearch(event){
        this.val=event.mp.detail;
        this.operateValue=2;
        this.query();
    },
    onChange(e){
        this.val=e.mp.detail;
        this.operateValue=1;
        this.query();
    },
    onClick () {
        this.operateValue=2;
        this.query();
    },
    go(index,id){
        this.index=index;
        this.id=id;
        mpvue.navigateTo({url:'../menuDetail/main?index='+this.index+'&id='+this.id+'&type='+this.dataValue+'&url='+this.getPages()})
    },
    //数据库查询
    query(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        this.loadValue=true;
        db.collection(this.dataValue).where({
            title:{
                $regex:this.val,//从搜索栏获取val值作为规则进行匹配
                $options:'i'//不区分大小写
            }
        }).get({
            success: res=>{
                this.menuList=res.data;
                this.loadValue=false;
                if(this.operateValue==2&&this.menuList.length==0){
                    this.loadingNo=true;
                }else{
                    this.loadingNo=false;
                }
            }
        })
    },
    ajax(){
        this.loadValue=true;
        wx.cloud.callFunction({
            name: this.dataValue,
            complete: res=>{
                // setTimeout(()=>{
                    this.menuList=res.result.data;
                    this.loadValue=false;
                // },800)
                console.log('云函数返回数据:',res);
            }
        })
    },
  },
  mounted(){
    this.dataValue=this.dataBank[this.form][this.type];
    this.ajax();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    this.form=options.form;
    this.type=options.type;
    console.log(options)
  },
}
</script>

<style lang="less" scoped>
.sort{
    .separate{
        width:100%;
        height:1rpx;
        background:gainsboro;
    }
    .loadingNo{
        display: flex;
        width: 60%;
        margin: 0 auto;
        height:200rpx;
        line-height: 200rpx;
        .icon{
            color:red;
        }
        p{
            font-size:32rpx;
            padding-left:20rpx;
        }
    }
    .loading{
        width:100%;
        height:100%;
        background: rgba(255,255,255,.5);
        z-index:333;
        position:fixed;
        top:0;
        left:0;
        .wrap{
            position:absolute;
            top:50%;
            left:50%;
            transform: translateX(-50%) translateY(-50%);
        }
    }
}

</style>