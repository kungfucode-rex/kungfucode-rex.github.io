<template>
  <div id="app" :class="config.lang" v-if="this.data != null">
    <KungfuHeader :header-info="data.headerInfo" v-on:changeLanguage="changeLanguage"></KungfuHeader>
    <KungfuContent :full-data="data"></KungfuContent>
    <div id="appBg"></div>
  </div>
</template>

<script>
  import KungfuHeader from '@/components/header/KungfuHeader'
  import KungfuContent from '@/components/content/KungfuContent'
  import Config from '@/config/config.js'
  import axios from 'axios'
  export default {
    name: 'app',
    components: {
      KungfuHeader,
      KungfuContent
    },
    data () {
      return {
        orignData: null,
        data: null,
        config: Config
      }
    },
    created () {
      axios.get('static/data.js', {
        responseType: 'json'
      })
        .then((response) => {
          this.orignData = response.data
          this.data = this.orignData[this.config.lang]
        })
        .catch(function (error) {
          console.log(error)
        })
    },
    methods: {
      changeLanguage () {
        if (Config.lang === 'en') {
          Config.lang = 'zh'
        } else {
          Config.lang = 'en'
        }
        this.data = this.orignData[this.config.lang]
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/style/index.styl"
  #app
    fix-position(0, 0, 0, 0)
    bg-img('../static/img/bg.jpg')
    font-smoothing: antialiased
    #appBg
      fix-position(0, 0, 0, 0)
      filter: blur(15px)
      background: inherit
      z-index: -1

</style>
