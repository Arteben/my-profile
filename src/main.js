import Vue from 'vue'
import '@/vuetify'
import root from '@/root-element.vue'
import router from '@/router'
// fonts
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@/assets/fonts/venture/venture.css'
import '@/assets/fonts/maincraft/maincraft.css'
import '@/assets/fonts/press-start/press-start.css'
import '@/assets/fonts/lobster/lobster.css'

import { eventsBus } from '@/utils'
import { getTranslates } from '@/translates'

import logMixin from '@/mixins/log'

Vue.mixin(logMixin)

Vue.config.productionTip = false
Vue.prototype.$eventsBus = new Vue(eventsBus)
const translateModule = getTranslates()
translateModule.router = router
Vue.prototype.$langs = new Vue(translateModule)

new Vue({
  router,
  render: h => h(root),
}).$mount('#app')
