<template>
  <div id="content" class="out-container" ref="content">
    <div class="content-wrapper">
      <div class="left">
        <WillingInfo :willing-data="fullData.willingInfo"></WillingInfo>
        <BaseInfo :base-data="fullData.baseInfo"></BaseInfo>
        <EducationInfo :education-data="fullData.educationInfo"></EducationInfo>
      </div>
      <div class="right">
        <SkillInfo :skill-data="fullData.skillInfo"></SkillInfo>
        <ExperienceInfo v-on:rescroll="reScroll" :experience-data="fullData.experienceInfo"></ExperienceInfo>
      </div>
    </div>
  </div>
</template>
<script>
  import WillingInfo from 'components/content/willing/WillingInfo'
  import BaseInfo from 'components/content/base/BaseInfo'
  import EducationInfo from 'components/content/education/EducationInfo'
  import SkillInfo from 'components/content/skill/SkillInfo'
  import ExperienceInfo from 'components/content/experience/ExperienceInfo'
  import BScrool from 'better-scroll'
  export default {
    props: ['fullData'],
    components: {
      BaseInfo,
      WillingInfo,
      EducationInfo,
      SkillInfo,
      ExperienceInfo
    },
    created () {
      this.$nextTick(() => {
        /* eslint-disable no-new */
        this.scroll = new BScrool(this.$refs.content)
      })
    },
    methods: {
      reScroll () {
        this.scroll._resize()
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/style/index.styl"
  #content
    position: fixed
    top: 10rem
    bottom: 0
    width: 100%
    max-width: 1024px
    margin: auto calc(50% - 512px)
    .content-wrapper
      display: flex
      justify-content: center
      flex-direction: row
      .left
        flex-grow: 0
        .left-container
          height: 40rem
          background-color: green
      .right
        flex: 2
        flex-grow: 1
        flex-shrink: 0
        padding-bottom: 2rem
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    #content
      top: 6rem
      width: 90%
      margin: auto 5%
      .content-wrapper
        flex-direction: column
        .left
          flex: 1
          flex-grow: 1
        .right
          flex: 1
          width: 100%
          padding-bottom: 2rem
</style>
