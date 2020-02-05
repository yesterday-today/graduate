<template>
  <div class="index">
    <div class="search">
        <van-search
        :value="value"
        placeholder="请输入搜索关键词"
        show-action
        @search="onSearch"
        @cancel="onCancel"
    />
    </div>
    <history></history>
  </div>
</template>

<script>
import history from '@/components/bus/searchHistory'
export default {
  components:{history},
  data() {
    return {
        value:''
    }
  },
  methods: {
      search(){

      },
      cancel(){
          
      }
  }
}
</script>

<style lang="less" scoped>
.index{
    background: rgba(132, 154, 174, 0.1);
}

</style>