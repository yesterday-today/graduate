<template>
  <div class="index">
      <find></find>
      <findList @go='go'></findList>
  </div>
</template>

<script>
import find from '@/components/bus/find'
import findList from '@/components/bus/findList'
export default {
  components:{find,findList},
  data () {
      return{
      }
  },
  methods:{
      go(){
        mpvue.navigateTo({url:'../busLocation/main'})
      },
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
</style>
