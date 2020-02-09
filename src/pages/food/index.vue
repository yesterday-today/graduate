<template>
  <div class="my">
    <div class="top">
      <headerTop @goMap="goLocation"></headerTop>
    </div>
    <swipers :img="imgUrls"></swipers>
    <div class="tab">
      <ul>
        <li v-for="(item,index) in tabList" :key="index" :class="{'active':index==tabindex}" @click="ontab(index)">
          <img :src="item.imgUrl">
          <span>{{item.title}}</span>
        </li>
      </ul>
    </div>
    <div class="Ready">
        <p class="title">{{title}}:</p>
        <div class="section" v-if="tabindex!=5">
            <div class="value" v-for="(item,index) in vals" :key="index" @click="select(index)" :class="{'bk':index==selectValue}">
            <p>{{item}}</p>  
            </div>  
        </div>
        <div class="sections" v-if="tabindex==5" @click="more">
            <p>查看更多</p>  
        </div>
    </div>
    <location v-if="popBol"@popupConfirm="popupConfirm" @popupCancel="popupCancel"></location>
    <foodReadys :food="foodList" v-if="tabindex!=5" @goMap="goMap"></foodReadys>
    <foodMenu :menuList="menuList" @go="go" v-if="tabindex==5"></foodMenu>
  </div>
  
</template>

<script>
import headerTop from '@/components/headerTop'
import swipers from '@/components/swiper'
import foodReadys from '@/components/food/foodReady'
import foodMenu from '@/components/food/foodMenu'
import location from '@/components/location'

export default {
  components: {headerTop,swipers,foodReadys,foodMenu,location},
  data(){
    return{
      tabindex: 0,
      popBol:false,
      title: "汉堡",
      vals: ["智能排序","人气最高", "最便宜"],
      address:'',
      menuList:'',
      selectValue: 0,
      index:'',
      imgUrls: [
        {img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiper1.jpg"},
        {img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiper2.jpg"},
        {img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiper3.jpg"},
        {img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiper4.jpg"},
        {img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiper5.jpg"},
      ],
      tabList: 
        [{
          imgUrl:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodHam.png",
          title: "汉堡"
        },
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodMb.png",
          title: "面包"
        },
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodMt.png",
          title: "面食"
        },
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodSg.png",
          title: "水果"
        },
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodRice.png",
          title: "主食"
        },
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCp.png",
          title: "菜谱"
        }],
        foodList: [
        {
          imgUrl: "cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCp.png",
          title: "华莱士",
          address: "思明区中山路思明南路189号中华城CHINACITY南区5F",
          price: 30,
          comment:10,
          grade:4.2,
        },
        {
          imgUrl:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCp.png",
          title: "肯德基",
          address: "思明区大学路129号之二（面对见福便利店右拐，有停车的巷子直走进来右手边)",
          price: 50,
          comment:100,
          grade:4.2,
        },
        {
          imgUrl:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCp.png",
          title: "肯德基",
          address: "宝龙一城二楼出口处",
          price: 10,
          comment:1000,
          grade:4.2,
        }],
    }
  },
  methods:{
    goLocation(){
        this.popBol=true;
    },
    popupCancel(){
        this.popBol=false;
    },
    popupConfirm(){

    },
    ajax(){
        wx.cloud.callFunction({
            name: 'food',
            complete: res=>{
                this.menuList=res.result.data;
            }
        })
    },
    ontab(index) {
      this.tabindex = index;
      this.title = this.tabList[index].title;
    },
    //去详情页面
    go(index,id){
        this.index=index;
        this.id=id;
        mpvue.navigateTo({url:'../menuDetail/main?index='+this.index+'&id='+this.id+'&type='+'food'+'&url='+this.getPages()});
        console.log(id);
    },
    //查看路线规划
    goMap(address){
        this.address=address;
        console.log(this.address)
        mpvue.navigateTo({url:'../map/main?address='+this.address})
    },
    //更多菜谱
    more(){
        mpvue.navigateTo({url:'../menu/main'});
    },
    select(index){
      this.selectValue=index;
      if(index==1){
        this.foodList.sort((a,b)=>{
            return b.comment-a.comment;
        })
        }else if(index==2){
        this.foodList.sort((a,b)=>{
            return a.price-b.price;
        })
      }
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
      this.ajax();
  },
}
</script>

<style lang="less" scoped>
.my{
    .Ready {
        width:90%;
        height: 60rpx;
        line-height: 60rpx;
        margin:0 auto;
        font-size: 30rpx;
        .title {
        float: left;
        font-weight: bold;
        }
        .desc {
        float: left;
        }
        .sections{
        color:#0e8ae8;
        float:right;
        font-weight:bold;
        }
        .section{
        float:right;
        .value{
            float:left;
            padding-left:20rpx;
        }
        .bk{
            color:#0e8ae8;
        }
        }
    }
  .tab {
    width: 95%;
    height: 250rpx;
    margin: 0 auto;
    padding-top: 10rpx;
    padding-bottom: 10rpx;
    box-sizing: border-box;
    border-bottom: 6rpx solid #d3d3d3;
    ul {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      li {
        width: 25%;
        height: 50%;
        float: left;
        img {
          width: 60rpx;
          height: 60rpx;
          display: block;
          margin: 0 auto;
          padding-top: 10rpx;
          padding-bottom: 3rpx;
        }
        span {
          font-size: 28rpx;
          display: block;
          text-align: center;
        }
      }
      .active {
        font-weight: bold;
        color: #0e8ae8;
        background: #d3e9f9;
        border-radius: 20rpx;
      }
    }
  }
}
</style>