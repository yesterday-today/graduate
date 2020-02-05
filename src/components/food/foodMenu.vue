<template>
    <div class="menu">
        <div class="menu-content">
            <ul>
                <li v-for="(item,index) in menuList" :key="index" @click="goDetail(item.index,item._id)">
                    <img :src="item.menu[0]" class="titleImg" v-if="item.menu[0]!=''">
                    <div class="title" v-if="item.title!=''">
                        <p>{{item.title}}</p>
                    </div>
                    <div class="detail">
                        <div class="detail-top">
                            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodCs.png">
                            <p v-if="item.menu[1]!=''">{{item.menu[1]}}</p>
                            <p v-if="item.menu[1]==''">未知</p>
                        </div>
                        <div class="detail-bottom">
                            <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/foodSf.png">
                            <p v-if="item.menu[2]!=''">{{item.menu[2]}}</p>
                            <p v-if="item.menu[2]==''">未知</p>
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
        }
    },
    methods:{
        goDetail(index,id){
            this.$emit("go",index,id);
        }
    },
    watch:{
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