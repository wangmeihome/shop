<template>
  <div>
    <myHeader></myHeader>
    <router-view class="main"></router-view>
    <myFooter></myFooter>
  </div>
</template>

<script>
  import myHeader from '../common/header.vue'
  import myFooter from '../common/footer.vue'

  export default {
    components:{
      myHeader,myFooter
    }
  }
</script>

<style>

</style>

