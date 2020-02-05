<template>
  <div class="index">
      <div class="wrap">
          <ul>
            <li v-for="(item,index) in list" :key="index">
                <div class="img">
                    <!-- <img src="" alt=""> -->
                </div>
                <p>{{item.bus}}路</p>
                <div class="img">
                    <!-- <img src="" alt=""> -->
                </div>
            </li>
         </ul>
         <div class="bot" @click="clear">
            <p>清空搜索历史</p>
         </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
       list:[{bus:28},{bus:127}]
      }
  },
  methods: {
      clear(){

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
                    padding:20rpx;
                    // float: left;
                    img{
                        width:100%;
                        height:100%;
                        display: block;
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
