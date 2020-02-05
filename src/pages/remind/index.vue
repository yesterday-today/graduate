<template>
  <div class="index">
      <remindList v-if="list==true"></remindList>
      <remindListNo v-if="list==false" @add="add"></remindListNo>
  </div>
</template>

<script>
import remindList from '@/components/bus/remindList'
import remindListNo from '@/components/bus/remindListNo'

export default {
    components:{remindList,remindListNo},
  data () {
      return{
          list:false
      }
  },

  methods: {
      add(){
        mpvue.navigateTo({url:'../addRemind/main'})
      }
  },
}
</script>

<style lang="less" scoped>

</style>
