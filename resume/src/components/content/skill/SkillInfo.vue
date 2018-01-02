<template>
  <div id="sillInfo" class="card-container">
    <CardHeader :header-title="skillData.title"></CardHeader>
    <template v-for="(group,index) in skillData.groups">
      <SkillGroup :group-data="group"></SkillGroup>
      <!--<div class="group-split" v-if="index < skillData.groups.length - 1"></div>-->
    </template>
  </div>
</template>
<script>
  import CardHeader from 'components/common/CardHeader'
  import SkillGroup from 'components/content/skill/SkillGroup'
  export default {
    props: ['skillData'],
    components: {
      CardHeader,
      SkillGroup
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .group-split
    height: 1px;
</style>
