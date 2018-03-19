<template>
  <div class="experience-item">
    <div class="arrow-to-time-line"></div>
    <div class="experience-header">
      <div class="duration" :class="config.changeLanguageClass" v-if="config.languageChanged">
        {{itemData.duration}}
      </div>
      <div class="job-title" :class="config.changeLanguageClass" v-if="config.languageChanged">
        {{itemData.jobTitle}}
      </div>
    </div>
    <div class="company-info">
      <div class="company-icon" :style="{backgroundImage:'url(static/img/' + itemData.companyIcon + ')'}"></div>
      <div class="company-name" :class="config.changeLanguageClass" v-if="config.languageChanged">{{itemData.company}}
      </div>
      <div class="company-size" :class="config.changeLanguageClass" v-if="config.languageChanged">
        {{itemData.companySizeLabel}} {{itemData.companySize}}
      </div>
    </div>
    <div class="achievement-info">
      <div class="achievement-label" :class="config.changeLanguageClass" v-if="config.languageChanged">
        {{itemData.achievementLabel}}
      </div>
      <div class="achievements-container">
        <template v-for="(item, index) in itemData.achievements">
          <div class="achievement-container">
            <span class="index" :class="config.changeLanguageClass" v-if="config.languageChanged">{{index + 1}}.</span>
            <span class="achievement-title" :class="config.changeLanguageClass"
                  v-if="config.languageChanged">{{item.title}}
              <v-touch v-on:tap="toggleDescription('achievement',index,item)"
                       @click="toggleDescription('achievement',index,item)">
                <span class="toggle-description animated flash infinite"
                      :class="{'icon-angle-double-down':item.status === 'hide', 'icon-angle-double-up':item.status === 'show'}"></span>
              </v-touch>
            </span>
            <div :ref="'achievementDescription' + index"
                 :class="[config.changeLanguageClass, {'height-auto': item.status === 'show'}, {'height-0': item.status === 'hide'}]"
                 class="achievement-description"
                 v-if="config.languageChanged"
                 v-html="item.description">
            </div>
          </div>
        </template>
      </div>
    </div>
    <div class="project-info">
      <div class="project-label" :class="config.changeLanguageClass" v-if="config.languageChanged">
        {{itemData.projectLabel}}
      </div>
      <div class="projects-container">
        <template v-for="(item, index) in itemData.projects">
          <div class="project-container">
            <span class="index" :class="config.changeLanguageClass" v-if="config.languageChanged">{{index + 1}}.</span>
            <span class="project-title" :class="config.changeLanguageClass" v-if="config.languageChanged">{{item.title}}
              <v-touch v-on:tap="toggleDescription('project',index,item)"
                       @click="toggleDescription('project',index,item)">
                <span class="toggle-description animated flash infinite"
                      :class="{'icon-angle-double-down':item.status === 'hide', 'icon-angle-double-up':item.status === 'show'}"></span>
              </v-touch>
            </span>
            <div :ref="'projectDescription' + index"
                 :class="[config.changeLanguageClass, {'height-auto': item.status === 'show'}, {'height-0': item.status === 'hide'}]"
                 class="project-description">
              <div class="detail" :class="config.changeLanguageClass" v-if="config.languageChanged"
                   v-html="item.description"></div>
              <div class="duty-container">
                <div class="duty-label" :class="config.changeLanguageClass" v-if="config.languageChanged">
                  {{itemData.dutyLabel}}
                </div>
                <div class="duty" :class="config.changeLanguageClass" v-if="config.languageChanged">{{item.duty}}</div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import Config from '@/config/config'
  export default {
    props: ['itemData'],
    data () {
      return {
        config: Config
      }
    },
    methods: {
      toggleDescription (type, index, item) {
        let element = this.$refs[type + 'Description' + index][0]
        console.log(item.status)
        if (item.status === 'hide') {
          let beforeHeight = window.getComputedStyle(element).height
          element.style.height = 'auto'
          let afterHeight = window.getComputedStyle(element).height
          element.style.height = beforeHeight
          element.offsetWidth
          element.style.height = afterHeight
          item.status = 'show'
        } else {
          element.style.height = '0px'
          item.status = 'hide'
        }
        this.$emit('rescroll')
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .height-auto
    height: auto

  .height-0
    height: 0

  .indent-block
    width: 2.5rem
    display: inline-block

  .experience-item
    position: relative
    background-color: rgba(0, 0, 0, 0.2)
    margin: 2rem 1rem
    color: rgba(255, 255, 255, 0.8)
    font-size: 1.5rem
    .arrow-to-time-line
      position: absolute
      left: -2rem
      border-right: 2rem solid rgba(0, 0, 0, 0.35)
      border-top: 1.5rem solid transparent
      border-bottom: 1.5rem solid transparent
    .experience-header
      display: flex
      justify-content: space-between
      line-height: 3rem
      background-color: rgba(0, 0, 0, 0.2)
      .job-title
        padding-right: 1rem
    .company-info
      display: flex
      .company-icon
        width: 5rem
        height: 3rem
        margin: 1rem
        background-position: center
        background-repeat: no-repeat
        background-size: contain
      .company-name
        line-height: 5rem
        font-size: 2rem
      .company-size
        line-height: 5rem
        font-size: 1.2rem
        flex-grow: 1
        text-align: right
        padding-right: 1rem
    .achievement-info
      display: flex
      background-color: rgba(0, 0, 0, 0.1)
      .achievement-label
        padding: 1rem
        padding-top: 1.5rem
      &:hover .achievement-label
        background-color: rgba(0, 0, 0, 0.3)
      .achievements-container
        flex-grow: 1
        line-height: 2.5rem
        overflow: hidden
        border-left: 1px solid rgba(255, 255, 255, 0.1)
        .achievement-container
          overflow: hidden
          padding: 1rem
          position: relative
          &:hover
            background-color: rgba(0, 0, 0, 0.5)
          &:not(:first-child)
            border-top: 1px solid rgba(255, 255, 255, 0.1)
          .toggle-description
            float: right
            padding: 0.5rem
            height: 2rem
            border-radius: 1rem
            cursor: pointer
            width: 2rem
            background-color: rgba(0, 0, 0, 0.3)
            text-align: center
            position: absolute;
            right: 1rem;
            top: 1rem;
            animation-duration: 3s
            &:hover
              background-color: rgba(0, 0, 0, 0.5)
          .achievement-description
            overflow: hidden;
            text-indent: 2.5rem
            transition: height 250ms
            transform: translate3d(0, 0, 0)
    .project-info
      display: flex
      background-color: rgba(0, 0, 0, 0.1)
      border-top: 2px solid rgba(255, 255, 255, 0.1)
      .project-label
        padding: 1rem
        padding-top: 1.5rem
      &:hover .project-label
        background-color: rgba(0, 0, 0, 0.3)
      .projects-container
        flex-grow: 1
        line-height: 2.5rem
        overflow: hidden
        border-left: 1px solid rgba(255, 255, 255, 0.1)
        .project-container
          overflow: hidden
          padding: 1rem
          position: relative
          &:hover
            background-color: rgba(0, 0, 0, 0.5)
          &:not(:first-child)
            border-top: 1px solid rgba(255, 255, 255, 0.1)
          .toggle-description
            float: right
            padding: 0.5rem
            height: 2rem
            border-radius: 1rem
            cursor: pointer
            width: 2rem
            background-color: rgba(0, 0, 0, 0.3)
            text-align: center
            position: absolute;
            right: 1rem;
            top: 1rem;
            animation-duration: 3s
            &:hover
              background-color: rgba(0, 0, 0, 0.5)
          .project-description
            overflow: hidden;
            transition: height 250ms
            transform: translate3d(0, 0, 0)
            .duty-container
              .duty
                text-indent: 2.5rem
</style>

<style lang="stylus" rel="stylesheet/stylus">
  @media (max-width: 767px)
    .experience-item
      .experience-header
        .duration
          font-size: 1.2rem
        .job-title
          font-size: 1.2rem
      .achievement-info
        flex-direction: column
        .achievement-container
          font-size: 1rem
          border-top: 1px solid rgba(255,255,255,0.1)
          .achievement-description
            line-height: 1.5rem
      .project-info
        flex-direction: column
        .project-container
          font-size: 1rem
          border-top: 1px solid rgba(255,255,255,0.1)
          .project-description
            line-height: 1.5rem
</style>
