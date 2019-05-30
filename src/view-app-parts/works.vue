<template>
  <v-container
    id="works"
    class="worksBackground"
    v-bind="{ [`grid-list-${size}`]: true }"
    fluid
  >
    <v-scale-transition
      :class="[$style.transitionDiv, 'layout']"
      tag="div"
      group
      origin="center center"
    >
      <my-work
        v-for="workItem in myWorks"
        :key="workItem.name"
        :p_workData="workItem"
        @toggletWork="onExpendWork"
        :ref="workItem.name"
      />
    </v-scale-transition>
  </v-container>
</template>

<script>
import query from '@/mixins/query'
import { myWork } from '@/components'

export default {
  name: 'Works',
  data () {
    return {
      myWorksData: null,
      selectedWorkNames: [],
      scrollTimeout: null
    }
  },
  components: {
    myWork
  },
  created () {
    this.initQuery('myWorksData', 'projects.json')
  },
  mounted () {
    console.log(this.$refs)
  },
  computed: {
    size () {
      return this.$vuetify.breakpoint.name
    },
    myWorks () {
      var works = this.myWorksData
      var selectedWorkNames = this.selectedWorkNames
      if (works) {
        works.forEach(workInfo => {
          var checkOfExpended = selectedWorkNames.indexOf(workInfo.name)
          workInfo.key = workInfo.name
          if (checkOfExpended >= 0) {
            workInfo.key += '+isExpended'
          }
        })
      }
      return works
    }
  },
  methods: {
    onExpendWork (_nameWork, _isExpended) {
      var idxSelectWork = this.selectedWorkNames.indexOf(_nameWork)
      if (idxSelectWork >= 0 && !_isExpended) {
        this.selectedWorkNames.splice(idxSelectWork, 1)
      } else if (idxSelectWork === -1 && _isExpended) {
        this.selectedWorkNames.push(_nameWork)
      }
      if (_isExpended) {
        if (this.scrollTimeout) {
          window.clearTimeout(this.scrollTimeout)
        }
        this.scrollTimeout = window.setTimeout(() => {
          this.smoothScroll(_nameWork)
          window.clearTimeout(this.scrollTimeout)
        } , 500)
      }
    },
    smoothScroll (_nameWork) {
      var element = this.$refs && this.$refs[_nameWork][0].$el || {}
      var top = element.getBoundingClientRect().top + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
    }
  },
  mixins: [
    query
  ]
}
</script>

<style module>
  .transitionDiv {
    flex-wrap: wrap;
    justify-content: center;
  }
</style>
