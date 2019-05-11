<template>
  <v-app dark>
    <toolbar-app
      @clickSideIcon="turnShowDrawer"
    />
    <v-navigation-drawer
      v-model="isShowDrawer"
      fixed
      app
      disable-resize-watcher
    >
      <nav-drawer-app-content />
    </v-navigation-drawer>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import toolbarApp from '@/components/toolbar-app'
import navDrawerAppContent from '@/components/nav-drawer-app-content'

export default {
  name: 'App',
  data () {
    return {
      isShowDrawer: false
    }
  },
  components: {
    toolbarApp,
    navDrawerAppContent
  },
  watch: {
    '$vuetify.breakpoint.smAndDown' (_newVal) {
      if (!_newVal) {
        this.isShowDrawer = false
      }
    }
  },
  methods: {
    turnShowDrawer () {
      this.isShowDrawer = true
    }
  }
}
</script>
