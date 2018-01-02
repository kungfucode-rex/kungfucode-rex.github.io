<template>
  <div id="header">
    <div class="out-container">
      <div class="top">
        <div v-bind:class="['title', config.changeLanguageClass]" v-if="config.languageChanged">{{headerInfo.title}}</div>
        <div class="right-info">
          <div class="language" @click="changeLangue">{{headerInfo.language}}</div>
          <div class="touxiang"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Config from '@/config/config'
  export default {
    props: ['headerInfo'],
    data () {
      return {
        config: Config
      }
    },
    created () {
      console.log(this.data)
    },
    methods: {
      changeLangue () {
        console.log('leave...')
        Config.languageChanged = false
        this.$nextTick(() => {
          this.$emit('changeLanguage')
          Config.languageChanged = true
        })
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/index.styl"

  #header
    width: 100%
    height: 10rem
    background: rgba(0, 0, 0, 0.6)
    .out-container
      .top
        display: flex
        justify-content: space-between
        max-width: 1024px
        margin: auto
        .title
          display: inline-block
          color: white
          line-height: 10rem
          font-size: 5rem
        .right-info
          display: flex
          .language
            color: #ddd
            font-size: 2rem
            cursor: pointer
            line-height: 10rem
            padding: 0 2rem
            &:hover
              background: rgba(0, 0, 0, 0.3)
          .touxiang
            width: 6rem
            height: 10rem
            bg-img('../../../static/img/touxiang.png')
            background-size: 100%
            background-position: center
</style>
<style lang="stylus" rel="stylesheet/stylus">

  @media (max-width: 767px)
    #header
      height: 6rem
      .out-container
        .top
          .title
            font-size: 3rem
            line-height: 6rem
          .right-info
            display: flex
            .language
              color: #ddd
              font-size: 1.6rem
              cursor: pointer
              line-height: 6rem
              padding: 0 1rem
              &:hover
                background: rgba(0, 0, 0, 0.3)
            .touxiang
              width: 5rem
              height: 5rem
              margin: 0.5rem

</style>
