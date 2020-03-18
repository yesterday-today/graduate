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
        area:'不限',
        detail:'',
        selectBol:false,
        all:0,
        array:[],//选择数组
        rent:0,//0为不限，1为整租，2为合租
        priceType:0,//price<1500:price_type=1,1500<=price<=3000:price_type=2,3000<price<=5000:price_type=3,price>5000:price_type=4
        apartmentType:0,//1室:apartment_type=1,2室:apartment_type=2,3室:apartment_type=3,4室:apartment_type=4
        timeType:0,//年:time_type=1,月:time_type=2,其他:time_type=3
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
                    {name:'不限',value:'不限'},
                    {name:'整租',value:'整租'},
                    {name:'合租',value:'合租'},
            ]},
            {
                label:"租金",
                option:[
                    {name:'不限',value:'不限'},
                    {name:'<1.5k',value:'<1.5k'},
                    {name:'1.5k-3k',value:'1.5k-3k'},
                    {name:'3k-5k',value:'3k-5k'},
                    {name:'>5k',value:'>5k'},
            ]},
            {
                label:"户型",
                option:[
                    {name:'不限',value:'不限'},
                    {name:"一居",value:"一居"},
                    {name:"两居",value:"二居"},
                    {name:"三居",value:"三居"},
                    {name:"四居+",value:"四居+"},
            ]},
            {
                label:"租期",
                option:[
                    {name:"月租",value:"月租"},
                    {name:"年租",value:"年租"},
                    {name:"其他",value:"其他"},
                    ]}
            ]
    }
  },
  methods:{
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').where({
            _openid:this.globalData.openid
        }).get({
            success:res=>{
                console.log(res)
                this.area=res.data[0].address.district;
                this.detail=res.data[0].address.street;
                this.get(this.area,this.detail);
            }
        });
    },
      get(area,detail){
          wx.request({
              url:'http://localhost:8888/house/city='+area+'/district='+detail, //本地服务器地址
            //   url:'http://192.168.1.4:8888/house/city='+this.area+'/district='+this.detail,//本地服务器地址
              data:{
                rent:this.rent,
                price:this.priceType,
                apartment:this.apartmentType,
                time:this.timeType
              },
              success:res=>{
                  console.log(res);
                  if(res.statusCode==200){
                      this.houseData=res.data;
                      this.all=res.data.length;
                  }
              }
          })
      },
      getSelectResult(e){
          this.array=e;
          this.rent=this.array[0]=='不限'?this.rent=0:this.array[0]=='整租'?this.rent=1:this.array[0]=='undefined'?this.rent=0:this.rent=2
          this.priceType=this.array[1]=='不限'?this.priceType=0:this.array[1]=='<1.5k'
                        ?this.priceType=1:this.array[1]=='1.5k-3k'
                        ?this.priceType=2:this.array[1]=='3k-5k'
                        ?this.priceType=3:this.array[1]=='>5K'
                        ?this.priceType=4:this.priceType=0
          this.apartmentType=this.array[2]=='不限'?this.apartmentType=0:this.array[2]=='一居'
                        ?this.apartmentType=1:this.array[2]=='二居'
                        ?this.apartmentType=2:this.array[2]=='三居'
                        ?this.apartmentType=3:this.array[2]=='四居'
                        ?this.apartmentType=4:this.apartmentType=0
          this.timeType=this.array[3]=='其他'?this.timeType=3:this.array[3]=='月租'
                        ?this.timeType=2:this.array[3]=='年租'
                        ?this.timeType=1:this.timeType=0
          this.get(this.area,this.detail);
      },
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
        this.get(this.area,this.detail);
    },
  },
  mounted(){
      this.ajx();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
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
