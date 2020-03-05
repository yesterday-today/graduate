<template>
  <div class="menu">
    <div class="content">
      <div class="content-left">
        <ul>
          <li v-for="(item,index) in leftList" :key="index" @click="ontab(index)" :class="{bk:index==tabindex}">
            <img :src="item.img" alt="" />
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
      <div class="content-right">
        <ul>
          <li v-for="(item,index) in menu[tabindex]" :key="index" @click="goDetail(tabindex,index)">
              <div class="img" v-if="item.img!=''">
                <img :src="item.img">
              </div>
            <p>{{item.title}}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  data(){
    return{
      leftList:[
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/syMenu.png",
          title:'实用分类',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/scMenu.png",
          title:'每日三餐',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/jcMenu.png",
          title:'家常菜谱',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/zhMenu.png",
          title:'中华菜系',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/sjMenu.png",
          title:'时间',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/swMenu.png",
          title:'食物',
        },
        {
          img:"cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/cjMenu.png",
          title:'餐具',
        },
      ],
      tabindex:0,
      breakfast:[],
      menu:''
    }
  },
  methods:{
    ajx(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('menu').get({
            success:res=>{
                this.menu=res.data[0].menu;
                console.log(this.menu)
            }
        });
    },
    ontab(index){
      this.tabindex=index;
    },
    goDetail(tabindex,index){
      mpvue.navigateTo({url:'../menuSort/main?form='+ this.tabindex+'&type='+index});
    },
    
  },
  mounted(){
      this.ajx();
  }

}
</script>

<style lang="less" scoped>
.menu{
  .content{
    width:100%;
    overflow:hidden;
    &-left{
      width:200rpx;
      float:left;
      background:#d3e9f9;
      ul{
        li{
          width:100%;
          height:200rpx;
          img{
            width:60rpx;
            height:60rpx;
            padding-top:40rpx;
            padding-bottom:10rpx;
            display:block;
            margin:0 auto;
          }
          p{
            font-size:28rpx;
            text-align:center;
          }
          
        }
        .bk{
        	background:#a5cfef;
        }
      }
    }
    &-right{
      width:550rpx;
      float:right;
      ul{
        li{
          width:182rpx;
          padding: 20rpx 0;
          float:left;
          .img{
              img{
                width:140rpx;
                height:140rpx;
                display:block;
                margin:0 auto;
            }
           
          }
          p{
            font-size:24rpx;
            text-align:center;
          }
        }
      }
    }
  }
}
</style>