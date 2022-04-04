import Vue from 'vue'
import Router from 'vue-router'
import { app, printView } from '@/views'

Vue.use(Router)

const scrollToSmoth = function (_anchor) {
  const toElement = document.querySelector(_anchor)
  if (toElement) {
    let offsetTop = toElement.offsetTop + 5
    window.scrollTo({ top: offsetTop, behavior: 'smooth' })
  }
}

export default new Router({
  // /# - root,
  mode: 'hash',
  scrollBehavior (to) {
    if (to.name === 'app') {
      if (to.meta.isScroll && to.params.pagePart) {
        scrollToSmoth('#' + to.params.pagePart)
      } else {
        to.meta.isScroll = true
      }
    }

    return false
  },
  routes: [
    {
      path: '/:lang/:pagePart?',
      name: 'app',
      meta: {
        isScroll: true,
      },
      component: app,
    },
    {
      path: '/print/:lang/',
      name: 'print',
      component: printView,
    },
  ],
})
