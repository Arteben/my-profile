import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import '@mdi/font/css/materialdesignicons.css'

import { browserStorageMethods, colorThemes } from '@/utils'

var isDark = browserStorageMethods.getData('isDark')
if (isDark == null) {
  isDark = true
  browserStorageMethods.setField('isDark', isDark)
} else {
  isDark = (isDark == 'true')
}

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    dark: isDark,
    themes: {
      light: colorThemes.light,
      dark: colorThemes.dark,
    },
    options: {
      customProperties: true,
    },
   },
  iconfont: 'mdi',
})

