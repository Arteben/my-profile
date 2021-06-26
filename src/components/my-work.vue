<template>
  <v-flex
    :class="workItemWIdthClasses"
  >
    <v-card
      light
      hover
      @click.stop="onClickCard('expand')"
      :class="[`pa-${isExpanded && 4 || 1}`]"
    >
      <v-img
        :aspect-ratio="!isExpanded && 3 || 2"
        :src="getImageSrc()"
        :lazy-src="getImageSrc('lazy')"
        :key="'img' + isExpanded"
        max-height="500"
      />
      <v-flex
        px-1
      >
        <v-card-title
          class="headline
                font-weight-medium
                px-0 py-3"
        >{{ p_workData.name }}</v-card-title>
        <template
          v-for="(string, idx) of p_workData.text"
        >
          <p
            :key="string"
            v-if="isExpanded || idx === 0 "
            class="subheading font-weight-regular"
            :class="{ 'text-truncate': !isExpanded }"
            column
            full
          > {{ string }} </p>
        </template>
      </v-flex>
      <v-card-actions>
        <v-spacer />
        <v-btn
          @click.stop="onClickIconOpenGame()"
          icon
        >
          <v-icon
            large
          >mdi-arrow-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  name: 'MyWork',
  data () {
    return {
      isExpanded: false,
    }
  },
  props: { p_workData: Object },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
    workItemWIdthClasses () {
      return this.isExpanded
        ? 'lg4 md sm12'
        : 'lg3 md3 sm4'
    },
  },
  methods: {
    getImageSrc (_isLazy) {
      var dir = this.p_workData.img
      var path = `http://coderjs.host/projects/${dir}/info/`
      var img = (_isLazy || !this.isExpanded) && 'img.jpg' || 'img_big.jpg'
      return path + img
    },
    onClickCard() {
      this.isExpanded = !this.isExpanded
      this.$emit('toggleWork', {
        ref: this.p_workData.name,
        isExpanded:  this.isExpanded,
      })
    },
    onClickIconOpenGame() {
      window.open(this.p_workData.link)
    },
  },
}
</script>
