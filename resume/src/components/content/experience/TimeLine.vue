<template>
  <div class="time-line">
    <div class="arrow"></div>
    <div class="line"></div>
  </div>
</template>
<script>
  export default {}
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .time-line
    display: flex
    flex-direction : column
    align-items: center
    padding: 1rem
    .arrow
      border-right: 0.5rem solid transparent;
      border-left: 0.5rem solid transparent;
      border-bottom: 1rem solid #aaa;
    .line
      flex-grow : 1
      border-right: 0.5rem solid #aaa
</style>
