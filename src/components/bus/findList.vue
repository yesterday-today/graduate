<template>
  <div class="index">
      <div class="separate"></div>
      <div class="content">
          <ul>
            <li v-for="(item,index) in List" :key="index" @click="go">
              <div class="wrap">
                  <p class="title">{{item.name}}路</p>
                  <div class="detail">
                    <span>{{item.minute}}分钟 - {{item.stationNum}}站 - {{item.money}}元</span>
                  </div>
                  <div class="separate"></div>
                  <div class="arrive">
                    <span>{{item.name}}路 - {{item.distance}} - {{item.busStation}}</span>
                  </div>
                </div>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
          List:[{name:'28',minute:38,money:1,stationNum:5,distance:'20分钟后到达',busStation:'岭兜二里'},
          {name:'28',minute:38,money:1,stationNum:3,distance:'20分钟后到达',busStation:'岭兜二里'}]
      }
  },
  methods:{
      go(){
          this.$emit('go');
      }
  }
}
</script>

<style lang="less" scoped>
.index{
    border-top:1rpx solid #F2F2F2;
    .separate{
        width:100%;
        height:3rpx;
        background:#F2F2F2;
    }
    .content{
        padding-top:20rpx;
        ul{
            li{
                border-bottom:15rpx solid #F2F2F2;
                .wrap{
                    padding-left:30rpx;
                    margin:30rpx 0;
                    .title{
                        font-size:40rpx;
                        color:#000;
                        padding-bottom:5rpx;
                    }
                    .detail{
                        font-size:30rpx;
                        color:#a7a8b8;
                        margin-bottom:15rpx;
                    }
                    .arrive{
                        margin-top:15rpx;
                        color:#075fe4;
                        font-size:35rpx;
                    }
                }
            }
        }
    }
}
</style>
