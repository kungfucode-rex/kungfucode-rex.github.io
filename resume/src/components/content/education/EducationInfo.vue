<template>
  <div id="educationInfo" class="card-container">
    <CardHeader :header-title="educationData.title"></CardHeader>
    <template v-for="(item, index) in educationData.educations">
      <InfoItem :index="index" :item-data="{text: item.title + ' (' + item.date + ')'}"></InfoItem>
      <InfoItem :item-data="{text:item.school}"></InfoItem>
    </template>
  </div>
</template>
<script>
  import CardHeader from 'components/common/CardHeader'
  import InfoItem from 'components/common/InfoItem'
  export default {
    props: ['educationData'],
    components: {
      CardHeader,
      InfoItem
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  #educationInfo
    width: 30rem
    .info-item
      margin-top: 0
    .info-item-wrapper:nth-child(even)
      .info-item
        margin-top: 1px
</style>
<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    #educationInfo
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
