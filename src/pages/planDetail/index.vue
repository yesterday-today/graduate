<template>
  <div class="planDetail">
    <div class="content">
      <div class="plan">
        <span class="left">计划内容(0/60)</span>
      </div>
      <div class="detail clear">
        <input type="text" @input="input" :value="thing"/>
      </div>
      <div class="time">
        <p class="left">时间</p>
        <p class="right" @click="setTime">{{currentT}}</p>
      </div>
      <div class="repeat" @click="gorepeat">
        <p class="left">重复</p>
        <div class="right">
          <p>{{selectValue==''?'不重复':selectValue}}</p>
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
      <div class="remind" @click="goremind">
        <p class="left">提醒</p>
        <div class="right">
          <p>{{remindValue==''?'当天提醒':remindValue}}</p>
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
      <div class="btn" @click="save">保存</div>
    </div>
    <div class="picker" v-if="timeBol==true">
        <div class="wrap">
            <van-datetime-picker
                type="datetime"
                :value="currentDate"
                :min-date="minDate"
                :max-date="maxDate"
                @input="onInput"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
        </div>
    </div>
    <repeat @change="change" v-if="selectBol==true"></repeat>
    <remind @remind="remind" v-if="remindBol==true"></remind>
    <van-toast id="van-toast"/>

  </div>
</template>

<script>
import repeat from '@/components/plan/repeat'
import remind from '@/components/plan/remind'
import Toast from '../../../static/vant/toast/toast';

export default {
  components:{repeat,remind},
  data(){
    return{
      currentT:'',
      selectBol:false,
      remindBol:false,
      timeBol:false,
      selectValue:'不重复',
      remindValue:'当天提醒',
      thing:'',//事件时间
      minHour: 10,
      maxHour: 20,
      minDate: new Date().getTime(),
      maxDate: new Date(2029, 12, 31).getTime(),
      currentDate: new Date().getTime(),
      year:'',//获取年，
      month:'',//获取月份，
      day:'',//获取天
      planTxt:[],//当天数据
      planData:[],//获取收据
    }
  },
  methods:{
    //保存到数据库
    save(){
        if(this.thing!=''&&this.currentT!=''&&this.selectValue!=''&&this.remindValue!=''){
            Toast("正在保存中，请稍后");
            this.updateData();
        }
        else{
            Toast("不能为空，请重新填写")
        }
    },
    //修改数据库
    updateData(){
      this.planData.data[this.day-1].thing=this.thing;
      this.planData.data[this.day-1].time=this.currentT;
      this.planData.data[this.day-1].selectValue=this.selectValue;
      this.planData.data[this.day-1].remindValue=this.remindValue;
      this.$set(this.planData,this.day,
      {thing:this.thing,time:this.currentT,
      selectValue:this.selectValue,remindValue:this.remindValue});
      var id=this.globalData.openid+this.month;
      const db = wx.cloud.database({env: 'ybb-901hf'})
      db.collection('plan').doc(id).update({
        data:{
            data:this.planData.data
        },
        success:res=>{
            console.log(res);
            //成功则跳转到计划列表
            mpvue.navigateTo({url:'../plan/main'});
        },
        fail:res=>{
            console.log(res)
        }
      });
    },
    //判断是否有数据，获取数据
    getData(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('plan').where({
            _id:this.globalData.openid+this.month
        }).get({
            success:res=>{
                var data=res.data[0].data;
                var num=Number(this.day)-1
                if(data[num].thing!=''){
                    this.planData=res.data[0];
                    this.planTxt=res.data[0].data[num];
                    this.thing=this.planTxt.thing;
                    this.time=this.planTxt.time;
                    this.remindValue=this.planTxt.remindValue;
                    this.selectValue=this.planTxt.selectValue;
                }
            },
            fail:res=>{
                console.log(res)
            }
        })
    },
    //获取输入框文本
    input(e){
        this.thing=e.mp.detail.value;
    },
    //设置时间
    onInput(event) {
        this.currentDate= event.mp.detail;
    },
    //确认时间
    onConfirm(event){
        this.currentDate= event.mp.detail
        this.timeBol=false;
        console.log(this.toTime(this.currentDate));
    },
    //取消时间
    onCancel(){
        this.timeBol=false;
    },
    //设置提醒时间
    setTime(){
        this.timeBol=true;
    },
    //选择重复次数
    gorepeat(){
      this.selectBol=true;
    },
    //选择提醒方式
    goremind(){
      this.remindBol=true;
    },
    //重复
    change(val){
      setTimeout(()=>{
        this.selectBol=false;
      },700);
      this.selectValue=val;
    },
    //提醒
    remind(val){
      setTimeout(()=>{
        this.remindBol=false;
      },700);
      this.remindValue=val;
    },
    //时间戳转换
    toTime(val){
        var date=new Date(parseInt(val));
        var year=date.getFullYear()+'-';
        var month=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-';
        var day=date.getDate()+' ';
        var hour=date.getHours()+':';
        var minute=date.getMinutes();
        this.currentT=year+month+day+hour+minute;
    },
  },
  mounted(){
      this.getData();
      wx.setNavigationBarTitle({title:this.month+'月'+this.day+'日'})
  },
  onLoad(options){
      Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
      this.currentT=options.year+'-'+options.month+'-'+options.day+' '+'08:00';
      this.year=options.year;
      this.month=options.month;
      this.day=options.day;
  }
}
</script>

<style lang="less" scoped>
.planDetail{
  width:100%;
  height:100%;
  .content{
    .plan,.time{
      padding:0 20rpx;
      height:80rpx;
      background:#f3f7ff;
      font-size:28rpx;
      .left{
        float:left;
        line-height:80rpx;
      }
      .right{
        font-size:24rpx;
        padding:4rpx 20rpx;
        float:right;
        background:#FFFFFF;
        border:1rpx solid #c8d6f3;
        border-radius:20rpx;
        margin-top:16rpx;
      }
    }
    .detail{
        height:80rpx;
        border:1rpx solid #c8d6f3;
        background:#ffffff;
            input{
                padding:0 20rpx;
                height:80rpx;
                font-size:32rpx;
                border:none;
                display:block;
            }
    }
    .repeat,.remind{
        height:80rpx;
        line-height:80rpx;
        font-size:28rpx;
        padding:0 20rpx;
        border-bottom:1rpx solid gainsboro;
        .left{
            float:left;	
        }
        .right{
            float:right;
            p{
                float:left;
            }
            i{
                float:right;
                color:gainsboro;
            }
        }
    }
  }
  .picker{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    position:fixed;
    top:0;
    left:0;
    z-index:13;
    .wrap{
        width: 100%;
        position:absolute;
        bottom: 0;
    }
  }
  .btn{
    width:500rpx;
    height:80rpx;
    margin:0 auto;
    border-radius:40rpx;
    margin-top:200rpx;
    line-height:80rpx;
    text-align:center;
    background:#c8d6f3;
    color:#ffffff;
    font-size:40rpx;
  }
}
</style>