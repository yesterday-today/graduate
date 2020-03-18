<template>
  <div class="set"> 
    <div class="content2">
        <ul>
            <li v-for="(item,index) in tabList" :key="index">
                <i :class="item.i"></i>
                <p>{{item.text}}</p>
                <div class="switch" v-if="index==0">
                    <van-switch 
                        :checked="busBol"
                        @change="onBus"
                        active-color="#07c160"
                        inactive-color="#cecccc"
                        size="40rpx"/>
                </div>
                <div class="switch" v-if="index==1">
                    <van-switch 
                        :checked="planBol"
                        @change="onPlan"
                        active-color="#07c160"
                        inactive-color="#cecccc"
                        size="40rpx"/>
                </div>
            </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
        tabList:[{text:'公交提醒',i:'iconfont icon-gongjiao'},
                {text:'计划提醒',i:'iconfont icon-tubiaozhizuomoban'}],
        busBol:false,
        planBol:false,
    }
  },
  methods: {
    checkBol(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').where({
            _openid:this.globalData.openid
            }).get({
                success:res=>{
                    this.busBol=res.data[0].notifyList.busBol;
                    this.planBol=res.data[0].notifyList.planBol;
                },
                fail:res=>{
                    console.log(res)
                }
        });
    },
    modifyCkeck(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('personMessage').doc(this.globalData.openid).update({
            data:{
                notifyList:{
                    busBol:this.busBol,
                    planBol:this.planBol
                }
            },
            success:res=>{
                console.log(res)
            },
            fail:res=>{
                console.log(res)
            }
        });
    },
    onBus(){
        this.busBol=!this.busBol;
        this.modifyCkeck();
    },
    onPlan(){
        this.planBol=!this.planBol;
        console.log(this.planBol)
        this.modifyCkeck();
    }
  },
  mounted(){
      this.checkBol();
  }
}
</script>

<style lang="less" scoped>
.set{
  .content2{
    height:600rpx;
    margin:0 auto;
    margin-top:40rpx;
    border-radius:20rpx;
    ul{
      width:90%;
      margin:0 auto;
      li{
        height:90rpx;
        line-height:90rpx;
        border-bottom:1rpx solid #cecccc;
        color: #131212;
        i{
          float:left;
          color: green;
          font-size: 40rpx;
          
        }
        .icon-tubiaozhizuomoban{
            color: #f14444;
        }
        p{
          font-size:30rpx;
          float:left;
          padding-left:30rpx;
        }
        .switch{
            float:right;
            padding-top: 5px;
            height: 80rpx;
        }
      }
    }
  }
}
</style>