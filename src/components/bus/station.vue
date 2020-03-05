<template>
  <div class="index">
     <ul class="clear" :style="{width:station.length*60+'rpx'}">
         <li v-for="(item,index) in station" :key="index">
            <div class="img">
                <div class="wrap" v-for="(ite,inde) in buses" :key="inde" v-if="index+1==ite.dis_stat">
                    <img src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/bus.png" :class="{'distance':ite.distance!=0}">
                </div>
            </div>
            <div class="span">
                <span :class="{'active1':index==beginRemind}" id="remind">
                    {{item.bus_staname}}
                </span>
            </div>	
        </li>
     </ul>
  </div>
</template>

<script>

export default {
    props:['station','buses','beginRemind'],
    data(){
        return{
            arriveIndex:2,//公交到达位置1
            arriveIndex1:0,//公交到达位置2
        }
    }
}
</script>

<style lang="less" scoped>
.index{
    width: 100%;
    height:420rpx;
    box-sizing:border-box;
    overflow-x:auto;
    overflow-y:hidden;
    z-index:13;
    padding-top:40rpx;
    ul{
        overflow-x:auto;
        overflow-y: hidden;
        li{
            width: 60rpx;
            float: left;
            .span{
                width: 100%;
                height:350rpx;
                border-top: 2rpx solid #43a1e8;
                span{
                    width: 50%;
                    font-size:30rpx;
                    display: block;
                    margin:0 auto;
                    color: #000000;
                    padding-top:20rpx;
                }
            }
            .img{
                width: 100%;
                height: 40rpx;
                .wrap{
                    height:40rpx;
                    img{
                        width: 100%;
                        height: 100%;
                        display: block;
                        margin: 0 auto;
                    }
                    .distance{
                        position: relative;
                        left:-25rpx;
                    }
                }
            }
        }
    }
    ul li{
        font-size:4rpx;
        color: blue;
        position: relative;
        &:before{
            content:'';
            display:block;
            background:blue;
            width:8rpx;
            height:8rpx;
            box-sizing: border-box;
            position:absolute;
            /*top:-3px;*/
            top:40rpx;
            z-index:100;
            left:26rpx;			
        }
    }
    .active1{
        font-weight:bold;

    }

}

</style>
