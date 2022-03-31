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

import { eventsBus, getTranslateMixin } from '@/utils'

import logMixin from '@/mixins/log'

Vue.mixin(logMixin)
Vue.mixin(getTranslateMixin())

Vue.config.productionTip = false
Vue.prototype.$eventsBus = new Vue(eventsBus)

new Vue({
  router,
  render: h => h(root),
}).$mount('#app')
