<template>
  <v-touch tag="div" id="baseInfo" class="card-container">
    <CardHeader :header-title="baseData.title"></CardHeader>
    <template v-for="item in baseData.items">
      <InfoItem :item-data="item"></InfoItem>
    </template>
  </v-touch>
</template>
<script>
  import CardHeader from '@/components/common/CardHeader'
  import InfoItem from '@/components/common/InfoItem'
  export default {
    props: ['baseData'],
    data () {
      return {}
    },
    components: {
      CardHeader,
      InfoItem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../common/style/index.styl"

  #baseInfo
    width: 25rem
    display: flex
    flex-wrap: wrap
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    #baseInfo
      display: flex
      flex-wrap: wrap
      width: auto
</style>
