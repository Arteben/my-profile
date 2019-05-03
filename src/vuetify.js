import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

import colors from 'vuetify/es5/util/colors'

Vue.use(Vuetify, {
  theme: {
    mainTextColor: colors.grey.lighten5,
    mainBackground: colors.grey.darken4,
    primary: colors.grey.darken2,
    // secondary: colors.blueGrey.darken4,
    // accent: colors.deepPurple.darken1,
    // error: '#FF5252',
    // info: '#2196F3',
    // success: '#4CAF50',
    // warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi',
})
