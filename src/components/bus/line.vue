<template>
  <div class="index">
      <div class="separate"></div>
      <div class="content">
          <p class="count" v-if="routes.length!=0"><em>{{routes.length}}</em>种出行方式</p>
          <p class="count" v-if="routes.length==0"><em>{{message}}</em></p>
          <ul>
            <li v-for="(item,index) in routes" :key="index" @click="go(index)">
              <div class="wrap">
                  <div class="titleWrap">
                      <div v-for="(ite,inde) in item.steps" :key="inde">
                        <div class="title" v-if="ite.mode=='TRANSIT'" v-for="(it,ind) in ite.lines" :key="ind">
                            <p v-if="ind==0&&inde==1">{{it.title}}</p>
                            <p v-if="ind==0&&inde!=1">-{{it.title}}</p>
                            <p v-if="ind>=1">/{{it.title}}</p>
                        </div>
                      </div>
                  </div>
                  
                  <div class="detail">
                    <span>距离{{item.distance>1000?item.distance/1000+'公里':item.distance+'米'}}</span>
                  </div>
                  <div class="separate"></div>
                  <div class="arrive">
                    <span>时长：{{item.duration}}分钟</span>
                  </div>
                </div>
            </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  props:['routes','message'],
  data () {
      return{
         
      }
  },
  methods:{
      go(index){
          this.$emit("goMap",index);
      }
  },
  mounted(){
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
        .count{
            padding-left: 30rpx;
            font-size:32rpx;
            height:30rpx;
            line-height: 30rpx;
            display: flex;
            color: red;
            em{
                font-weight:bold;
                font-size:38rpx;
            }
        }
        ul{
            li{
                border-bottom:15rpx solid #F2F2F2;
                .wrap{
                    padding-left:30rpx;
                    margin:30rpx 0;
                    .titleWrap{
                        overflow: hidden;
                        .title{
                            font-size:40rpx;
                            color:#000;
                            padding-bottom:5rpx;
                            float: left;
                        }
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
