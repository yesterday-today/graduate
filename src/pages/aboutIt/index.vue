<template>
  <div class="It">
      <div class="It-top">
          <div class="img">
              <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/timg.jpg" alt="">
          </div>
          <div class="content">
              <p class="name">上班火箭军</p>
              <p class="explain">我的专属上班达人</p>
          </div>
      </div>
      <div class="It-cet">

      </div>
      <div class="It-bot">
          <ul>
              <li v-for="(item,index) in text" :key="index">
                <div class="left"><p>{{item.name}}:</p></div>
                <div class="right"><p>{{item.text}}</p></div>
            </li>
          </ul>
          
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        text:[{name:'联系QQ',text:'975416469'},
        {name:'联系微信',text:'cometrue3344'},
        {name:'联系邮箱',text:'sibinyan@163.com'},
        {name:'联系电话',text:'15259591797'}]
    }
  },
  methods: {
  }
}
</script>

<style lang="less" scoped>
.It{
    &-top{
        width:100%;
        height:300rpx;
        margin-top:100rpx;
        .img{
            height:150rpx;
            position:relative;
            img{
                display:block;
                width:150rpx;
                height:150rpx;
                position:absolute;
                left:50%;
                transform: translateX(-50%);
                border-radius: 50%;
            }
        }
        .content{
            text-align:center;
            color:#075fe4;
            padding-top:30rpx;
            .name{
                font-size:40rpx;
                font-weight:bold;
                text-indent:5rpx;
            }
            .explain{
                font-size:30rpx;
                padding-top:10rpx;
            }
        }
    }
    &-bot{
        padding-top:20rpx;
        ul{
            width:60%;
            clear:both;
            margin:0 auto;
            li{
                width:100%;
                height:50rpx;
                line-height:50rpx;
                font-size:30rpx;
                .left{
                    width:40%;
                    float:left;
                    text-align:center;
                }
                .right{
                    width:60%;
                    float:right;
                    p{
                        float:left;
                    }
                }
            }
        }
    }
}
</style>