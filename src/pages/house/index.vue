<template>
  <div class="house">
    <headerTop @goMap="goSelect" :area="area" :detail="detail"></headerTop>
    <swipers :img="imgUrls"></swipers>
    <div class="tab">
        <p>为您推荐</p>
    </div>
    <selectArea v-if="selectBol==true" @selectValue="selectValue"></selectArea>
    <div class="wrap">
        <selection :data='select' @change="getSelectResult($event)"></selection>
    </div>
    <houseReady @goDetail="goDetail" :houseData="houseData" :all="all"></houseReady>
    </div>
</template>

<script>
import headerTop from "@/components/headerTop";
import swipers from '@/components/swiper';
import selection from '@/components/selection';
import houseReady from '@/components/house/houseReady';
import selectArea from '@/components/house/selectArea';


export default {
  components: {headerTop,swipers,selection,houseReady,selectArea},
  data() {
    return {
        houseData:'',
        area:'思明',
        detail:'前埔',
        selectBol:false,
        all:0,
        imgUrls: [{
            img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiperH1.jpg"
        },{
            img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiperH2.jpeg"
        },
       {
        img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swiperH3.jpg"
       }],
        select:[
            {
                label:"方式",
                option:[
                    {name:'不限',value:'1'},
                    {name:'整租',value:'2'},
                    {name:'合租',value:'3'},
            ]},
            {
                label:"租金",
                option:[
                    {name:'<1.5k',value:'1'},
                    {name:'1.5k-3k',value:'2'},
                    {name:'3k-5k',value:'3'},
                    {name:'>5k',value:'4'},
            ]},
            {
                label:"户型",
                option:[
                    {name:"一居",value:"1"},
                    {name:"两居",value:"2"},
                    {name:"三居",value:"3"},
                    {name:"四居+",value:"4"},
            ]},
            {
                label:"租期",
                option:[
                    {name:"月租",value:"1"},
                    {name:"年租",value:"2"},
                    {name:"其他",value:"3"},
                    ]}
            ]
    }
  },
  methods:{
      //跳转到详情页
      goDetail(id){
        mpvue.navigateTo({url:'../houseDetail/main?id='+id});

      },
      goSelect(){
          this.selectBol=true;
      },
      //选择详细地址
      selectValue(area,detail){
          this.area=area;
          this.detail=detail;
          setTimeout(()=>{
              this.selectBol=false;
          },500)
          this.get();
      },
      get(){
          wx.request({
            //   url:'http://localhost:8888/house',//本地服务器地址
              url:'http://192.168.1.6:8888/house/city='+this.area+'/district='+this.detail,//本地服务器地址
              success:res=>{
                  if(res.statusCode==200){
                      this.houseData=res.data;
                      this.all=res.data.length;
                  }
              }
          })
      },
      getSelectResult(e){
          console.log(e);
      },
  },
  mounted(){
      this.get();
  }
};
</script>

<style lang="less" scoped>
.house{
    .tab{
        padding:20rpx;
        font-size:48rpx;
        border-bottom:1rpx solid gainsboro;
        }
}
</style>
