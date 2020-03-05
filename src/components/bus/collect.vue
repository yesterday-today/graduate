<template>
  <div class="index">
      <div class="wrap">
          <ul>
            <li v-for="(item,index) in busCollect" :key="index" @click="goBus(index,item.data.lineNum)">
                <div class="left">
                    <p class="on">{{item.data.geton}}</p>
                    <p class="name">{{item.data.lineNum}}路</p>
                    <p class="off">{{item.data.getoff}}</p>
                </div>
                <div class="right">
                    <p class="num">{{item.data.stationNum}}站</p>
                    <p class="time">4分 / 1.5公里</p>
                </div>
            </li>
         </ul>
      </div>
  </div>
</template>

<script>
export default {
  props:['busCollect'],
  data () {
      return{
       list:[{on:'瑞景商业广场',bus:28,off:'滨南中山医院'},{on:'瑞景商业广场',bus:28,off:'滨南中山医院'}]
      }
  },
  methods: {
      //跳转到公交详情页
      goBus(id,num){
          this.$emit('goBus',id,num);

      }

  },
}
</script>

<style lang="less" scoped>
.index{
    overflow:hidden;
    .wrap{
        margin-bottom:20rpx;
        ul{
            li{
                width:90%;
                height:200rpx;
                border-radius:20rpx;
                margin:0 auto;
                margin-top:20rpx;
                background: #ffffff;
                .left{
                    width:300rpx;
                    float: left;
                    padding:20rpx;
                    .name{
                        font-weight:500;
                        height:60rpx;
                        line-height: 60rpx;
                    }
                    .on,.off{
                        font-size:24rpx;
                        height:50rpx;
                        line-height:50rpx;
                    }
                }
                .right{
                    float:right;
                    padding:40rpx;
                    font-size:24rpx;
                    p{
                        height:60rpx;
                        line-height: 60rpx;
                        text-align: center;
                    }
                    .num{
                        color:#ec3e30;
                    }
                }
                
            }
        }
    }

}
</style>
