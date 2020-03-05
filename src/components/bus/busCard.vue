<template>
    <div class="index">
      <div class="distance">
        <div class="p1">
          <p>最近第一辆公交</p>
          <p>最近第二辆公交</p>
        </div>
      <div class="separate"></div>
        <div class="p2">
          <div class="wrap"
            v-for="(item,index) in distanceNum"
            :key="index" v-if="index<2&&distanceNum[0]!=undefined||distanceNum[1]!=undefined">
            <div class="desc1">
                <p v-if="item.distance!=0">{{beginRemind-item.dis_stat+2}}站</p>
                <p v-if="item.distance==0&&beginRemind-item.dis_stat+1!=0">{{beginRemind-item.dis_stat+1}}站</p>
                <p v-if="beginRemind-item.dis_stat+1==0&&item.distance==0">已到站</p>
            </div>
            <div class="desc2">
                <p v-if="item.distance!=0">开往{{station[item.dis_stat-1].bus_staname}}</p>
                <p v-if="item.distance==0">到达{{station[item.dis_stat-1].bus_staname}}</p>
            </div>
            <div class="desc3">
                <p v-if="item.distance!=0">大约<span>{{(beginRemind-item.dis_stat+2)*1.5}}</span>分钟</p>
                <p v-if="item.distance==0">大约<span>{{(beginRemind-item.dis_stat+1)*1.3}}</span>分钟</p>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default{
    props:['beginRemind','distanceNum','station']
}

</script>

<style lang="less" scoped>
.index{
    .distance{
        width:100%;
        height:350rpx;
        margin-top:20rpx;
        background: #bdbdfe;
        box-shadow: 0rpx 10rpx 40rpx 0rpx #d3d3f6;
        border-radius: 20rpx;
        color:#fff;
        .p1{
            width:80%;
            height:100rpx;
            line-height:100rpx;
            margin:0 auto;
            p{
                font-size:30rpx;
                font-weight:bold;
                float:left;
                text-align: center;
                width:50%;
            }
        }
        .p2{
            width:70%;
            margin:0 auto;
            margin-top:10rpx;
            .wrap{
                width: 50%;
                height: 180rpx;
                float:left;
            }
            span{
                font-weight: bold;
                padding: 0 5rpx;
            }
            p{
                font-size:24rpx;
                text-align:center;
                line-height:60rpx;
            }
        }
        .separate{
            width:90%;
            height:3rpx;
            background:#fff;
            margin:5rpx auto;
        }
    }
}
</style>