<template>
  <div class="index">
    <div class="find">
        <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/busFx.png" @click="fx">
        <ul>
            <li class="begin"><input type="text" placeholder="输入起点" v-model="geton"></li>
            <div class="line"></div>
            <li class="end"><input placeholder="输入终点" v-model="getoff"></input></li>		
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
          getonFz:'',
          geton:'台东路',
          getoff:'岭兜二里',
      }
  },
  methods:{
      fx(){
          console.log(111)
        this.getonFz=this.geton;
        this.geton=this.getoff;
        this.getoff=this.getonFz;
      }
  }
}
</script>

<style lang="less" scoped>
.index{
    width:90%;
    margin:0 auto;
    .find{
        height:200rpx;
        img{
            width:64rpx;
            height:64rpx;
            float:left;
            padding-top:68rpx;
            display:block;
        }
        ul{
            width:90%;
            height:100%;
            margin:0 auto;
            float:right;
            li{
                width:80%;
                padding-left:10rpx;
                height:100rpx;
                line-height:100rpx;
                font-size:30rpx;
                list-style-type:circle;
                input{
                    width:100%;
                    color:#000000;
                    border:none;
                    height:100rpx;
                }
                
            }
            .line{
                width:100%;
                height:3rpx;
                background:#F2F2F2;
                float:left;
            }
            .begin{
                color:green;
            }
            .end{
                color:red;
            }
        }
    }
}
</style>
