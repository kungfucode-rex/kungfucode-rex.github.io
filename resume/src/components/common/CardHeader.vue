<template>
  <div class="card-header">
    <div v-bind:class="config.changeLanguageClass" v-if="config.languageChanged">{{headerTitle}}</div>
  </div>
</template>
<script>
  import Config from '@/config/config'
  export default {
    props: ['headerTitle'],
    data () {
      return {
        config: Config
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .card-header
    padding: 1rem
    font-size: 2rem
    text-align: center
    color: rgba(255, 255, 255, 1)
    background-color: rgba(0, 0, 0, 0.3)
</style>
