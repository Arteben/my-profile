<template>
  <v-flex
    class="lg3 md4 sm6 xs12"
    :class=" { [$style[workItemWIdth]]: isExpanded}"
  >
    <v-card
      light
      hover
      @click.stop="onClickCard('expand')"
      :class="[`pa-${isExpanded && 4 || 1}`, $style.card]"
    >
      <v-img
        :aspect-ratio="!isExpanded && 3 || 2"
        :src="getImageSrc()"
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
    workItemWIdth () {
      return !this.breakpointMdUp && 'fullWidth' || 'halthWidth'
    }
  },
  methods: {
    getImageSrc () {
      var dir = this.p_workData.img
      var path = `http://coderjs.zz.vc/projects/${dir}/info/`
      var img = this.isExpanded && 'img_big.PNG' || 'img.PNG'
      return path + img
    },
    onClickCard() {
      this.isExpanded = !this.isExpanded
      this.$emit('toggletWork', this.p_workData.name, this.isExpanded)
    },
    onClickIconOpenGame() {
      window.open(this.p_workData.link)
    }
  }
}
</script>

<style module lang="less">
  .fullWidth {
    min-width: 100%;
  }
  .halthWidth {
    min-width: 100%;
  }
</style>
