<template>
  <div :class="{'half-width': itemData.size == 'half'}" class="info-item-wrapper">
    <v-touch tag="div" class="info-item" v-on:tap="hoverInfoItem" ref="infoItem">
      <div class="index-container" v-if="index != null">
        <span class="index">{{index + 1}}</span>
      </div>
      <div class="info-container" :class="config.changeLanguageClass" v-if="config.languageChanged">
        <span v-if="itemData.label" class="label"
              :class="itemData.iconClass">{{itemData.iconClass ? '' : itemData.label}}</span>
        <span v-if="itemData.label" class="split">|</span>
        <span class="text">{{itemData.text}}</span>
      </div>
    </v-touch>
  </div>
</template>
<script>
  import $ from 'n-zepto'
  import Config from '@/config/config'
  export default {
    props: ['itemData', 'index'],
    data () {
      return {
        config: Config
      }
    },
    methods: {
      hoverInfoItem () {
        $('.hover-info-item').removeClass('hover-info-item')
        $(this.$refs.infoItem.$el).addClass('hover-info-item')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .half-width
    width: 50% !important

  .half-width:nth-child(odd)
    width: calc(50% - 1px) !important
    margin-left: 1px

  .hover-info-item
    background-color: rgba(0, 0, 0, 0.5)!important
    color: white!important

  .info-item-wrapper
    width: 100%
    .info-item
      display: flex
      align-items: center
      padding: 1rem
      font-size: 1.5rem
      color: rgba(255, 255, 255, 0.8)
      margin-top: 1px
      background-color: rgba(0, 0, 0, 0.2)
      .index-container, .info-container
        display: inline-block
      .index-container
        width: 2rem
      .info-container
        display: flex
        width: 100%
        flex-grow: 1
      &:hover
        background-color: rgba(0, 0, 0, 0.5)
        color: white
      .split
        color: rgba(255, 255, 255, 0.2);
      .index
        font-size: 2rem
      .label
        display: inline-block
        width: 2rem
      .text
        margin-left: 0.5rem
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    .info-item-wrapper
      .info-item
        padding: 0.6rem
        margin-top: 1px
        font-size: 1.5rem
        .index-container
          padding-left: 0.5rem
        .label
          width: 2rem
          margin-right: 0.3rem
          padding-left: 0.5rem
        .text
          margin-left: 0.5rem
</style>
