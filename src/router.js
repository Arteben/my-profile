import Vue from 'vue'
import Router from 'vue-router'
import * as views from '@/views'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: views.main
    }
  ]
})
