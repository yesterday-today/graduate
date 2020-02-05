<template>
    <div class="location">
        <div class="wrap">
            <p class="title">定位确认</p>
            <p class=“detail>打开定位服务来获取定位信息</p>
            <div class="bot">
                <div class="left" @click="clear">
                    <p>取消</p>
                </div>
                <div class="separate">
                    <div class="line"></div>
                </div>
                <div class="right" @click="confirm">
                    <p>确认</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
        }
    },
    methods:{
        clear(){
            this.$emit('popupCancel');
        },
        confirm(){
            this.$emit("popupConfirm");
        },
    }
}
</script>
<style lang="less" scoped>
.location{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
    position:fixed;
    top:0;
    left:0;
    z-index:10000;
    .wrap{
        width:500rpx;
        height:300rpx;
        background: #ffffff;
        border-radius:20rpx;
        position:absolute;
        top:50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        .title{
            font-size:40rpx;
            font-weight:bold;
            text-align:center;
            padding-top:10rpx;
        }
        .detail{
            font-size:35rpx;
            text-align:center;
            padding-top:50rpx;
        }
        .bot{
            width:100%;
            border-top:1px solid gray;
            font-size:40rpx;
            height:100rpx;
            line-height:100rpx;
            text-align:center;
            position:absolute;
            bottom:0;
            clear:both;
            .separate{
                width:20rpx;
                height:100rpx;
                float:left;
                .line{
                    width:2rpx;
                    height:100rpx;
                    background: gray;
                    margin: 0 9rpx;
                }
            }
            .left{
                float:left;
                width:240rpx;
            }
            .right{
                float:right;
                width:240rpx;
                color:#075fe4;
            }
        }
    }
}
</style>

