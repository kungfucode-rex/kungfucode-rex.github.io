<template>
  <v-touch tag="div" class="sill-group" ref="group" v-on:tap="hoverSkillGroup">
    <div class="group-name">
      <div v-html="groupData.groupName" v-bind:class="config.changeLanguageClass" v-if="config.languageChanged"></div>
    </div>
    <div class="items-container">
      <template v-for="item in groupData.items">
        <SkillGroupItem :item-data="item"></SkillGroupItem>
      </template>
    </div>
  </v-touch>
</template>
<script>
  import $ from 'n-zepto'
  import Config from '@/config/config'
  import CardHeader from 'components/common/CardHeader'
  import SkillGroupItem from 'components/content/skill/SkillGroupItem'
  export default {
    props: ['groupData'],
    components: {
      CardHeader,
      SkillGroupItem
    },
    data () {
      return {
        config: Config,
        hoverSkillGroupClass: ''
      }
    },
    methods: {
      hoverSkillGroup () {
        $('.hover-skill-group').removeClass('hover-skill-group')
        $(this.$el).addClass('hover-skill-group')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .hover-skill-group
    background-color: rgba(0, 0, 0, 0.3)

  .sill-group
    display: flex
    &:hover
      background-color: rgba(0, 0, 0, 0.3)
    .group-name
      display: flex
      justify-content: center
      align-items: center
      width: 10rem
      margin-top: 1px
      flex-shrink: 0
      color: #ddd
      font-size: 1.5rem
      background-color: rgba(0, 0, 0, 0.3)
    .items-container
      flex-grow: 1
      display: flex
      flex-wrap wrap

</style>
