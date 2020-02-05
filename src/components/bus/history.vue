<template>
  <div class="index">
      <div class="wrap">
          <ul>
            <li v-for="(item,index) in list" :key="index">
                <div class="img">
                    <i class="iconfont icon-gongjiao"></i>
                </div>
                <p>{{item.bus}}路 方向 {{item.name}}</p>
            </li>
         </ul>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
       list:[{bus:28,name:'滨南中山医院'},{bus:127,name:'轮渡公交场站'}]
      }
  },
  methods: {
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
                        
                    }
                }
                p{
                    font-size:32rpx;
                    line-height:100rpx;
                    // float: left;
                }
                
            }
        }
    }
}
</style>
