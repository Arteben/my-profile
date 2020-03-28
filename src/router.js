import Vue from 'vue'
import Router from 'vue-router'
import { app, printView } from '@/views'

Vue.use(Router)

var scrollToSmoth = function (_anchor) {
  var toElement = document.querySelector(_anchor)
  if (toElement) {
    let offsetTop = toElement.offsetTop + 5
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }
}

export default new Router({
  // sinchronical
  // # - only for anchors,
  //'/' - root path, not '#/'
  mode: 'history',
  scrollBehavior (to) {

    if (to.hash && to.meta.isScroll) {
      scrollToSmoth(to.hash)
    }

    if (!to.meta.isScroll) {
      to.meta.isScroll = true
    }

    return false
  },
  routes: [
    {
      path: '/',
      name: 'app',
      meta: {
        isScroll: true
      },
      component: app
    },
    {
      path: '/print',
      name: 'print',
      component: printView
    }
  ]
})
