<template>
    <div class="location">
        <div class="wrap">
            <div class="wrap-left">
                <li>
                    <p>厦门</p>
                </li>
            </div>
            <div class="wrap-cet">
                <li v-for="(item,index) in data" :key="index" @click="goLeft(index)" :class="{'bk':index==leftindex}">
                    <p claas="area">{{item.area}}</p>
                </li>
            </div>
            <div class="wrap-right">
                <li  v-for="(item,index) in district" :key="index" @click="goRight(index)" :class="{'bk':index==rightindex}">
                    <p>{{item}}</p>
                </li>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            data:[],//获取区
            // area:'思明',//获取区
            // detail:'不限',//获取详细地址
            district:[],//获取详细地址
            selectText:'',
            leftindex:0,
            rightindex:0
        }
    },
    methods:{
        ajx(){
            const db = wx.cloud.database({env: 'ybb-901hf'})
            db.collection('area').get({
                success:res=>{
                    this.data=res.data;
                    this.district=this.data[this.leftindex].district;
                }
            });
        },
        goLeft(index){
            this.leftindex=index;
            this.rightindex=0;
            this.area=this.data[this.leftindex].area;
            this.district=this.data[this.leftindex].district;
        },
        goRight(index){
            this.rightindex=index;
            this.detail=this.district[this.rightindex];
            this.$emit('selectValue',this.area,this.detail);
        }
    },
    mounted(){
        this.ajx();
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
        width:600rpx;
        height:100%;
        background: #ffffff;
        position:absolute;
        top:0%;
        left:0%;
        &-left{
            width: 100rpx;
            height: 100%;
            float: left;
            li{
                line-height:70rpx;
                padding-left: 10rpx;
                .area{
                    font-size: 25rpx;
                }
            }
        }
        &-cet{
            width:90rpx;
            height: 100%;
            float: left;
            li{
                line-height:70rpx;
                text-align: center;
                p{
                    font-size: 30rpx;
                }
            }
            .bk{
                color: red;
            }

        }
        &-right{
            width:400rpx;
            height: 100%;
            float: left;
            li{
                padding: 0 10rpx;
                line-height:70rpx;
                text-align: center;
                float: left;
                color: #a7a8b8;

                p{
                    font-size: 25rpx;
                }
            }
            .bk{
                color: red;
            }
        }
    }
}
</style>

