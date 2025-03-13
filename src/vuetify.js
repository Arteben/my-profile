import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import { browserStorageMethods, colorThems } from '@/utils'

let theme = browserStorageMethods.getData('colorTheme')
if (theme == null) {
  theme = 'black'
  browserStorageMethods.setField('colorTheme', theme)
}

Vue.use(Vuetify)

export default new Vuetify({
  theme: colorThems[theme],
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
})

