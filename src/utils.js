import colors from 'vuetify/es5/util/colors'

export const getCurrentPartAppAnchor = (function () {
  var timeout

  var isSetHashForElement = function (_elementName) {
    var element = this.$refs[_elementName][0].$el
    var bottomOffset = element.getBoundingClientRect().bottom
    return (bottomOffset - this.viewport.top >= 200)
  }

  var setHash = function () {
    if (this.$el) {
      let names = this.partsKeys
      for (let elementName of names) {
        if (isSetHashForElement.call(this, elementName)) {
          let hash = '#' + elementName
          let route = this.$route
          if (route.hash !== hash) {
            route.meta.isScroll = false
            this.$router.push('/' + hash)
          }
          break
        }
      }
    }
  }

  return  function () {
    if (timeout) {
      window.clearTimeout(timeout)
    }
    timeout = window.setTimeout(() => {
      setHash.call(this)
    }, 500)
  }
}())

export const scrollToElementHref = (function() {
  let timeout = null
  return function (_ref, _withoutCorrect) {
    if (timeout) {
      window.clearTimeout(this.scrollTimeout)
    }
    const breakpoint = this.$vuetify && this.$vuetify.breakpoint || {}
    const timeLoop = breakpoint.xs && 100 || 400
    timeout = window.setTimeout(() => {
      const element = this.$refs && this.$refs[_ref][0].$el || {}
      const elementTop = element.getBoundingClientRect().top
      const topWithCorrect = _withoutCorrect && (elementTop - 100) || (elementTop - 200)
      const top = topWithCorrect + window.scrollY
      window.scrollTo({ top, behavior: 'smooth' })
      window.clearTimeout(timeout)
    }, timeLoop)
  }
}())

export const eventsBus = {
  data: {
    sound: null,
    events: {
      'scrollApp': 'eventsBus_scrollApp',
      'switchColors': 'eventsBus_switchColors',
    },
  },
  mixins: [{
    methods: {
      callEvent(_name) {
        const event = this.events[_name]
        if (event) {
          this.$emit(event)
        }
      },
      setListener(_name, _callback, _component) {
        const event = this.events[_name]
        if (event) {
          this.$on(event, _callback)
          const the = this
          _component.$once('hook:beforeDestroy', (function () {
            const scope = { the, event, callback: _callback }
            return () => {
              scope.the.$off(scope.event, scope.callback)
            }
          }()))
        }
      },
    },
  }],
}

export const getInfoImgSrc = (_projectName = '', _isBig = false) => {
  const path = `http://coderjs.link/projects/${_projectName}/info/`
  const img = _isBig ? 'img_big.jpg' : 'img.jpg'
  return path + img
}

export const colorThems = {
  'black': {
    primaryText: '#FFF',
    primaryBackground: colors.grey.darken3,
    titleText: colors.grey.lighten5,
    titleBackground: colors.grey.darken4,
    worksTextColor: '#000',
    worksBackground: colors.grey.darken1,
  },
  'white': {
    primaryText: '#000',
    primaryBackground: colors.grey.lighten3,
    titleText: '#000',
    titleBackground: colors.grey.lighten5,
    worksTextColor: '#FFF',
    worksBackground: colors.grey.darken1,
  },
}

export const browserStorageMethods = (function() {
  const prefix = 'artem_profile_'
  const storeObject = window.localStorage
  return {
    setField(_field, _value) {
      const fieldName = prefix + _field
      storeObject.removeItem(fieldName)
      storeObject.setItem(fieldName, String(_value))
    },
    getData(_field) {
      const value = storeObject.getItem(prefix + _field)
      return value !== null && String(value) || value
    },
  }
}) ()

export const getColorSwitcher = function () {
  const vueApp = this
  return function () {
    const storageTheme = browserStorageMethods.getData('colorTheme')
    const newSet = (storageTheme == 'black') && 'white' || 'black'
    browserStorageMethods.setField('colorTheme', newSet)
    vueApp.$vuetify.theme = colorThems[newSet]
  }
}
