<template>
  <div class="house">
    <swipers :img="imgUrls"></swipers>
    <div class="detail">
        <div class="detail-top">
            <p class="detail-title">{{title}}</p>
            <div class="collect">
                <div class="img" @click="change">
                    <i class="iconfont icon-shoucang" v-if="collect==false"></i>
                    <i class="iconfont icon-shoucang2" v-if="collect==true"></i>
                </div>
            </div>
        </div>
        <div class="detail-tab clear">
            <div class="top" v-for="(item,index) in tabTop" :key="index">
                <p>{{item}}</p>
            </div>
            <div class="bottom" v-for="(item,index) in tabBottom" :key="index">
                <p>{{item}}</p>
            </div>
        </div>
        <div class="detail-basic" v-if="basicList!=''">
            <ul>
                <p class="desc">基本信息</p>
                <li v-for="(item,index) in basicList" :key="index">
                    <p class="left">{{item}}</p>
                </li>
            </ul>
        </div>
        <div class="Matche">
            <p class="desc">配套设施</p>
            <div class="Matche-detail" v-for="(item,index) in facilities" :key="index">
                <img :src="item.img" alt="">
                <p class="no" v-if="item.status==1">{{item.facility}}</p>
                <p v-if="item.status==2">{{item.facility}}</p>
            </div>
        </div>
        <div class="comnunicat" v-for="(item,index) in link" :key="index">
            <div class="comnunicat-top">
                <div class="img">
                    <img :src="item.img" alt="">
                </div>
                <div class="right">
                    <div class="right-top">
                        <p>销售</p>
                    </div>
                    <div class="right-cet">
                        <p class="right-cet-left">{{item.name}}</p>
                        <p class="right-cet-right">经纪人</p>
                    </div>
                </div>
            </div>
            <div class="comnunicat-bot">
                <p>电话：{{item.phone}}</p>
            </div>
        </div>
        <div class="address">
            <p class="desc">地址和交通</p>
            <div class="location" @click="gomap(address)">
                <i class="iconfont icon-dingwei"></i>
                <p>{{address}}</p>
             </div>
        </div>
    </div>
  </div>
</template>

<script>
import swipers from "@/components/swiper";

export default {
  components: { swipers },
  data() {
    return {
      id:0,
      data:[],//房源数据
      title:'',//房源标题
      tabBottom:[],//价格、户型、面积
      imgUrls: [],//房源图片
      tabTop: ["房租", "户型", "面积"],
      basicList: [],//基本信息
      link:[],//联系人方式
      address:'',//房源详情地址
      facilities:[],//房源设施
      collect:false,//是否收藏
    };
  },
  methods: {
    get(){
        wx.request({
          url:'http://localhost:8888/house/id='+this.id,//本地服务器地址
            // url:'http://192.168.1.6:8888/house/id='+this.id,//本地服务器地址
            success:res=>{
                if(res.statusCode==200){
                    this.data=res.data[0];
                    this.title=this.data.title;
                    var price=this.data.price+'元';
                    var type=this.data.type;
                    var size=this.data.size;
                    this.tabBottom.push(price,type,size);
                    this.imgUrls=this.data.imgList;
                    this.basicList=this.data.detail[0].news;
                    this.link=this.data.detail[0].link;
                    this.facilities=this.data.detail[0].facilities;
                    this.address=this.data.area+'区'+this.data.address;
                }
            }
        })
      },
    //判断是否收藏了
    collectBol(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('houseCollect').where({
            _id:parseInt(this.id)
        }).get({
            success:res=>{
                if(res.data.length!=0){
                    this.collect=true;
                }else{
                    this.collect=false;
                }
            }
        })
    },
    //添加数据到数据库
    addCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('houseCollect').add({
            data:{
                _id:this.data.id,
                data:this.data,
            },
            success:res=>{
                console.log(res);
            }
        });
    },
    //移除数据
    removeCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("houseCollect").doc(parseInt(this.id)).remove({
            success:res=>{
                console.log(res)
            },
            fail:res=>{
                console.log(res);
            }
        })
    },
    gomap(address){
        mpvue.navigateTo({url:'../map/main?address='+address})
    },
    change(){
        if(this.collect==false){
            this.collect=true;
            this.addCollect();
        }else{
            this.collect=false;
            this.removeCollect();
            }
        }
  },
  mounted() {
    this.get();
    this.collectBol();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    this.id=options.id;
  }
};
</script>

<style lang="less" scoped>
.house {
  padding-bottom: 100rpx;
  .detail {
    width: 90%;
    margin: 0 auto;
    &-top{
        overflow: hidden;
        p{
            float: left;
        }
        .collect{
            float:right;
            width: 100rpx;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            // position: fixed;
            // bottom:10rpx;
            // right: 10rpx;
            i{
                font-size:60rpx;
            }
            .icon-shoucang2{
                color: #ff3232;
            }
        }
    }
    .desc {
      font-size: 30rpx;
      padding: 0 20rpx;
      padding-bottom: 20rpx;
      color: #666666;
      font-weight:600;
    }
    &-title {
      font-size: 40rpx;
      font-weight: bold;
      padding: 20rpx 10rpx;
    }
    &-tab {
      height: 100rpx;
      border-top: 1rpx solid #c8d6f3;
      border-bottom: 1rpx solid #c8d6f3;
      .top {
        width: 33.3%;
        height: 50%;
        float: left;
        text-align: center;
      }
      .bottom {
        width: 33.3%;
        height: 50%;
        float: left;
        text-align: center;
      }
    }
    &-basic {
      padding: 20rpx 0;
      border-bottom: 1rpx solid #c8d6f3;
      ul {
        overflow: auto;
        li {
          float: left;
          width: 50%;
          height: 50rpx;
          font-size: 28rpx;
          .left {
            float: left;
            padding-left: 20rpx;
          }
        }
      }
    }
    .Matche {
      overflow: auto;
      padding: 20rpx 0;
      border-bottom: 1rpx solid #c8d6f3;
      &-detail {
        width: 20%;
        height: 120rpx;
        float: left;
        img {
          width: 80rpx;
          height: 80rpx;
          display: block;
          margin: 0 auto;
        }
        p {
          font-size: 24rpx;
          text-align: center;
        }
        .no{
            text-decoration:line-through;
            color: #666666
        }
      }
    }
    .comnunicat {
      border-bottom: 1rpx solid #c8d6f3;
      padding: 20rpx 0;
      &-top {
        display: flex;
        .img {
          width: 100rpx;
          height: 100rpx;
          border-radius: 50%;
          img {
            display: block;
            width: 100%;
            height: 100%;
          }
        }
        .right {
          padding-left: 30rpx;
          &-top {
            height: 50%;
            line-height: 50rpx;
            font-size: 32rpx;
            font-weight: bold;
          }
          &-cet {
            height: 50%;
            line-height: 50rpx;
            font-size: 24rpx;
            display: flex;
            &-right {
              padding-left: 30rpx;
            }
          }
        }
      }
      &-bot {
        margin-top: 20rpx;
        width: 60%;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        background: #5c84e2;
        border-radius: 3rpx;
        p {
          font-size: 28rpx;
          color: #fff;
        }
      }
    }
    .address {
      padding: 20rpx 0;
      .location {
          overflow: hidden;
          height: 40rpx;
          line-height: 40rpx;
        i {
          font-size: 40rpx;
          float: left;
          padding: 0 10rpx;
        }
        p {
          font-size: 24rpx;
          float: left;
        }
      }
    }
  }
}
</style>

