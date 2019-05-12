<template>
  <v-toolbar
    app
    :height="toolbarHeight"
  >
    <v-toolbar-side-icon
      v-if="isMobile"
      @click="$emit('clickSideIcon')"
    />
    <v-toolbar-title :class="$style.title">
      <v-layout
        raw
        fill-height
        align-center
      >
        <v-layout
          :class="$style.wholeName"
          pa-2
          column
          align-end
        >
          <v-flex :class="$style[getFontSizeFor('firstName')]">
            Артема
          </v-flex>
          <v-flex :class="$style.lastName">
            Бебенина
          </v-flex>
        </v-layout>
        <v-layout
          :style="shakeLinksStyle"
          :class="[$style.lobsterFont, $style[getFontSizeFor('siteNameFont')]]"
          row
          px-4
          justify-start
          align-content-center
          wrap
        >
          <v-flex>
            <partLink :p_item="{name: 'резюме', to: '#resume'}" />
            <span>&nbsp;и&nbsp;</span>
          </v-flex>
          <v-flex>
            <partLink :p_item="{name: 'проектики', to: '#works'}" />
          </v-flex>
        </v-layout>
        <v-spacer />
      </v-layout>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import partLink from './part-app-link'
export default {
  name: 'ToolbarApp',
  data () {
    return {
      shakeFactor: 0
    }
  },
  components: {
    partLink
  },
  mounted () {
    this.setShakeFactor()
  },
  computed: {
    isMobile () {
      var breakpoint = this.$vuetify.breakpoint || {}
      return breakpoint.smAndDown
    },
    toolbarHeight () {
      var height = 80
      if (this.isMobile) {
        height = 120
      }
      return height
    },
    isMainPlace () {
      return true
    },
    isMyWorksPlace () {
      return false
    },
    shakeLinksStyle () {
      var shakeStyle = null
      if (this.$vuetify.breakpoint.xs) {
        shakeStyle = {'transform': `rotate(${(this.shakeFactor)}deg)`}
      }
      return shakeStyle
    }
  },
  methods: {
    getFontSizeFor (_nameClass) {
      if (this.isMobile) {
        _nameClass += 'Mobile'
      } else {
        _nameClass += 'Desktop'
      }
      return _nameClass
    },
    setShakeFactor: (() => {
      var timeout
      var oldNum
      var num = 0.7
      var setNewTimeout = function () {
        if (timeout) {
          window.clearTimeout(timeout)
        }
        timeout = window.setTimeout(() => {
          if (!oldNum || oldNum > 0) {
            oldNum = -(num)
          } else {
            oldNum = num
          }
          this.shakeFactor = oldNum
          setNewTimeout.call(this)
        }, 500)
      }
      return function () {
        if (this.$vuetify.breakpoint.xs) {
          setNewTimeout.call(this)
        }
      }
    })()
  }
}
</script>

<style module>
 .title {
    overflow: auto;
  }
  /* name person */
  .wholeName {
    font-family: "press-start", sans-serif;
    flex-shrink: 0;
  }
  .firstNameDesktop {
    font-size: 30px;
  }
  .fistNameMobile {
    font-size: 20px;
  }
  .lastName {
    font-size: 14px;
  }
  /* name site */
  .lobsterFont {
    font-family: "lobster", sans-serif;
  }
  .siteNameFontDesktop {
    font-size: 40px;
  }
  .siteNameFontMobile {
    min-width: 160px;
    font-size: 30px;
  }
</style>
