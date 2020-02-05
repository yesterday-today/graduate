<template>
  <div class="index">
      <div class="index-top">
          <div class="tab" v-for="(item,index) in tabList" :key="index" :class="{'bk':index==selectIndex}" @click="select(index)">
            <img :src="item.img"></img>
            <p>{{item.text}}</p>
          </div>
      </div>
      <line v-if="lineBol==true" :routes="routes" :message="message" @goMap="goMap"></line>
    <div class="map">
        <map id="myMap"
            v-if="mapBol==true"
            style="width: 100%; height: 300px;"
            :longitude="longitude" :latitude="latitude"
            scale='15'
            :polyline="polyline"
            show-location>
        </map>
    </div>
    <lineDetail v-if="mapBol==true" :lineDetail="lineDetail" :mode="mode" @goMap="goMap"></lineDetail>
  </div>
</template>

<script>
import line from '@/components/bus/line'
import lineDetail from '@/components/bus/lineDetail'
import QQMapWX from '../../../static/js/qqmap-wx-jssdk.js'
const QQMapSDK = new QQMapWX({
  key: 'D4JBZ-4ZQWD-GGM4B-HS3XZ-VQJYE-7CB6H'
})
export default {
  components:{line,lineDetail},
  data() {
    return {
        formLocation:{latitude:24.479162,longitude:118.181061},//默认为居住的地址（岭兜二里附近）
        toLocation:{latitude:0,longitude:0},
        tabList:[{text:'公交',img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/bus1.png"},
        {text:'步行',img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foot.png"},
        {text:'自行车',img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/bicycle.png"},
        {text:'驾车',img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/car.png"}],
        selectIndex:0,
        selectValue:0,
        mode:'transit',//默认为公交路线
        routes:'',//路线值
        longitude:0,
        latitude:0,
        polyline:'',
        address:'',
        message:'起终点距离过近',//报错信息
        lineBol:true,
        lineDetail:[],//所选路线的详情
        mapBol:false,//是否显示路线规划地图
    }
  },
  methods: {
    goMap(index){
        this.selectValue=index;
        this.lineBol=false;
        this.mapBol=true;
        this.submit(this.mode)
    },
    query(){
        QQMapSDK.geocoder({
            address:this.address,
            success:res=>{
                console.log(res)
                let {lat,lng}=res.result.location;
                this.toLocation.latitude=lat;
                this.toLocation.longitude=lng;
                if(res.status==0){
                    this.submit(this.mode);
                }
            },
            fail: function (error) {
                this.message=error.message;
            },
        })
    },
    submit(mode){
        QQMapSDK.direction({
            mode:mode,
            from:this.formLocation,
            to:this.toLocation,
            success:res=>{
                console.log(mode)
                if(res.status==0){
                    this.routes=res.result.routes;
                    this.lineDetail=res.result.routes[this.selectValue];
                }
                //返回地图规划离线--公交路线
                if(mode=='transit'){
                    var ret = res.result.routes[this.selectValue];
                    var count = ret.steps.length;
                    var pl = [];
                    var coors = [];
                    // //获取各个步骤的polyline
                    for(var i = 0; i < count; i++) {
                        if (ret.steps[i].mode == 'WALKING' && ret.steps[i].polyline) {
                            coors.push(ret.steps[i].polyline);
                        }
                        if (ret.steps[i].mode == 'TRANSIT' && ret.steps[i].lines[0].polyline) {
                            coors.push(ret.steps[i].lines[0].polyline);
                        }
                    }
                    // //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                    var kr = 1000000;
                    for (var i = 0 ; i < coors.length; i++){
                        for (var j = 2; j < coors[i].length; j++) {
                            coors[i][j] = Number(coors[i][j - 2]) + Number(coors[i][j]) / kr;
                        }
                    }
                    //定义新数组，将coors中的数组合并为一个数组
                    var coorsArr = [];
                    for (var i = 0 ; i < coors.length; i ++){
                    coorsArr = coorsArr.concat(coors[i]);
                    }
                    //将解压后的坐标放入点串数组pl中
                    for (var i = 0; i < coorsArr.length; i += 2) {
                        pl.push({ latitude: coorsArr[i], longitude: coorsArr[i + 1] })
                    }
                    //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                    this.latitude=pl[0].latitude,
                    this.longitude=pl[0].longitude,
                    this.polyline=[{
                        points: pl,
                        color: '#FF0000DD',
                        width: 4
                    }]
                }
                else{ //返回地图规划离线--驾车、步行、骑行路线规划
                    var ret = res;
                    var coors = ret.result.routes[0].polyline, pl = [];
                    //坐标解压（返回的点串坐标，通过前向差分进行压缩）
                    var kr = 1000000;
                    for (var i = 2; i < coors.length; i++) {
                    coors[i] = Number(coors[i - 2]) + Number(coors[i]) / kr;
                    }
                    //将解压后的坐标放入点串数组pl中
                    for (var i = 0; i < coors.length; i += 2) {
                    pl.push({ latitude: coors[i], longitude: coors[i + 1] })
                    }
                    //设置polyline属性，将路线显示出来,将解压坐标第一个数据作为起点
                    this.latitude=pl[0].latitude,
                    this.longitude=pl[0].longitude,
                    this.polyline=[{
                        points: pl,
                        color: '#FF0000DD',
                        width: 4
                    }]
                }
            },
            fail: function (error) {
                this.message=error.message;
                console.log(this.message)
            },
        })
    },
    select(index){
        this.selectIndex=index;
        this.lineBol=true;//当跳转到地图时，想在查看路线，则点击tab栏进行返回
        this.mapBol=false;
        //选择到达交通工具
        this.selectIndex==0?this.mode='transit':this.selectIndex==1?
        this.mode='walking':this.selectIndex==2?this.mode='bicycling':this.mode='driving';
        this.submit(this.mode)
    }
  },
  mounted(){
      this.query();
  },
  onLoad(options){
      Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
      this.address=options.address;
  }
}
</script>

<style lang="less" scoped>
.index{
    &-top{
        width:600rpx;
        height:100rpx;
        .tab{
            width:150rpx;
            float: left;
            img{
                width:50rpx;
                height: 50rpx;
                display:block;
                margin: 0 auto;
            }
            p{
                font-size:28rpx;
                text-align:center;
            }
        }
        .bk{
            font-weight: bold;
        }
    }
}
</style>