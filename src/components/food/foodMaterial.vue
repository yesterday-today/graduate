<template>
    <div class="material">
        <!-- 主料 -->
        <div class="major">
            <div class="title">
                <p>主料</p>
            </div>
            <div class="top">
                <div class="content" v-for="(item,index) in mainList" :key="index">
                    <img :src="item.img">
                    <p>{{item.foodName}}</p>
                    <p class="desc2">{{item.foodNum}}</p>
                </div>
            </div>
        </div>
        <div class="separate"></div>
        <!-- 调料 -->
        <div class="season">
            <div class="title1">
                <p class="tl">调料</p>
            </div>
            <div class="top1">
                <div class="content1">
                    <ul>
                        <li v-for="(item,index) in flList" :key="index">
                            <p>{{item.foodName}}:</p>
                            <p class="desc2">{{item.foodNum}}</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default{
    props:['mainList','flList'],
    data(){
        return{
        }
    },
    mounted(){
    },
}
</script>

<style lang="less" scoped>
.material{
    padding:20rpx;
    height:600rpx;
    .separate{
        width:100%;
        height:1rpx;
        background:#f5f4f4;
    }
    .title,.title1{
        width:100%;
        height:60rpx;
        p{
            color:#FFFFFF;
            padding:8rpx 16rpx 8rpx 16rpx;
            border-radius:4rpx;
            background:#ff3232;
            font-size:28rpx;
            float:left;
            border:1rpx solid #e90808;
        }
        .tl{
            color:#999;
            background:#f5f5f5;
            border:1rpx solid #ddd;
        }
    }
    .major{
        width:100%;
        .top{
            padding-left:60rpx;
            padding-top:10rpx;
            .content{
                width:100%;
                height:200rpx;
                line-height:200rpx;
                img{
                    width:160rpx;
                    height:160rpx;
                    display:block;
                    padding:20rpx;
                    float:left;
                }     
                p{
                    font-size:28rpx;
                    float:left;
                }
                .desc2{
                    color:#b1b1b1;
                    padding-left:10rpx;
                }
            }
        }
    }
    .season{
        width:100%;
        margin-top:10rpx;
        .top1{
            width:90%;
            margin:0 auto;
            overflow:auto;
            .content1{
                width:500rpx;
                height:100%;
                float:right;
                ul{
                    overflow:auto;
                    li{
                        width:49%;
                        height:60rpx;
                        line-height:60rpx;
                        border-bottom:1rpx solid #eee;
                        float:left;
                        p{
                            font-size:28rpx;
                            float:left;
                        }
                        .desc2{
                            color:#b1b1b1;
                            padding-left:10rpx;
                        }
                    }
                }
            }
        }
    }
}
</style>