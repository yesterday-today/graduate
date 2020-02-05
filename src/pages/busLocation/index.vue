<template>
  <div class="index">
      <div class="index-top">
          <p class="title">五通泥金公交场站-滨南中山医院</p>
          <div class="time">
              <ul style="list-style:circle">
                  <li class="begin"><span>首班:{{startTime}}</span></li>
                  <li class="end"><span>末班:{{endTime}}</span></li>
              </ul>
          </div>
          <div class="distance">
            <div class="p1">
                <p>最近第一辆公交</p>
                <p>最近第二辆公交</p>
            </div>
            <div class="separate"></div>
            <div class="p2">
                <p>{{distanceNum}}站</p>
                <p>{{distanceNum1}}站</p>
            </div>
            <div class="p2">
                <p>开往{{distanceName}}</p>
                <p>到达{{distanceName1}}</p>
            </div>
            <div class="p2">
                <p>*米/*分钟</p>
                <p>*米/*分钟</p>
            </div>
        </div>
        <div class="bus clear">
            
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data () {
      return{
          startTime:'06:15',//首班车时间
          endTime:'22:50',//末班车时间
          beginRemind:'',//站点提醒
          distanceNum:'*',//站点距离1
          distanceNum1:'*',//站点距离2
          distanceName:'台东路',//站点名字1
          distanceName1:'观音山',//站点名字2
      }
  }
}
</script>

<style lang="less" scoped>
.index{
    width:90%;
    margin:0 auto;
    &-top{
        .title{
            font-size:35rpx;
            text-align:center;
            color:#0e8ae8;
        }
        .time{
            box-sizing:border-box;
            width:100%;
            height:60rpx;
            line-height:60rpx;
            padding-top:10rpx;
            ul{
                width:50%;
                height:100%;
                margin:0 auto;
                li{
                    font-size:30rpx;
                    float:left;
                    width:50%;
                    
                }
                span{
                    color:#000;
                }
                .begin{
                    color:blue;
                }
                .end{
                    color:red;
                }
            }
            ul li{
                list-style-type: circle !important;
                list-style-position:inside;
            }
        }
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
                height:60rpx;
                line-height:60rpx;
                margin:0 auto;
                margin-top:10rpx;
                p{
                    font-size:24rpx;
                    float:left;
                    width:50%;
                    text-align:center;
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
}
</style>
