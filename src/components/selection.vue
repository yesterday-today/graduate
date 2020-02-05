<template>
    <div class="index">
        <section>
            <section class="select_area" :style="areaStyle" v-if="isshow">
                <section class="select" v-for="(select,index) in data" :key="index">
                    <section class="label" :class="index==active?'active':''" :style="labelStyle" @click="showOption(index)">
                        <span class="label-text" v-if="result[index]==null">{{select.label}}</span>
                        <span class="label-text" v-if="result[index]!=null">{{result[index]}}</span>
                        <i class="iconfont icon-xiala" v-show="index!=active" mode="aspectFit"></i>
                        <i class="iconfont icon-plus-select-up" v-show="index==active" mode="aspectFit"></i>
                        <!-- <img class="labelImg" v-show="index!=active" src="../../static/images/choose.png" mode="aspectFit">
                        <img class="labelImg" v-show="index==active" src="../../static/images/choose-active.png" mode="aspectFit"> -->
                    </section>
                </section>
                <section class="options">
                    <section class="option-area" v-for="(select,index) in data" :key="index">
                        <section class="option" :data-value="option.value" ref="dataValue" v-for="(option,key) in select.option" :key="key" v-show="showOptions[index].show" @click="getChange($event,index,key)">
                        <img class="optionImg" v-show="index==active&&key==active2[index].choose" src="cloud://ybb-901hf.7962-ybb-901hf-1300364759/img/tack.png" mode="aspectFit">
                        <span class="option-text">{{option.name}}</span>
                        </section>
                    </section>
                </section>
            </section>
            <section :style="nouse"></section>
        </section>
    </div>
</template>

<script>
 export default {
    props:['data'],
    data(){
      return {
        //参数错误则不显示ui组件
        isshow:true,
        //显示的option内容
        showOptions:[],
        //选中的下拉框
        active:-1,
        //下拉框的选值
        active2:[],
        //返回信息
        res:{code:0,msg:'success'},
        // 整个组件样式
        areaStyle:'',
        //标题样式
        labelStyle:'',
        //负责占位的样式
        nouse:"",
        //处理结果
        result:[],
      }
    },
    methods:{
      //初始化设置
      init(){
        for(var i=0;i<this.data.length;i++){
          this.showOptions.push({'show':false});
          this.active2.push({'choose':-1});
          this.result.push(null);
        }
      },
      //检验标准
      ifTrue(){
        if(this.data.length>4||this.data.length<1){
          this.res = {
            code:-1,
            msg:'Vselect选项必须有1-4个'
          };
        }else if (typeof(this.align) != 'undefined' && this.align!="left" && this.align!="center"){
          this.res = {
            code:-2,
            msg:'align参数错误，默认为left，可选值为left、center'
          };
          return false
        }else if (typeof(this.fix) != 'undefined' && this.fix!='' && this.fix!="true" && this.fix!="false"){
          this.res = {
            code:-3,
            msg:'fix参数错误，默认为false，可选值为true、false'
          };
        }
        else{
          return true;
        }
      },
      //进行渲染
      isTrue(){
        if(this.ifTrue()){
          this.setLabelWidth();
        }else{
          this.isshow = false;
          console.log({error:this.res});
        }
      },
      //设置宽度
      setLabelWidth(){
        this.labelStyle += `width:${750/this.data.length}rpx;`;
      },
      // 显示选项
      showOption(index){
        //设置样式
        if(this.active == index){
          this.active = -1;
        }else{
          this.active = index;
        }
        //显示选项
        if(this.showOptions[index].show == true){
          this.showOptions[index].show = false;
        }else{
          for(var i=0;i<this.showOptions.length;i++){
            this.showOptions[i].show = false;
          }
          this.showOptions[index].show = true;
        }
      },
      //一改变获取结果函数
      getChange(e,index,key){
          setTimeout(()=>{
              this.showOptions[index].show=false;
              this.active=-1;
          },300);
        this.active2[index].choose = key;
        this.result[index] = e.currentTarget.dataset.value;
        this.$emit('change',this.result)
      },
    },
    mounted(){
      this.isTrue();
    },
    created(){
      this.init();
    }
  }
</script>

<style lang="less" scoped>
  .select_area{
    height: auto;
  }
  .select{
    display:inline-block;
    width:25%;
  }
  .label{
    padding-top:16rpx;
    height:50rpx;
    font-size:24rpx;
    margin-left: 20rpx;
  }
  .label-text{
    padding-left:20rpx;
    float: left;
  }
  .active{
    color:#fe7723;
  }
  .options{
    width: 100%;
    animation:10rpx;
    border-bottom: 1rpx solid #CCCCCC;
    position: absolute;
    background: #ffffff;
  }
  .option-area{
    max-height:300rpx;
    overflow:auto;
  }
  //编辑选择字体颜色
  .option{
    // border-top: 1rpx solid #CCCCCC;
    padding: 10rpx;
    font-size: 20rpx;
    line-height:50rpx;
    position: relative;
  }
  .option-text{
    font-size:22rpx;
    height:50rpx;
    margin-left:100rpx;
  }
  i{
    padding-left:16rpx;
    padding-top: 0rpx;
    font-size:35rpx;
    float: left;
  }
  .optionImg{
    position: absolute;
    margin-top:4rpx;
    margin-left:16px;
    width:40rpx;
    height:40rpx;
  }
</style>