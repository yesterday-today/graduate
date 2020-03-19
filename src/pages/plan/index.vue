<template>
  <div class="plan">
    <ul>
      <li v-for="(item,index) in planData" :key="index" @click="goDetail(index)">
        <span>{{index+1}}</span>
        <span v-if="(weeks+index+1)%7==0">周日</span>
        <span v-if="(weeks+index+1)%7==1">周一</span>
        <span v-if="(weeks+index+1)%7==2">周二</span>
        <span v-if="(weeks+index+1)%7==3">周三</span>
        <span v-if="(weeks+index+1)%7==4">周四</span>
        <span v-if="(weeks+index+1)%7==5">周五</span>
        <span v-if="(weeks+index+1)%7==6">周六</span>
        <div class="show">
            <i class="iconfont icon-naozhong" v-if="item.thing!=''"></i>
            <span class="detail" :class="item.thing!=''?'active':''">
                {{item.thing}}
            </span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
        weeks:'',//获取今天周几
        year:'',//年份
        month:'',//月份
        today:'',//获取今天号数
        countDay:'',//获取天数
        id:0,
        day:"14",
        planData:[],//当月的数据
    }
  },
  methods: {
    //调用计划提醒模版
    remind(thing,time){
         wx.cloud.callFunction({
            name:'planRemind',
            data:{
                thing:thing,
                time:time,
             },
            success:res=>{
                console.log("remind",res)
            },
            fail:res=>{
                console.log(res)
            }
         })
    },
    getRemind(){
        //获取到今天的数据，则调用计划提醒模版
        if(this.planData[this.today-1].thing!=''){
            this.remind(this.planData[this.today-1].thing,this.planData[this.today-1].time);
        }
    },
    //添加月份数据，创建数组集合
    create(count){
        for(let i=0;i<count;i++){
            this.planData.push({'time':'',
                            'thing':'',
                            'selectValue':'',
                            'remindValue':''});
        }
        this.addData();
    },
    //添加计划到数据库
    addData(){
      const db = wx.cloud.database({env: 'ybb-901hf'})
      db.collection('plan').add({
        data:{
            _id:this.globalData.openid+this.month,
            month:this.month,
            data:this.planData
        },
        success:res=>{
            console.log('添加成功');
        }
      });
    },
    getData(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        db.collection('plan').where({
            _id:this.globalData.openid+this.month
        }).get({
            success:res=>{
                if(res.data[0].month==this.month){
                    this.planData=res.data[0].data;
                    this.getRemind();
                }
            }
        })
    },
    getTime(){
      var date=new Date;
      this.year=date.getFullYear();
      this.month=(date.getMonth()+1<10?'0'+(date.getMonth()+1):date.getMonth()+1);
      this.today=date.getDate();
      this.countDay=this.getDate(this.year,this.month);
      this.weeks=this.getWeek(this.year,this.month,this.day);
      this.create(this.countDay);
      this.getData();//天数列表显示后获取数据
      wx.setNavigationBarTitle({title:this.month+'月'});
    },
    getHour(){
      var date=new Date;
      var hour=date.getHours()+':';
      var i=date.getMinutes();
      i = i < 10 ? ('0' + i ) : i;
      return hour+i;
    },
    //获取天数
    getDate(year,month){
        var d=new Date(year,month,0);
        var day=d.getDate();
        return day;
    },
    //获取周几
    getWeek(year,month,day){
        var d=new Date();
        d.setFullYear(year,month-1,day);
        var week = d.getDay();
        return week;
        console.log(week)
    },
    //跳转到计划单详情页
    goDetail(index){
      this.id=index;
      var day=Number(this.id+1)<10?'0'+Number(this.id+1):Number(this.id+1)
      mpvue.navigateTo({url:'../planDetail/main?id='+this.id+'&year='+this.year+'&month='+this.month+'&day='+day});
    },
  },
  onShow(){
    this.getTime();
  },
  mounted(){
    
  }
};
</script>

<style lang="less" scoped>
.plan{
    background:#f7f7f8;
  ul{ 
    li{
      height:70rpx;
      line-height:70rpx;
      padding:0 20rpx;
      font-size:28rpx;
      border-bottom:1rpx solid gainsboro;
      display:flex;
    }
    span{
      width:80rpx;
      display:block;
      text-align:center;
      color:#7c7d8e;
    }
    .show{
        display: flex;
        margin-left: 20rpx;
        i{
            color: #4f7cf8;
        }
        .detail{
            min-width:400rpx;
            margin-left:10rpx;
            color:#333333;
            overflow:hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            text-align:left;
        }
        .active{
            color: #124cec;
        }
    }
  }
}
</style>