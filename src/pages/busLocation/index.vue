<template>
<div class="location">
    <div class="index">
      <p class="title">{{lineinfo.sta_sta}}-{{lineinfo.end_sta}}</p>
      <div class="other">
        <p class="price">票价:<span>{{lineinfo.bus_money}}</span></p>
      </div>
      <div class="time">
        <ul style="list-style:circle">
          <li class="begin"><span>首班:{{lineinfo.fir_time}}</span></li>
          <li class="end"><span>末班:{{lineinfo.end_time}}</span></li>
        </ul>
      </div>
    <card :beginRemind="beginRemind" :distanceNum="distanceNum" :station="station"></card>
    <site :station="station" :buses="buses" :beginRemind="beginRemind"></site>
  </div>
  <div class="bot">
    <div class="left" @click="Collect">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/collectBus.png" alt="" v-if="collect==false">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/collectBus1.png" alt="" v-if="collect==true">
        <p>{{collect==false?'收藏':'已收藏'}}</p>
    </div>
    <div class="cet" @click="Refersh">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/refershBus.png" alt="">
    </div>
    <div class="right" @click="Remind">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/remindBus.png" alt="" v-if="remindBol==false">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/remindB1.png" alt="" v-if="remindBol==true">
        <p>公交提醒</p>
    </div>
  </div>
</div>
</template>

<script>
import site from '@/components/bus/station'
import card from '@/components/bus/busCard'

export default {
  components:{site,card},
  data () {
      return{
          busLine:'',//公交号
          lineId:'',//路线ID
          lineNum:'',//路线编号
          stanName:'',//路线名称
          lineinfo:{},//公交信息
          station:[],//站点
          remindStation:[],//提醒站点(由于二级标签的属性是subname，所以进行替换)
          buses:'',//到站信息
          beginRemind:10,//站点提醒
          distanceNum:[],//站点距离
          cityid:82,
          timer:null,
          collect:false,
          remindBol:true,
      }
  },
  methods:{
    getCity(){
        wx.request({
            url:'http://api.dwmm136.cn/z_busapi/BusApi.php',
            data:{
                optype:'city',
                uname:'18959913030'
            },
            success:res=>{
                console.log(res)
            }
        })
    },
    getLine(){
        console.log('cityid:'+this.cityid)
        wx.request({
            url:'http://api.dwmm136.cn/z_busapi/BusApi.php',
               data:{
                   optype:'luxian',
                   uname:18959913030,
                   cityid:this.cityid,
                   keywords:this.busLine,
                   keySecret:'b2ba044116e269df6bb75dbb457b8b07'
               },
            success:res=>{
                console.log(res)
                if(res.data.return_code=='ok'){
                    this.lineId=res.data.returl_list[0].bus_linestrid;
                    this.lineNum=res.data.returl_list[0].bus_linenum;
                    this.stanName=res.data.returl_list[0].bus_staname;
                    this.getLineID(this.lineId,this.lineNum,this.stanName)
                }
            }
        })
    },
    getLineID(id,num,name){
        wx.request({
            url:'http://api.dwmm136.cn/z_busapi/BusApi.php',
               data:{
                  optype:'rtbus',
                  uname:18959913030,
                  cityid:this.cityid,
                  bus_linestrid:id,
                  bus_linenum:num,
                  bus_staname:name,
                  keySecret:'df5f4d8d3d24d44cd0e32e1d42d4f73d'
               },
            success:res=>{
                if(res.data.return_code=='ok'){
                    this.lineinfo=res.data.returl_list.lineinfo;
                    this.station=res.data.returl_list.stations;
                    this.buses=res.data.returl_list.buses;
                    this.count(this.buses);
                }
            }
        })
    },
    //计算还有几站
    count(buses){
        for(var i=0; i<buses.length; i++){
            if(buses[i].dis_stat-1<=this.beginRemind){
                this.distanceNum.push(buses[i])
            }
        }
        this.distanceNum=this.distanceNum.reverse();
    },
    //判断是否设置了提醒
    warn(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('remindCollect').where({
            _id:this.cityid+this.busLine
        }).get({
            success:res=>{
                console.log(res)
                if(res.data.length!=0){
                    this.remindBol=true;
                    var lineName=res.data[0].data.name.lineId;//获取到站提醒站
                    var lineNum=res.data[0].data.lineNum;
                    this.checkIsNum(lineName,lineNum)
                }else{
                    this.remindBol=false;
                }
            }
        })
    },
    //将中文转成数字
    checkIsNum(a,str){
        let ChineseItem=['即将到站','一站','两站','三站','四站','五站','六站'];
        let num = [0,1,2,3,4,5,6];
        for(let i =0;i<ChineseItem.length;i++){
            if(str==ChineseItem[i]){
                let lineNum=num[i];
                this.beginRemind=Number(a)-Number(lineNum);
            }
        }
        console.log(this.beginRemind);

    },
    //判断是否收藏了
    collectBol(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('busCollect').where({
            _id:this.cityid+this.busLine,
            _openid:this.globalData.openid,
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
    Collect(){
    if(this.collect==false){
        this.collect=true;
        this.addCollect();
    }else{
        this.collect=false;
        this.removeCollect();
        }
    },
    //添加数据到数据库
    addCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('busCollect').add({
            data:{
                _id:this.cityid+this.busLine,
                data:{
                    lineNum:this.lineNum,
                    geton:this.lineinfo.sta_sta,
                    getoff:this.lineinfo.end_sta,
                    stationNum:this.station.length,
                }
            },
            success:res=>{
                console.log(res);
            }
        });
    },
    //移除数据
    removeCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("busCollect").doc(this.cityid+this.busLine).remove({
            success:res=>{
                console.log(res)
            },
            fail:res=>{
                console.log(res);
            }
        })
    },
    //点击进行刷新
    Refersh(){
        this.getLineID();
        console.log('刷新')
    },
    //设置为公交提醒
    Remind(){
        console.log(this.lineNum+this.cityid)
        this.remindStation=this.station.map(function(item){
            return{
                subname:item.bus_staname
            }
        });
        mpvue.navigateTo({url:'../addRemind/main?id='+this.cityid+this.lineNum
                +'&lineName='+this.lineNum+'&remindBol'+this.remindBol+'&stations='+JSON.stringify(this.remindStation)});
    }
  },
  mounted(){
      this.getCity();
      this.getLine();
      this.collectBol();
      this.warn();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    this.busLine=options.busLine;
    this.cityid=options.cityId;
  }
}
</script>

<style lang="less" scoped>
.location{
    .bot{
        width: 100%;
        display:flex;
        height: 100rpx;
        position:fixed;
        bottom: 0;
        background: #fffb02;
        .left,.right{
            width: 43%;
            img{
                margin-left: 50rpx;
                margin-right: 10rpx;
            }
        }
        .cet{
            width: 14%;
            border-radius:50%;
            background: #0e8ae8;
            img{
                padding: 18rpx 17rpx;
            }
        }
        img{
            width: 70rpx;
            height: 70rpx;
            display: block;
            float: left;
            padding: 20rpx 0;
        }
        p{
            float: left;
            line-height: 100rpx;
            color: #0e8ae8;
            font-weight: bold;
        }
    }
    .index{
        width:90%;
        margin:0 auto;
        .title{
            font-size:35rpx;
            text-align:center;
            color:#0e8ae8;
            line-height: 70rpx;
        }
        .other{
            display: inline;
            font-size:32rpx;
            text-align: center;
            span{
                color:#f70404;
            }
        }
        .time{
            box-sizing:border-box;
            width:100%;
            height:60rpx;
            line-height:60rpx;
            padding-top:10rpx;
            ul{
                width:50%;
                height:100%;
                margin:0 auto;
                li{
                    font-size:30rpx;
                    float:left;
                    width:50%;
                    
                }
                span{
                    color:#000;
                }
                .begin{
                    color:blue;
                }
                .end{
                    color:red;
                }
            }
            ul li{
                list-style-type: circle !important;
                list-style-position:inside;
            }
        }
    }
}
</style>
