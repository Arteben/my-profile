import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    primary: colors.grey.lighten4,
    secondary: colors.grey.darken3,
    worksTextColor: 'black',
    worksBackground: colors.grey.lighten1,
    // secondary: colors.blueGrey.darken4,
    // accent: colors.deepPurple.darken1,
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107'
  },
  options: {
    customProperties: true,
  },
  iconfont: 'mdi',
})
