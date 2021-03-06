import colors from 'vuetify/es5/util/colors'

export const pushAppRouter = function ({_name, _pagePart, _lang}, _isReplace) {
  const route = this.$route
  const name = _name && _name || route.name
  const pagePart = _pagePart && _pagePart || route.params.pagePart
  const lang = _lang && _lang || route.params.lang
  if (_isReplace) {
    this.$router.replace({name, params: { lang, pagePart }})
  } else {
    this.$router.push({name, params: { lang, pagePart }})
  }
}

export const getCurrentPartAppAnchor = (function () {
  let timeout

  const isSetHashForElement = function (_elementName) {
    const element = this.$refs[_elementName][0].$el
    const bottomOffset = element.getBoundingClientRect().bottom
    return (bottomOffset - this.viewport.top >= 200)
  }

  const setHash = function () {
    if (this.$el) {
      const names = this.partsKeys
      for (const elementName of names) {
        if (isSetHashForElement.call(this, elementName)) {
          const route = this.$route
          const pagePart = route.params.pagePart
          if (route.name == 'app' && pagePart != elementName) {
            route.meta.isScroll = false
            pushAppRouter.call(this, { _pagePart: elementName })
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

export const rootLink = 'http://coderjs.link'

export const getInfoImgSrc = (_projectName = '', _isBig = false) => {
  const path = `${rootLink}/projects/${_projectName}/info/`
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
