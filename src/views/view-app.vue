<template>
  <v-app
    id="vuetify-app"
    ref="app"
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
      class="titleBackground"
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
import { getCurrentPartAppAnchor, getColorSwitcher } from '@/utils'
import { colorThems } from '@/utils'

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
  created () {
    let theme = this.$browserStorage.getData('colorTheme')
    if (theme == null) {
      theme = 'black'
      this.$browserStorage.setField('colorTheme', theme)
    }
    this.$vuetify.theme = colorThems[theme]
  },
  mounted () {
    this.$eventsBus.setListener('switchColors', getColorSwitcher.call(this), this)
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
