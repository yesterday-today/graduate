<template>
  <div class="index">
    <div class="find">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/busFx.png" @click="fx">
        <ul>
            <li class="begin"><input id="on" type="text" placeholder="输入起点" :value="geton" @input="getGetoff" @focus="getId"></li>
            <div class="line"></div>
            <li class="end"><input id="off" placeholder="输入终点" :value="getoff" @input="getGetoff" @focus="getId"></input></li>
        </ul>
        <img class="search" src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/search.png" @click="search">
    </div>
    <ul v-if="suggestion!=''&&showBol==true" class="list">
        <li v-for="(item,index) in suggestion" :key="index" @click="select(index)">
            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/bus1.png">
            <p>{{item.title}}</p>
        </li>
    </ul>
    <van-toast id="van-toast"/>
  </div>
</template>

<script>
import QQMapWX from '../../../static/js/qqmap-wx-jssdk.js';
import Toast from '../../../dist/wx/static/vant/toast/toast';
const QQMapSDK = new QQMapWX({
  key: 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H'
})
export default {
  data () {
      return{
          getonFz:'',
          geton:'我的位置',
          getoff:'',
          getoffData:{name:'',latitude:0,longitude:0},//下车数据
          getonData:{name:'',latitude:0,longitude:0},//上车数据
          suggestion:[],//更改的地址
          showBol:false,//true显示搜索列表数据
          id:'',//获取点击input的id
      }
  },
  methods:{
      //添加数据到数据库
      addCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('historyLineList').add({
            data:{
                _id:this.geton+this.getoff,
                data:{
                    geton:this.getonData,
                    getoff:this.getoffData,
                },
            },
            success:res=>{
            }
        });
      },
      //获取输入的input文本，调用关键词提示接口
      getGetoff(e){
        this.showBol=true;
        QQMapSDK.getSuggestion({
        //获取输入框值并设置keyword参数
          keyword: e.mp.detail.value, //用户输入的关键词，可设置固定值
          success: res=> {//搜索成功后的回调
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
        },
        fail: error=> {
            // console.error(error);
        },
        });
      },
    //获取点击时input的id，on为起点，off为终点
    getId(e){
        this.id=e.target.id;
    },
    //选择关键列表id到输入框
    select(id){
        let data=this.suggestion[id];
        if(this.id=='on'){
            this.getonData.name=data.title;
            this.getonData.latitude=data.latitude;
            this.getonData.longitude=data.longitude;
            this.geton=this.suggestion[id].title;
        }
        else if(this.id=='off'){
            this.getoffData.name=data.title;
            this.getoffData.latitude=data.latitude;
            this.getoffData.longitude=data.longitude;
            this.getoff=this.suggestion[id].title;
        }
        this.showBol=false;
    },
    search(){
        let plugin = requirePlugin('mapPlugin');
        if(this.geton!=''&&this.getoff!=''){
            this.geton=='我的位置'&&mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&endPoint=' + JSON.stringify(this.getoffData)});
            this.geton!='我的位置'&&mpvue.navigateTo({url:'plugin://mapPlugin/index?key=' + 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H' + '&referer=' + '达人哒' + '&startPoint=' + JSON.stringify(this.getonData)+ '&endPoint=' + JSON.stringify(this.getoffData)});
            this.addCollect();
        }
        else{
            Toast("起终点不能为空");
        }
    },
    fx(){
        this.getonFz=this.geton;
        this.geton=this.getoff;
        this.getoff=this.getonFz;
    },
  }
}
</script>

<style lang="less" scoped>
.index{
    width:90%;
    margin:0 auto;
    .find{
        height:200rpx;
        display: flex;
        border-bottom: 1rpx solid #F2F2F2;
        img{
            width:64rpx;
            height:64rpx;
            padding-top:68rpx;
            display:block;
            .search{
                padding-left: 10rpx;
            }
        }
        ul{
            width:80%;
            height:100%;
            margin:0 auto;
            li{
                width:80%;
                padding-left:10rpx;
                height:100rpx;
                line-height:100rpx;
                font-size:30rpx;
                list-style-type:circle;
                input{
                    width:100%;
                    color:#000000;
                    border:none;
                    height:100rpx;
                }
                
            }
            .line{
                width:100%;
                height:3rpx;
                background:#F2F2F2;
                float:left;
            }
            .begin{
                color:green;
            }
            .end{
                color:red;
            }
        }
    }
    .list{
        position: absolute;
        top: 210rpx;
        background: #fff;
        width: 100%;
        left: 0;
        height: 100%;
        li{
            height: 70rpx;
            line-height: 70rpx;
            display: flex;
            font-size: 30rpx;
            image{
                width: 45rpx;
                height: 45rpx;
                padding: 12rpx;
                display: block;

            }
        }
    }
}
</style>
