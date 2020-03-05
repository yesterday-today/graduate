<template>
  <div class="index">
      <remindList :data="collectData"></remindList>
      <div class="separate"></div>
      <div class="remind">
        <van-cell title="上车站名" :value="name" @click="go($event)"/>
        <van-cell title="提醒站距" :value="nums" @click="go($event)"/>
        <van-cell title="重复" :value="repeat" @click="go($event)"/>
        <van-cell title="开始时间" :value="beginTime" @click="go($event)"/>
        <van-cell title="结束时间" :value="endTime" @click="go($event)"/>
        <van-cell title="提醒多辆">
            <van-switch :checked="checked" @change="onChange" size="30rpx"/>
        </van-cell>
      </div>
      <van-action-sheet :show="show" :actions="actionsValue" :title="title" @close="onClose" @select="onSelect">
      </van-action-sheet>
      <div class="time" v-if="timeBol==true">
          <div class="wrap">

              <van-datetime-picker type="time"
            :value="currentDate"
            :min-hour="minHour"
            :max-hour="maxHour"
            @confirm="confirm"
            @cancel="cancel"
            />
          </div>
      </div>
      <div class="saveBtn" @click="save">
          保存
      </div>
      <van-toast id="van-toast"/>
  </div>
</template>

<script>
import remindList from '@/components/bus/remindList'
import Toast from '../../../static/vant/toast/toast';
export default {
    components:{remindList},
  data () {
      return{
          show:false,
          checked:false,
          timeBol:false,
          remindBol:false,
          currentDate: '12:00',
          beginTime:'12:00',//开始时间
          endTime:'12:10',//结束时间
          collectData:[],//提醒的数组
          minHour: 10,
          maxHour: 20,
          lineName:'',//公交站名
          station:'',//车站名
          cityid:'',//城市id
          id:'',//从remindlist获取到的id,
          title:'',
          actionsValue:'',
          tabId:0,
          nums:'即将到站',
          remindNum:0,//转成中文
          repeat:'工作日',
          name:'',//提醒站名
          nameId:'',//提醒站名的id
          actions: [
              [{subname: '即将到站'},{subname: '一站'},{subname: '两站'},{subname: '三站'},
              {subname: '四站'},{subname: '五站'},{subname: '六站'}],
              [{subname: '周一'},{subname: '周二'},{subname: '周三'},{subname: '周四'},
              {subname: '周五'},{subname: '周六'},{subname: '周日'}]
            ]
      }
  },

  methods: {
      // 连接数据库
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        if(this.id==''){
            db.collection('remindCollect').where({
            _openid:this.globalData.openid,
            _id:this.id
            }).get({
                success:res=>{
                    console.log(res)
                    this.collectData=res.data;
                    var data=res.data[0].data;
                    this.nums=data.lineNum;
                    this.name=data.name.lineName;
                    this.repeat=data.repeat;
                    this.beginTime=data.beginTime;
                    this.endTime=data.endTime;
                    this.checked=data.remind;
                }
            });
        }
        else{
            db.collection('remindCollect').where({
                _openid:this.globalData.openid,
                _id:this.id
            }).get({
                success:res=>{
                    this.collectData=res.data;
                    var data=res.data[0].data;
                    this.nums=data.lineNum;
                    this.name=data.name.lineName;
                    this.repeat=data.repeat;
                    this.beginTime=data.beginTime;
                    this.endTime=data.endTime;
                    this.checked=data.remind;
                    this.station=data.stations;
                }
            });
        }
    },
      go(e){
          this.tabId=e.currentTarget.dataset.eventid;
          this.title=this.tabId==0?'提醒站名':this.tabId==1?'提醒战距':'重复';
          this.actionsValue=e.currentTarget.dataset.eventid==0?
          this.show=true&&this.station:e.currentTarget.dataset.eventid==1?
          this.show=true&&this.actions[0]:e.currentTarget.dataset.eventid==2?
          this.show=true&&this.actions[1]:e.currentTarget.dataset.eventid==3?
          this.timeBol=true:e.currentTarget.dataset.eventid==4?
          this.timeBol=true:'';
      },
      onClose(){
          this.show=false;
      },
      onSelect(event){
          if(this.tabId==0){
              this.name=event.mp.detail.subname;
              //返回index，保存到数据库
              for(let i in this.station){
                  if(this.station[i].subname==this.name){
                      this.nameId=i;
                      console.log("存在下标为："+i)
                  }
              }
          }
          else if(this.tabId==1){
              this.nums=event.mp.detail.subname;
          }
          else if(this.tabId=2){
              this.repeat=event.mp.detail.subname;
          }
      },
       onChange(){
        this.checked=!this.checked;
      },
      //确定时间
      confirm(e){
          this.timeBol=false;
          if(this.tabId==3){
              this.beginTime=e.mp.detail;
          }
          else{
              this.endTime=e.mp.detail;
          }
      },
      //取消
      cancel(){
        this.timeBol=true;
      },
      //将中文转成数字
      checkIsNum(str){
        let ChineseItem=['即将到站','一站','两站','三站','四站','五站','六站'];
        let num = [0,1,2,3,4,5,6];
        for(let i =0;i<ChineseItem.length;i++){
            if(str==ChineseItem[i]){
                this.remindNum=num[i];
            }
        }
      },
      save(){
        this.checkIsNum(this.nums);
        if(this.beginTime==this.endTime){
            Toast('开始时间与结束时间相同');
        }
        else if(this.lineName==''&&this.nums==''
          &&this.repeat==''&&this.beginTime==''
          &&this.endTime==''){
            Toast('您未全填写');
        }
        else if(this.station[this.nameId-this.remindNum]==this.station[0]){
            Toast('首站，您可前往等待');
        }
        else if(this.nameId<this.remindNum){
            Toast('站距太大');
        }
        else{
          Toast('保存成功');
          const db = wx.cloud.database({env: 'ybb-901hf'})
          db.collection('remindCollect').add({
            data:{
                _id:this.id,
                data:{
                    busName:this.lineName,
                    name:{lineName:this.name,lineId:this.nameId},
                    lineNum:this.nums,
                    repeat:this.repeat,
                    beginTime:this.beginTime,
                    endTime:this.endTime,
                    remind:this.checked,
                    stations:this.station
                }
            },
            success:res=>{
                // mpvue.navigateTo({url:'../busLocation/main?cityId='+this.cityid+'&busLine='+this.lineName})
            }
          });
        }
      }
  },
  mounted(){
      this.ajx();
  },
  onLoad(options){
      console.log(options.stations)
      if(options.stations!=[]){
        this.station=JSON.parse(options.stations);
      }
      this.lineName=options.lineName;
      this.remindBol=options.remindBol;
      this.id=options.id;
  }
}
</script>

<style lang="less" scoped>
.index{
    .separate{
        width:100%;
        height:20rpx;
        background: #f2f2f2;
    }
    .time{
        height: 100%;
        width: 100%;
        background:rgba(0,0,0,.4);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 222;
        .wrap{
            width: 100%;
            position: fixed;
            bottom: 0;
        }
    }
    .saveBtn{
        width:500rpx;
        height:80rpx;
        margin:0 auto;
        border-radius:40rpx;
        margin-top:150rpx;
        line-height:80rpx;
        text-align:center;
        background:#0955ec;
        color:#ffffff;
        font-size:40rpx;
    }
}
</style>
