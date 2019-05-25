<template>
  <v-flex
    class="worksTextColor--text"
    :lg3="!isExpanded"
    :md4="!isExpanded"
    :sm6="!isExpanded"
    xs12
    column
    :mx-1="breakpointMdUp"
    my-3
  >
    <div
      :class="['elevation-3', $style.worksInContainer]"
    >
      <v-img
        :aspect-ratio="!isExpanded && 3 || 2"
        :src="getImageSrc(p_workData.img)"
        :class="[$style.image]"
        max-height="500"
      />
      <div
        class="pa-4"
      >
        <div
          class="display-1 my-2"
        > {{ p_workData.name }} </div>
        <div>
          <p
            v-for="string of p_workData.text"
            :key="string"
          > {{ string }} </p>
        </div>
        <v-flex
          class="text-xs-right"
          full
          pa-0
        >
          <v-btn
            v-for="icon of workeIcons"
            :key="icon.id"
            @click="onClickIcon(icon.id)"
            fab
            light
            mx-2
          >
            <v-icon large>
              mdi-{{ icon.name }}
            </v-icon>
          </v-btn>
        </v-flex>
      </div>
    </div>
  </v-flex>
</template>

<script>

var workeIcons = [
  {
    name: 'eye',
    id: 'show',
  }
]

export default {
  name: 'MyWork',
  data () {
    return {
      workeIcons,
      isExpanded: false
    }
  },
  props: {
    p_workData: Object
  },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    }
  },
  methods: {
    getImageSrc (_dir) {
      return `http://coderjs.zz.vc/projects/${_dir}/info/img_big.jpg`
    },
    onClickIcon(_iconId) {
      switch (_iconId) {
      case 'show':
        this.isExpanded = !this.isExpanded
        break
      }
    }
  }
}
</script>

<style module>
  .worksInContainer {
    background-color: var(--v-worksBackground-lighten3)
  }
</style>
