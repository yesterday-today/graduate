<template>
	<div class="index">
		<img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/location.png" />
		<p @click="go">{{area}}区({{detail}})</p>
        <i class="iconfont icon-qianjin"></i>
	</div>
</template>

<script>
export default{
    props:['area','detail'],
    methods:{
        go(){
            this.$emit('goMap');
        }
    }
}
</script>

<style lang="less" scoped>
.index{
	height:100rpx;
	line-height:100rpx;
    display:flex;
    border-bottom:1rpx solid gainsboro;
	img{
		width:60rpx;
		height:60rpx;
		display:block;
		padding:20rpx;
	}
	p{
		width:200rpx;
		font-size:30rpx;
		overflow: hidden;
		text-overflow:ellipsis;
        white-space:nowrap;
	    color:#0861e8;
    }
    i{
        font-size:40rpx;
        display:block;
        color:#4fb6ec;
    }
}
</style>