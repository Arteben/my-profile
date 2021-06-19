<template>
  <v-layout
    row
    justify-start
    ma-1
  >
    <img
      :class="['mx-3', $style.workImage]"
      :src="getImageSrc(p_workData.img)"
      @load="$emit('loadImgWork')"
    >
    <v-flex
      column
    >
      <span class="display-1"> {{ p_workData.name }} </span>
      <div>
        <p
          v-for="(string) of p_workData.text"
          :key="string"
          class="body-1"
        > {{ string }} </p>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>

export default {
  name: 'MyPrintedWork',
  props: {
    p_workData: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    isExpanded (_flag) {
      this.$emit('toggletWork', this.p_workData.name, _flag)
    },
  },
  computed: {
    breakpointMdUp () {
      return this.$vuetify.breakpoint.mdAndUp
    },
  },
  methods: {
    getImageSrc (_dir) {
      var path = `http://coderjs.host/projects/${_dir}/info/`
      var img = this.isExpanded && 'img_big.PNG' || 'img.PNG'
      return path + img
    },
  },
}
</script>

<style module>
  .workImage {
    width: 100px;
    height: 100px;
    border-radius: 10px;
    object-fit: cover;
  }
</style>
