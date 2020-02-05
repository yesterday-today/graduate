<template>
  <div class="planDetail">
    <div class="content">
      <div class="plan">
        <span class="left">计划内容(0/60)</span>
      </div>
      <div class="detail clear">
        <input type="text"/>
      </div>
      <div class="time">
        <p class="left">时间</p>
        <p class="right" @click="setTime">{{currentT}}</p>
      </div>
      <div class="repeat" @click="gorepeat">
        <p class="left">重复</p>
        <div class="right">
          <p>{{selectValue}}</p>
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
      <div class="remind" @click="goremind">
        <p class="left">提醒</p>
        <div class="right">
          <p>{{remindValue}}</p>
          <i class="iconfont icon-qianjin"></i>
        </div>
      </div>
      <div class="btn">保存</div>
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
  </div>
</template>

<script>
import repeat from '@/components/plan/repeat'
import remind from '@/components/plan/remind'

export default {
  components:{repeat,remind},
  data(){
    return{
      currentT:'',
      selectBol:false,
      remindBol:false,
      timeBol:false,
      selectValue:'不重复',
      remindValue:'不提醒',
      minHour: 10,
      maxHour: 20,
      minDate: new Date().getTime(),
      maxDate: new Date(2029, 12, 31).getTime(),
      currentDate: new Date().getTime()
    }
  },
  methods:{
    getTime(){
      var date=new Date;
      var year=date.getFullYear()+'-';
      var month=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1)+'-';
      var day=date.getDate()+' ';
      var hour=date.getHours()+':';
	  var i=date.getMinutes();
      i = i < 10 ? ('0' + i ) : i;
      return year+month+day+hour+i;
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
    //设置时间
    onInput(event) {
        this.currentDate= event.mp.detail
        console.log(this.currentDate)
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
    }
  },
  mounted(){
    this.currentT=this.getTime();
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