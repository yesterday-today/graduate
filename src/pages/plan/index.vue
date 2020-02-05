<template>
  <div class="plan">
    <ul>
      <li v-for="(item,index) in days" :key="index" @click="goDetail(index)">
        <span>{{item+1}}</span>
        <span v-if="(weeks+item+1)%7==0">周日</span>
        <span v-if="(weeks+item+1)%7==1">周一</span>
        <span v-if="(weeks+item+1)%7==2">周二</span>
        <span v-if="(weeks+item+1)%7==3">周三</span>
        <span v-if="(weeks+item+1)%7==4">周四</span>
        <span v-if="(weeks+item+1)%7==5">周五</span>
        <span v-if="(weeks+item+1)%7==6">周六</span>

        <span class="detail">******</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      days:'',//获取天数
			weeks:'',//获取周几
			year:'2019',//年份
			month:'12',//月份
			day:'14',//天数
      id:0,
    }
  },
  methods: {
    //跳转到计划单详情页
    goDetail(index){
      this.id=index;
      console.log(this.id);
      mpvue.navigateTo({url:'../planDetail/main?id='+this.id});
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
		},
		WeekCount(val){
			if(val%7==0){
				return '周日';
			}
			else if(val%7==1){
				return '周一';
			}
			else if(val%7==2){
				return '周二';
			}
			else if(val%7==3){
				return '周三';
			}
			else if(val%7==4){
				return '周四';
			}
			else if(val%7==5){
				return '周五';
			}
			else{
				return '周六';
			}
		}
  },
  mounted(){
    this.days=this.getDate(this.year,this.month);	
		this.weeks=this.getWeek(this.year,this.month,this.day);
		this.title=this.year+'年'+this.month+'月';
  }
};
</script>

<style lang="less" scoped>
.plan{
  ul{ 
    li{
      height:70rpx;
      line-height:70rpx;
      padding:0 40rpx;
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
    .detail{
      max-width:400rpx;
      margin-left:20rpx;
      color:#333333;
      overflow:hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
    }
  }
}
</style>