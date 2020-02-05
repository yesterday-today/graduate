<template>
    <div class="method">
        <div class="method-content">
            <div class="step" v-for="(item,index) in methodList" :key="index">
                <div class="desc">
                    <em class="desc1">{{index+1}}.</em>
                    <em class="desc2">{{item.step}}</em>
                </div>
                <div class="img" v-if="item.imgList!=''">
                    <img :src="item.imgList">
                </div>
            </div>
        </div>
        <div class="separate"></div>
        <!-- <div class="method-content1">
            <p class="desc3">??</p>
            <div class="skill">
                <ul>
                    <li v-for="(item,index) in skill" :key="index">
                        <em>{{item.step}}</em>
                    </li>
                </ul>
            </div>
        </div> -->
    </div>
</template>

<script>
export default{
    props:['methodList','skill'],
    data(){
        return{
            ids:0,
        }
    },
    mounted(){
    },
    onLoad(options){
        console.log(options);
        let id=options.id;
        this.ids=id;
  },
}
</script>

<style lang="less" scoped>
.method{
    width:90%;
    margin:0 auto;
    padding-bottom:30rpx;
    .separate{
        width:100%;
        height:1rpx;
        background:#f5f4f4;
    }
    &-content1{
        padding-top:20rpx;
        .desc3{
            font-size:40rpx;
            font-weight:bold;
        }
        .skill{
            ul{
                li{
                    font-size:28rpx;
                    color:#666;
                    padding-top:6rpx;
                }
            }
        }
    }
    &-content{
        padding-bottom:20rpx;
        .step{
            .img{
                margin:0 auto;
                width: 400rpx;
                height:300rpx;
                img{
                    width:100%;
                    height:100%;
                    display:block;
                }
            }
            .desc{
                width:100%;
                overflow:hidden;
                em{
                    display:block;
                }
                .desc1{
                    color:#ff3232;
                    font-size:48rpx;
                    float:left;
                }
                .desc2{
                    font-size:28rpx;
                    color:#666;
                    padding-top:12rpx;
                }
            }
        }
        

    }
}
</style>