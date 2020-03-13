<template>
  <div class="index">
      <div class="wrap" v-if="historyList.length!=0">
          <ul>
            <li v-for="(item,index) in historyList" :key="index">
                <div class="img">
                    <i class="iconfont icon-luxian1"></i>
                </div>
                <div class="text" @click="go(item.data.geton,item.data.getoff)">
                    <span>{{item.data.geton.name==''?'我的位置':item.data.geton.name}}</span>
                    <i class="iconfont icon-jiantou"></i>
                    <span>{{item.data.getoff.name}}</span>
                </div>
                <div class="img" @click="clear(item._id)">
                    <i class="iconfont icon-shanchu"></i>
                </div>
            </li>
         </ul>
      </div>
      <div class="noList" v-if="historyList.length==0">
        <div class="icon">
            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/tanger.png" alt=""/>
        </div>
        <p>暂无历史路线</p>
      </div>
  </div>
</template>

<script>
export default {
  props:['historyList'],
  data () {
      return{
      }
  },
  methods: {
    //点击进行删除
    clear(id){
        this.$emit('clear',id);
    },
    go(geton,getoff){
        this.$emit('goMap',geton,getoff);
    }
  },
  mounted(){
  },
}
</script>

<style lang="less" scoped>
.index{
    overflow:hidden;
    .noList{
        display: flex;
        width: 40%;
        margin: 0 auto;
        height:80rpx;
        line-height: 80rpx;
        img{
            width: 50rpx;
            height: 50rpx;
            display: block;
            padding: 15rpx 0;
        }
        p{
            font-size:32rpx;
            padding-left:20rpx;
        }
    }
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
                    i{
                        width:100%;
                        height:100%;
                        
                    }
                    .icon-shanchu{
                        color: red;
                    }
                }
                .text{
                    font-size:25rpx;
                    line-height:100rpx;
                    width: 70%;
                    display: flex;
                    i{
                        font-size: 50rpx;
                        color: blue;
                        padding: 0 10rpx;
                    }
                    span{
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                    }
                }
                
            }
        }
    }
}
</style>
