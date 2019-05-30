<template>
  <v-flex
    :class="{ 'worksTextColor--text': true, [$style.fullWidth]: isExpanded }"
    :mx-1="breakpointMdUp"
    column
    lg3
    md4
    sm6
    xs12
    my-3
  >
    <div
      :class="[isExpanded && 'elevation-8' || 'elevation-3', $style.worksInContainer]"
    >
      <v-img
        :aspect-ratio="!isExpanded && 3 || 2"
        :src="getImageSrc(p_workData.img)"
        :class="[$style.image]"
        max-height="500"
      />
      <div
        :class="isExpanded && 'pa-4' || 'pa-2'"
      >
        <div
          class="display-1 my-2"
        > {{ p_workData.name }} </div>
        <div
          :class="descriptionClass"
        >
          <p
            v-for="(string) of p_workData.text"
            :class="{ [$style.shortWorkDescriptionLines]: !isExpanded }"
            :key="string"
          > {{ string }} </p>
        </div>
        <v-flex
          class="text-xs-right"
          full
          pa-0
        >
          <template
            v-for="icon of workeIcons"
          >
            <v-btn
              v-if="icon.isShow"
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
          </template>
        </v-flex>
      </div>
    </div>
  </v-flex>
</template>

<script>

var workeIcons = [
  {
    name: 'eye-outline',
    id: 'expand',
    isShow: true
  }
]

export default {
  name: 'MyWork',
  data () {
    return {
      isExpanded: false
    }
  },
  props: {
    p_workData: Object
  },
  watch: {
    isExpanded (_flag) {
      this.$emit('toggletWork', this.p_workData.name, _flag)
    }
  },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    workeIcons () {
      var icons = workeIcons
      icons.forEach(icon => {
        if (icon.id === 'expand') {
          let isEyeFull = (this.isExpanded && icon.name !== 'eye')
          icon.name = isEyeFull && 'eye' || 'eye-outline'
        }
      })
      return icons
    },
    descriptionClass () {
      var descriptionClass
      descriptionClass = this.$style['shortWorkDescription']
      if (this.isExpanded) {
        descriptionClass = 'subheading my-3'
      }
      return descriptionClass
    }
  },
  methods: {
    getImageSrc (_dir) {
      return `http://coderjs.zz.vc/projects/${_dir}/info/img_big.jpg`
    },
    onClickIcon(_iconId) {
      switch (_iconId) {
      case 'expand':
        this.isExpanded = !this.isExpanded
        break
      }
    }
  }
}
</script>

<style module>
  .fullWidth {
    min-width: 100%;
    max-width: 100%;
  }
  .worksInContainer {
    background-color: var(--v-worksBackground-lighten3)
  }
  .shortWorkDescription {
    max-height: 20px;
    overflow: hidden;
  }
  .shortWorkDescriptionLines {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
