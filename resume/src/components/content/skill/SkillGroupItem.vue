<template>
  <v-touch tag="div" class="item" v-on:tap="tapSkillItem">
      <span
        v-if="itemData.icon != ''"
        class="item-icon"
        :style="{backgroundImage:'url(static/img/' + itemData.icon + ')'}"></span>
      <span class="item-name">{{itemData.name}}</span>
      <span class="item-level" :style="styleObject"></span>
  </v-touch>
</template>
<script>
  import $ from 'n-zepto'
  export default {
    props: ['itemData'],
    data () {
      return {
        styleObject: {
          width: this.itemData.level + '%',
          left: -this.itemData.level + '%'
        }
      }
    },
    methods: {
      tapSkillItem () {
        $('.hover-item').removeClass('hover-item')
        $(this.$el).addClass('hover-item')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .sill-group
    .items-container
      .item
        display: flex
        flex-grow: 1
        position: relative
        align-items: center
        line-height: 3rem
        padding: 0 0.5rem
        margin-top: 1px
        margin-left: 1px
        background-color: rgba(0, 0, 0, 0.3)
        overflow: hidden
        &:hover
          background-color: rgba(0, 0, 0, 0.5)
        .item-icon
          width: 1.5rem
          height: 1.5rem
          display: inline-block
          background-size: contain
          opacity: 0.6
          margin: 0.25rem
          margin-right: 0.5rem
        .item-name
          color: #ddd
          font-size: 1.3rem
        .item-level
          position: absolute
          top: 0
          bottom: 0
          background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0.5) 100%)
        &:hover .item-level
          animation: skillMoving 2s
          animation-fill-mode: forwards
      .hover-item .item-level
        animation: skillMoving 2s
        animation-fill-mode: forwards

  @keyframes skillMoving {
    0% {

    }
    100% {
      left: 0
    }
  }
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    .sill-group
      .items-container
        .item
          .item-name
            font-size: 1.2rem
</style>
