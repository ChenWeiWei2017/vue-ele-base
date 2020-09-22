<template>
  <div>
    首页
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {

    }
  },
  created() {
    this.$http.get('/home/getData').then(res => {
      console.log(res)
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
