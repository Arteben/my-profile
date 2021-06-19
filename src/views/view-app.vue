<template>
  <v-app
    id="vuetify-app"
    ref="app"
    dark
    v-resize="setVieport"
    v-scroll="onScrollApp"
  >
    <toolbar-app
      ref="toolbar"
      @clickSideIcon="showDrawer"
    />
    <v-navigation-drawer
      v-model="isShowDrawer"
      fixed
      app
      disable-resize-watcher
      width="150"
    >
      <nav-drawer-app-content />
    </v-navigation-drawer>
    <v-content>
      <v-container
        pa-0
        fluid
      >
        <component
          v-for="partName of partsKeys"
          :key="partName"
          :is="partName"
          :ref="partName"
          :style="minPartsAppHeight"
        />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import {
  toolbarApp,
  navDrawerAppContent,
} from '@/components'

import * as parts from '@/view-app-parts'
import { getCurrentPartAppAnchor } from '@/utils'

let scrollEventTimeout = null

export default {
  name: 'ViewApp',
  data () {
    return {
      isShowDrawer: false,
      viewport: {},
      partsKeys: Object.keys(parts),
    }
  },
  components: {
    toolbarApp,
    navDrawerAppContent,
    resume: parts.resume,
    works: parts.works,
  },
  watch: {
    '$vuetify.breakpoint.smAndDown' (_newVal) {
      if (!_newVal) {
        this.isShowDrawer = false
      }
    },
  },
  mounted() {
    var route = this.$route
    if (!route.hash) {
      route.meta.isScroll = false
      this.$router.push('/#' + this.partsKeys[0])
    }
    this.$eventsBus.sound = false
  },
  computed: {
    minPartsAppHeight () {
      var height = (this.viewport.height - this.viewport.top) || '0'
      return `min-height: ${height}px`
    },
  },
  methods: {
    onScrollApp () {
      if (!scrollEventTimeout) {
        scrollEventTimeout = window.setTimeout(() => {
          this.$eventsBus.callEvent('scrollApp')
          window.clearTimeout(scrollEventTimeout)
          scrollEventTimeout = null
        }, 1000)
      }

      getCurrentPartAppAnchor.call(this)
    },
    setVieport () {
      if (this.$el) {
        let viewport = {}
        viewport.height = window.innerHeight
        viewport.top = this.$refs.toolbar.$el.getBoundingClientRect().height
        this.viewport = viewport
      }
    },
    showDrawer () {
      this.isShowDrawer = true
    },
  },
}
</script>
