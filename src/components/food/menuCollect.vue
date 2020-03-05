<template>
    <div class="menu">
        <div class="menu-content">
            <ul>
                <li v-for="(item,index) in menuList" :key="index" @click="goDetail(index,item._id)">
                    <img :src="item.data.menu[0]" class="titleImg">
                    <div class="title" v-if="item.title!=''">
                        <p>{{item.data.title}}</p>
                    </div>
                    <div class="detail">
                        <div class="detail-top">
                            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCs.png">
                            <p>{{item.data.menu[1]}}</p>
                        </div>
                        <div class="detail-bottom">
                            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodSf.png">
                            <p>{{item.data.menu[2]}}</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default{
    props:['menuList'],
    data(){
        return{
            menuList:''
        }
    },
    methods:{
        goDetail(index,id){
            this.$emit("go",index,id);
        }
    },
    watch:{
        menuList(newVal,oldVal){
            this.menuList=newVal;
        }
    },
    mounted(){
        Object.assign(this.$data, this.$options.data());//从详情页面返回当页面时，刷新数据
    }
}
</script>

<style lang="less" scoped>
.menu{
    width:90%;
    margin:0 auto;
    &-content{
        ul{
            li{
                width:100%;
                height:150rpx;
                border-bottom:1rpx solid gainsboro;
                .titleImg{
                    width:130rpx;
                    height:130rpx;
                    display:block;
                    float:left;
                    padding:10rpx;
                }
                .title{
                    width:250rpx;
                    height:150rpx;
                    overflow:hidden;
                    float:left;
                    text-align:center;
                    p{
                        padding-top:40rpx;
                        font-size:28rpx;
                        font-weight:bold;
                    }
                }
                .detail{
                    width:250rpx;
                    height:130rpx;
                    padding:10rpx;
                    text-align:center;
                    float:right;
                    font-size:24rpx;
                    color:#666666;
                    &-top,&-bottom{
                        width:250px;
                        height:60rpx;
                        line-height:60rpx;
                        overflow: hidden;
                        text-overflow:ellipsis;
                        white-space: nowrap;
                        p{
                            float:left;
                        }
                        img{
                            width:48rpx;
                            height:48rpx;
                            padding:6rpx;
                            display:block;
                            float:left;
                        }
                    }
                }
            }
        }
    }
}

</style>