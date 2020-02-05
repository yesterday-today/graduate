<template>
  <div class="swiperIndex">
    <swiper class="swiper" @change="handleChange($event)" :autoplay="autoplay" :interval="interval" :duration="duration">
      <block v-for="(item, index) in img" :key="index" >
        <swiper-item>
          <image :src="item.img" mode="aspectFill"></image>
        </swiper-item>
      </block>
    </swiper>
    <div class="swiper_dot_wrap">
        <div class="wrapdot">
            <ul>
                <li v-for="(item,index) in img" :key="index" :class="{'active':index==curIndex}"></li>
            </ul>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props:['img'],
  data() {
    return {
      curIndex: 0,
      autoplay: true,
      interval: 3000,
      duration: 500
    };
  },
  methods: {
    handleChange(e) {
      this.curIndex = e.mp.detail.current;
    }
  }
};
</script>

<style lang="less" scoped>
.swiper {
  width: 100%;
  height: 360rpx;
  padding: 10rpx 0;
  image {
    width: 90%;
    height: 100%;
    display: block;
    margin: 0 auto;
    object-fit: cover;
    border-radius: 32rpx;
  }
}

.swiper_dot_wrap {
  position: relative;
  top: -50rpx;
  width: 100%;
  height: 20rpx;
  padding:0 60rpx;
  .wrapdot{
      width: 50%;
      margin: 0 auto;
      ul {
        overflow: hidden;
        li {
            float: left;
            width: 20rpx;
            height: 20rpx;
            box-sizing: border-box;
            border-radius: 50%;
            border: 4rpx solid #ff3000;
            background: #ffffff;
            margin-right: 30rpx;
            &:last-child {
                margin-right: 0rpx;
            }
            }
            .active {
            background: #ffffff;
            width: 40rpx;
            height: 4rpx;
            margin-top: 8rpx;
            border: 0rpx;
            border-radius: 0;
        }
    }
  }
}
</style>
