
export const getCurrentPartAppAnchor = (function () {
  var timeout

  var isSetHashForElement = function (_elementName) {
    var isSet = false
    var element = this.$refs[_elementName][0].$el
    var bottomOffset = element.getBoundingClientRect().bottom
    if (bottomOffset - this.viewport.top >= 0) {
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
    }, 1000)
  }
}())
