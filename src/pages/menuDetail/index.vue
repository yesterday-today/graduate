<template>
  <div class="menu">
    <div class="menu-top">
      <div class="menu-top-left" v-if="img!=''">
        <img :src="img">
      </div>
      <div class="menu-top-right">
        <div class="title">
          <p v-if="title!=''">{{title}}</p>
          <div class="img" @click="change">
            <i class="iconfont icon-shoucang" v-if="collect==false"></i>
            <i class="iconfont icon-shoucang2" v-if="collect==true"></i>
          </div>
        </div>
        <div class="step">
          <div class="content" v-for="(item,index1) in contentList" :key="index1" v-if="contenList!=''">
            <p class="left" v-if="index1=='diffcult'">难度</p>
            <p class="left" v-if="index1=='num'">人数</p>
            <p class="left" v-if="index1=='readyTime'">准备时间</p>
            <p class="left" v-if="index1=='cookTime'">烹饪时间</p>
            <div class="grade">
              <div class="rank" v-for="ind in 10" :key="ind">
                <span :class="{'bk':ind<=3}"></span>
              </div>
            </div>
            <p class="right" v-if="index1=='diffcult'&&contentList.diffcult!=''">{{contentList.diffcult}}</p>
            <p class="right" v-if="index1=='num'&&contentList.num!=''">{{contentList.num}}</p>
            <p class="right" v-if="index1=='readyTime'&&contentList.readyTime!=''">{{contentList.readyTime}}</p>
            <p class="right" v-if="index1=='cookTime'&&contentList.cookTime!=''">{{contentList.cookTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="separate"></div>
    <div class="menu-tab">
      <div class="tabName" v-for="(ite,inde) in tabList" :key="inde" @click="ontab(inde)"
      :class="{'tabBk':inde==tabindex}">
        <p>{{ite}}</p>
      </div>
    </div>
    <div class="menu-content">
      <foodMaterial :mainList="mainList" :flList="flList" v-if="tabindex==0"></foodMaterial>
      <foodMethod :methodList='methodsList' :skill="skill" v-if="tabindex==1"></foodMethod>
    </div>
   <div class="loading" v-if="loadValue==true">
        <div class="wrap">
            <van-loading color="#1989fa" size="30px"/>
        </div>
    </div>
  </div>  
</template>

<script>
import foodMaterial from '@/components/food/foodMaterial'
import foodMethod from '@/components/food/foodMethod'
// import { nextTick } from '../../../dist/wx/static/vant/common/utils';

export default {
  components:{foodMaterial,foodMethod},
  data(){
    return{
      id:'',//菜谱id，为数据库的index
      urlName:'',//上一页面的路径名
      collect:false,
      loadValue:true,
      collectId:'',
      tabindex:0,
      dataType:'',//数据库名
      detail:'',//详情页数据
      contentList:'',//食物信息
      img:'',//食物图片
      mainList:'',//主料
      flList:'',//辅料
      methodsList:'',//做法
      skill:'',//技巧
      title:'',
      tabList:['用料','做法'],
    }
  },
  methods:{
    getData(){
        this.img=this.detail.menu[0];
        this.title=this.detail.title;
        this.contentList=this.detail.contentList[0];
        this.mainList=this.detail.mainList;
        this.flList=this.detail.flList;
        this.methodsList=this.detail.methodList;
        this.skill=this.detail.skill;
    },
    ajax(){
        this.loadValue=true;
        if(this.urlName=='pages/menuCollect/main'){
            const db = wx.cloud.database({env: 'ybb-901hf'})
            db.collection(this.dataType).where({
                _openid:this.globalData.openid
             }).get({
                success:res=>{
                    this.detail=res.data[this.id].data;
                    this.getData();
                    this.loadValue=false;
                }
            })
        }
        else{
            wx.cloud.callFunction({
                name: this.dataType,
                success:res=>{
                    this.detail=res.result.data[this.id];
                    this.getData();
                    this.loadValue=false;
                }
            })
        }
    },
    //判断是否收藏了
    collectBol(){
        const db = wx.cloud.database({env: 'ybb-901hf'});
        this.loadValue=true;
        db.collection('menuCollect').where({
            _id:this.collectId
        }).get({
            success: res=>{
                if(res.data.length!=0){
                    this.collect=true;
                }else{
                    this.collect=false;
                }
            }
        })
    },
    change(){
      if(this.collect==false){
        this.collect=true;
        this.addCollect();
      }else{
        this.collect=false;
        this.removeCollect();
      }
    },
    ontab(index){
      this.tabindex=index;
    },
    //添加数据到数据库
    addCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('menuCollect').add({
            data:{
                _id:this.detail._id,
                data:this.detail,
            },
            success:res=>{
            }
        });
    },
    //移除数据
    removeCollect(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection("menuCollect").doc(this.detail._id).remove({
            success:res=>{
                // console.log(res)
            },
            fail:res=>{
                // console.log(res);
            }
        })
    }
  },
  mounted(){
      this.ajax();
      this.collectBol();
  },
  onLoad(options){
    Object.assign(this.$data, this.$options.data());//加载页面时，重置数据
    //获取上一页面传过来的值
    this.id=options.index;
    this.dataType=options.type;
    this.collectId=options.id;
    this.urlName=options.url;
  },
}
</script>

<style lang="less" scoped>
.menu{
  .separate{
    width:100%;
    height:1rpx;
    background:#f5f4f4;
  }
  .loading{
    width:100%;
    height:100%;
    background: rgba(255,255,255,1);
    z-index:333;
    position:fixed;
    top:0;
    left:0;
    .wrap{
        position:absolute;
        top:50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
    }
    }
  &-top{
    width:100%;
    height:360rpx;
    &-left{
      width:240rpx;
      height:340rpx;
      padding:10rpx;
      float:left;
      img{
        width:100%;
        height:280rpx;
        display:block;
        padding-top:30rpx;
      }

    }
    &-right{
      width:460rpx;
      float:left;
      .title{
        height:100rpx;
        line-height:100rpx;
        p{
          font-size:36rpx;
          float:left;
          width: 400rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .img{
          width:60rpx;
          height:60rpx;
          line-height:60rpx;
          float:right;
          padding-top:20rpx;
          i{
            font-size: 45rpx;
          }
          .icon-shoucang2{
                color: #ff3232;
            }
        }
      }
      .step{
        .content{
          height:60rpx;
          p{
            height:60rpx;
            line-height:60rpx;
            font-size: 24rpx;
          }
          .left{
            float:left;
          }
          .right{
            float:right;
            padding-right:10rpx;
          }
          .grade{
            float:left;
            width:220rpx;
            height:100%;
            .rank{
              width:10rpx;
              height:40rpx;
              float:left;
              margin-left:10rpx;
              margin-top:10rpx;
              span{
                width:100%;
                height:100%;
                display:block;
                background:#ddd;
              }
              .bk{
                background:#ff3232;
              }
            }
          }
        }
      }
    }
  }
  &-tab{
    width:100%;
    height:100rpx;
    line-height:100rpx;
    .tabName{
      width:50%;
      height:100%;
      text-align:center;
      float:left;
      font-size:40rpx;
    }
    .tabBk{
      font-weight:bold;
      &:after{
        width:40rpx;
        height:6rpx;
        content:'';
        display:block;
        position:relative;
        bottom:20rpx;
        left:170rpx;
        background:#000000;
      }
    }
  }
  &-content{
    width:100%;
    height:100%;
    position:relative;
  }
}
</style>