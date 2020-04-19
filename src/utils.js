
export const getCurrentPartAppAnchor = (function () {
  var timeout

  var isSetHashForElement = function (_elementName) {
    var isSet = false
    var element = this.$refs[_elementName][0].$el
    var bottomOffset = element.getBoundingClientRect().bottom
    if (bottomOffset - this.viewport.top >= 200) {
      isSet = true
    }
    return isSet
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
    if (!breakpoint.xs) {
      timeout = window.setTimeout(() => {
        const element = this.$refs && this.$refs[_ref][0].$el || {}
        const elementTop = element.getBoundingClientRect().top
        const topWithCorrect = _withoutCorrect && (elementTop - 100) || (elementTop - 200)
        const top = topWithCorrect + window.scrollY
        window.scrollTo({ top, behavior: 'smooth' })
        window.clearTimeout(timeout)
      }, 400)
    }
  }
}())

export const eventsBus = {
  data: {
    sound: null,
    events: {
      'scrollApp': 'eventsBus_scrollApp'
    }
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
      }
    }
  }]
}
