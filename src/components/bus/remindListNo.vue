<template>
  <div class="index">
      <div class="wrap">
          <div class="img">
              <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/clock2.png">
          </div>
          <p class="detail">您还没有添加任何上车提醒</p>
          <div class="button" @click="addClock"><p>立即添加</p></div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
      }
  },

  methods: {
      addClock(){
          this.$emit('add');
      }
  },
}
</script>

<style lang="less" scoped>
.index{
    overflow: hidden;
    .wrap{
        width:100%;
        height:500rpx;
        padding-top:200rpx;
        .img{
            width:200rpx;
            height:200rpx;
            margin:0 auto;
            img{
                display: block;
                width: 100%;
                height: 100%;
            }
        }
        .detail{
            text-align: center;
            font-size:30rpx;
            padding:30rpx 0;
        }
        .button{
            width:200rpx;
            height:70rpx;
            border-radius: 20rpx;
            margin: 0 auto;
            line-height:70rpx;
            font-size:28rpx;
            font-weight:400;
            color:#fff;
            text-align: center;
            background:#075fe4;
        }
    }
}
</style>
