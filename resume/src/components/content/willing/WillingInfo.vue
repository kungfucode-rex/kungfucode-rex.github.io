<template>
  <div id="willingInfo" class="card-container">
    <CardHeader :header-title="willingData.title"></CardHeader>
    <template v-for="(item, index) in willingData.willings">
      <InfoItem :index="index" :item-data="{text:item}"></InfoItem>
    </template>
  </div>
</template>
<script>
  import CardHeader from 'components/common/CardHeader'
  import InfoItem from 'components/common/InfoItem'
  export default {
    props: ['willingData'],
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
  #willingInfo
    width: 30rem
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    #willingInfo
      display: flex
      flex-wrap: wrap
      width: auto
      .card-header
        width: 100%
      .info-item
        width: 100%
        .info-container
          justify-content: center
</style>
