<template>
  <div id="experienceInfo" class="card-container">
    <CardHeader :header-title="experienceData.title"></CardHeader>
    <div class="experience-content">
      <TimeLine></TimeLine>
      <div class="experience-container">
        <template v-for="item in experienceData.items">
          <ExperienceItem v-on:rescroll="rescroll" :item-data="item"></ExperienceItem>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import CardHeader from 'components/common/CardHeader'
  import TimeLine from 'components/content/experience/TimeLine'
  import ExperienceItem from 'components/content/experience/ExperienceItem'
  export default {
    props: ['experienceData'],
    components: {
      CardHeader,
      TimeLine,
      ExperienceItem
    },
    methods: {
      rescroll () {
        this.$emit('rescroll')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .experience-content
    display: flex
    justify-content: space-between
    align-items: stretch
    .experience-container
      width: 100%
      .experience-item
        flex-grow: 1
</style>
