<template>
  <div class="location">
    <div class="map">
      <map id="myMap"
        :markers="markers"
        style="width: 100%; height: 300px;"
        :longitude="longitude" :latitude="latitude"
        scale='13'
        show-location>
      </map>
    </div>
    <div class="place">
        <i class="iconfont icon-dizhi"></i>
        <div class="address">
            {{detailValue}}
        </div>
        <i class="iconfont icon-bianjimian"></i>
    </div>
    <div class="modify">
        <div class="input">
            <input style="background: #fff;" @input="getsuggest" :value="backfill.title"></input>
        </div>
        <ul v-if="suggestion!=''&&showBol==true">
            <li v-for="(item,index) in suggestion" :key="index" @click="select(index)">
                <p>{{item.title}}</p>
            </li>
        </ul>
        <div class="street"><span>街道:</span><input @input="getstreet" :value="street"></input></div>
        <div class="save" @click="save">
            保存地址
        </div>
    </div>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import QQMapWX from '../../../static/js/qqmap-wx-jssdk.js';
import Toast from '../../../static/vant/toast/toast';

const QQMapSDK = new QQMapWX({
  key: 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H'
})
export default {
  data() {
    return {
        addressList:{
            province:'福建',
            city:'厦门',
            area:'思明',
            location:'莲前'
        },
        suggestion:[],//更改的地址
        backfill:'',//回调数据
        showBol:false,//true显示数据
        province:'福建省',//省份值
        city:'',//城市值
        area:'',//地区值
        street:'不限',//街道值
        detailValue:'',//详细地址
        latitude:0,
        longitude:0,
        markers:[{id:0,title:'',latitude:0,longitude:0, iconPath:'',
        width:20,height:20}]
    }
  },
  methods: {
    // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').where({
            _openid:this.globalData.openid
        }).get({
            success:res=>{
                console.log(res)
                this.city=res.data[0].city;
                this.area=res.data[0].district;
                this.street=res.data[0].street;
                this.detailValue=res.data[0].title;
                this.query(this.province,this.city,this.area,this.street)
            }
        });
    },
    query(province,city,area,street){
      QQMapSDK.geocoder({
        address:province+city+area+street,
        success:res=>{
            let {lat,lng}=res.result.location;
            this.latitude=lat;
            this.longitude=lng;
            this.markers.latitude=lat;
            this.markers.longitude=lng;
            this.markers.iconPath='cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/location.png',//图标路径
            this.markers.title=res.result.title;
        },
        fail: function (error) {
            this.message=error.message;
        },
      })
    },
    //选择关键词到输入框
    select(id){
        this.backfill=this.suggestion[id];
        this.showBol=false;
    },
    //保存地址到数据库中
    save(){
        console.log(this.backfill)
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').add({
            data:{
                _id:this.globalData.openid,
                province:this.province,
                city:this.backfill.city,
                district:this.backfill.district.substring(0,2),
                title:this.backfill.title,
                street:this.street,
            },
            success:res=>{
                this.addressList.city=this.backfill.city.substring(0, 2);
                this.addressList.area=this.backfill.district.substring(0, 2);
                this.detailValue=this.backfill.title;
                Toast('保存成功');
            },
            fail:res=>{
                console.log(res)
            }
        });
    },
    //获取街道值
    getstreet(e){
        this.street=e.mp.detail.value;
    },
    //触发关键词输入提示事件
    getsuggest(e) {
        //调用关键词提示接口
        if(e.mp.detail.value!=this.backfill){
            this.showBol=true;
        }
        QQMapSDK.getSuggestion({
        //获取输入框值并设置keyword参数
          keyword: e.mp.detail.value, //用户输入的关键词，可设置固定值
          success: res=> {//搜索成功后的回调
          console.log(res)
            var sug = [];
            for (var i = 0; i < res.data.length; i++) {
                sug.push({ // 获取返回结果，放到sug数组中
                    title: res.data[i].title,
                    id: res.data[i].id,
                    addr: res.data[i].address,
                    city: res.data[i].city,
                    district: res.data[i].district,
                    latitude: res.data[i].location.lat,
                    longitude: res.data[i].location.lng
                });
            }
            this.suggestion=sug;
            console.log(this.suggestion)
        },
        fail: error=> {
            // console.error(error);
        },
        });
    }
  },
  mounted(){
      this.ajx();
  }
}
</script>

<style lang="less" scoped>
.location{
    position: relative;
    .map{
        width: 100%;
    }
    .place{
        width: 650rpx;
        height: 120rpx;
        line-height: 120rpx;
        border-radius:30rpx;
        position: absolute;
        bottom: 100rpx;
        left: 50%;
        transform: translate(-50%,0);
        background: #ffffff;
        padding:0 20rpx;
        .icon-dizhi{
            color: #124ef3;
            float: left;
        }
        .icon-bianjimian{
            color: #f51f1f;
            float: right;
        }
        .address{
            float: left;
            padding: 0 25rpx;
        }
    }
    .modify{
        width: 650rpx;
        height: 400rpx;
        border-radius:30rpx;
        position: fixed;
        bottom: 150rpx;
        left: 50%;
        transform: translate(-50%,0);
        background: #cadaf8;
        padding:0 20rpx;
        font-size: 30rpx;
        .input{
            padding-top: 30rpx;
            box-shadow: 10px 10px 5px #888888;
        }
        .street{
            margin-top: 50rpx;
            display: flex;
            height: 80rpx;
            line-height: 80rpx;
            font-size: 32rpx;
            span{
                font-weight: 600;
            }
            input{
                margin: 17rpx 5rpx;
                border-bottom: 1rpx solid #000;
                padding-left: 10rpx;
            }

        }
        ul{
            height: 300rpx;
            z-index: 33333;
            background: #fff;
            overflow: scroll;
            border-top: 1rpx solid #564777;
            li{
                width: 100%;
                height:40rpx;
                line-height: 40rpx;
            }
        }
        .save{
            width: 80%;
            height: 100rpx;
            line-height: 100rpx;
            text-align: center;
            color: #fff;
            background: blue;
            border-radius: 30rpx;
            position: fixed;
            left: 50%;
            transform: translate(-50%,0);
            bottom: 50rpx;
            z-index: -1;
        }
    }

}
</style>