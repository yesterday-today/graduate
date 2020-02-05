<template>
    <div class="repeatIndex">
        <div class="repeat">
            <div class="header">
                <p>重复</p>
            </div>
            <div class="content">
                <ul>
                    <li v-for="(item,index) in list" :key="index" @click="goFinish(item)">
                        <from action="" method="get">
                            <label>
                                <input type="radio" :value="item" name="select" class="btn"/>
                                <p>{{item}}</p>
                            </label> 
                        </from> 
                    </li>
                </ul>
            </div>
        </div>     
    </div>
</template>

<script>
export default{
    data(){
        return{
            list:['不重复','每天重复','每周重复','每月重复','每年重复'],
            selectBol:true,
        }
    },
    methods:{
        goFinish(val){
            this.selectValue=val;
            this.$emit('change',this.selectValue);
        }
    }
}
</script>

<style lang="less" scoped>
.repeatIndex{
    width:100%;
    height:100%;
    background:rgba(0,0,0,.4);
	position:fixed;
	top:0;
	left:0;
	z-index:13;
    .repeat{
        width:450rpx;
        background: #ffffff;
        border-radius:20rpx;
        position:absolute;
        top:50%;
        left:50%;
        transform: translateX(-50%) translateY(-50%);
        .header{
            height:80rpx;
            line-height:80rpx;
            font-size:24rpx;
            text-align:center;
            background:#dfdfdf;
            border-radius:20rpx 20rpx 0 0;
        }
        .content{
            ul{
                li{
                    width:90%;
                    margin:0 auto;
                    font-size:22rpx;
                    height:70rpx;
                    line-height:70rpx;
                    border-bottom:1rpx solid gainsboro;
                    &:nth-last-child(1){
                        border-bottom:0;
                    }
                    .btn{
                        width:40rpx;
                        height:40rpx;
                        float:right;
                        display:block;
                    }
                    p{
                        float:left;
                    }
                }
            }
        }
    }
    
}
</style>