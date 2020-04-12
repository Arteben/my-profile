<template>
  <v-flex
    :class="{ 'worksTextColor--text': true, [$style[workItemWIdth]]: isExpanded }"
    class="lg3 md4 sm6 xs12 my-3"
    :mx-1="breakpointMdUp"
    column
    @click.stop="onClickIcon('expand')"
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
          class="text-xs-right pa-0"
          full
        >
          <template
            v-for="icon of icons"
          >
            <v-btn
              :key="icon.id + p_workData.link"
              :title="icon.title"
              @click.stop="onClickIcon(icon.id)"
              light
              ma-2
              icon
              flat
            >
              <v-icon
                large
              >{{ icon.name }}</v-icon>
            </v-btn>
          </template>
        </v-flex>
      </div>
    </div>
  </v-flex>
</template>

<script>

var workIcons = [
  {
    types: {
      outline: 'mdi-eye-outline',
      full: 'mdi-eye'
    },
    id: 'expand',
    isShow: true,
    title: 'раскрыть/свернуть'
  },
  {
    id: 'openGame',
    isShow: true,
    title: 'играть',
    types: {
      full: 'mdi-arrow-right'
    }
  }
]

export default {
  name: 'MyWork',
  data () {
    return {
      isExpanded: false,
    }
  },
  props: {
    p_workData: Object
  },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    icons () {

      return [...workIcons].map(_iconSet => {
        _iconSet.name = _iconSet.types.full
        if (_iconSet.id === 'expand' && !this.isExpanded) {
          _iconSet.name = _iconSet.types.outline
        }
        return _iconSet
      })
    },
    descriptionClass () {
      var descriptionClass
      descriptionClass = this.$style['shortWorkDescription']
      if (this.isExpanded) {
        descriptionClass = 'subheading my-3'
      }
      return descriptionClass
    },
    workItemWIdth () {
      return !this.breakpointMdUp && 'fullWidth' || 'halthWidth'
    }
  },
  methods: {
    getImageSrc (_dir) {
      var path = `http://coderjs.zz.vc/projects/${_dir}/info/`
      var img = this.isExpanded && 'img_big.PNG' || 'img.PNG'
      return path + img
    },
    onClickIcon(_iconId) {
      switch (_iconId) {
      case 'expand':
        this.isExpanded = !this.isExpanded
        this.$emit('toggletWork', this.p_workData.name, this.isExpanded)
        break
      case 'openGame':
        window.open(this.p_workData.link)
      }
    }
  }
}
</script>

<style module>
  .fullWidth {
    min-width: 100%;
  }
  .halthWidth {
    min-width: 40%;
  }
  .worksInContainer {
    background-color: var(--v-primary-base)
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
