<template>
  <v-layout
    row
    justify-start
    ma-1
  >
    <img
      :class="['mx-3', $style.workImage]"
      :src="getImgSrc(p_workData.img)"
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

import { getInfoImgSrc } from '@/utils'

export default {
  name: 'MyPrintedWork',
  props: {
    p_workData: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    getImgSrc (_dir) {
      return getInfoImgSrc(_dir)
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
