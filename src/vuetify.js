import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

import { colorThems } from '@/utils'

Vue.use(Vuetify, {
  theme: colorThems.black,
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
})
