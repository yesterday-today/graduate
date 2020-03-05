<template>
  <div class="index">
    <div class="search">
        <van-search
            :value="value"
            placeholder="请输入搜索关键词"
            show-action
            @change="onChange"
            @search="onSearch"
            @cancel="onCancel"
        />
    </div>
    <history :data="busData" @clear="clear" @goBusLocation="goBusLocation"></history>
  </div>
</template>

<script>
import history from '@/components/bus/searchHistory'
export default {
  components:{history},
  data() {
    return {
        value:'',
        cityid:'',
        busData:[],//搜索历史的数据
    }
  },
  methods: {
      //添加搜索历史到数据库
      addData(){
        const db = wx.cloud.database({env: 'ybb-901hf'})
        db.collection('busData').add({
            data:{
                _id:this.cityid+this.value,
                cityId:this.cityid,
                lineName:this.value
            },
            success:res=>{
                console.log('添加成功');
            }
        });
      },
      //展示数据
      showData(){
          const db = wx.cloud.database({env: 'ybb-901hf'})
          db.collection('busData').where({
              _openid:this.globalData.openid
            }).get({
            success:res=>{
                this.busData=res.data;
            }
        });
      },
      //移除数据
      removeData(){
        wx.cloud.callFunction({
            name:"busData"
            }).then(res=>{
                this.showData();
            }).catch(err=>{
                console.error(err)
        })
      },
      //子组件的移除按钮
      clear(){
          console.log(222)
          this.removeData();
      },
      onChange(e){
          this.value=e.mp.detail;
      },
      onSearch(){
        this.addData();
        mpvue.navigateTo({url:'../busLocation/main?busLine='+this.value+'&cityId='+this.cityid})
      },
      //从历史记录那里点击
      goBusLocation(name){
          console.log(name)
        mpvue.navigateTo({url:'../busLocation/main?busLine='+name+'&cityId='+this.cityid})
      },
      onCancel(){
      },
  },
  mounted(){
      this.showData();
  },
  onLoad(options){
      this.cityid=options.cityId;
  }
}
</script>

<style lang="less" scoped>
.index{
    background: rgba(132, 154, 174, 0.1);
}

</style>