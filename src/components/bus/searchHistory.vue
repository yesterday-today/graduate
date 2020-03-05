<template>
  <div class="index">
      <div class="wrap">
          <ul>
            <li v-for="(item,index) in data" :key="index" @click="goBusLocation(item.lineName)">
                <div class="img">
                    <i class="iconfont icon-gongjiao"></i>
                </div>
                <p>{{item.lineName}}路</p>
            </li>
         </ul>
         <div class="bot" @click="clear" v-if="data.length!=0">
            <p>清空搜索历史</p>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  props:['data'],
  data () {
      return{
      }
  },
  methods: {
      clear(){
          this.$emit('clear');
      },
      //跳转到公交详情页
      goBusLocation(name){
          this.$emit('goBusLocation',name);
      }
  },
}
</script>

<style lang="less" scoped>
.index{
    overflow:hidden;
    .wrap{
        ul{
            li{
                width:90%;
                height:100rpx;
                border-radius:20rpx;
                margin:0 auto;
                margin-top:20rpx;
                background: #ffffff;
                display:flex;
                .img{
                    width:60rpx;
                    height:60rpx;
                    line-height: 60rpx;
                    text-align: center;
                    padding:20rpx;
                    // float: left;
                    i{
                        width:100%;
                        height:100%;
                        color: blue;
                    }
                }
                p{
                    font-size:32rpx;
                    line-height:100rpx;
                    // float: left;
                }
                
            }
        }
        .bot{
            width:100%;
            height:100rpx;
            line-height: 100rpx;
            font-size:32rpx;
            text-align: center;
        }
    }
}
</style>
