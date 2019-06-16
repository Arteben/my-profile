<template>
  <v-toolbar
    app
    :height="toolbarHeight"
  >
    <v-toolbar-side-icon
      v-if="isExtraSmall"
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
          :class="[$style.lobsterFont, $style.siteName, $style[getFontSizeFor('siteNameFont')]]"
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
        <!-- added icons for app panel -->
        <v-flex
          v-if="!isExtraSmall"
          nowrap
        >
          <v-btn
            v-for="icon of addedIcons"
            :key="icon.id"
            :title="icon.title"
            @click="onClickIcon(icon.id)"
            icon
            flat
          >
            <v-icon
              large
            >mdi-{{ icon.name }}</v-icon>
          </v-btn>
        </v-flex>
      </v-layout>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
import partLink from './part-app-link'

var addedIcons = [
  {
    id: 'print',
    name: 'printer',
    title: 'Печатать'
  }
]

export default {
  name: 'ToolbarApp',
  data () {
    return {
      shakeFactor: 0,
      addedIcons
    }
  },
  watch: {
    isExtraSmall: {
      handler (_isBreakpoint) {
        if (_isBreakpoint) {
          this.setShakeFactor()
        }
      },
      immediate: true
    }
  },
  components: {
    partLink
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
    isExtraSmall () {
      return this.$vuetify.breakpoint.xs
    },
    shakeLinksStyle () {
      var shakeStyle = null
      var factor = this.shakeFactor
      if (this.isExtraSmall) {
        shakeStyle = {'transform': `rotate(${factor}deg)`}
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
      var num = 1
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
          if (this.isExtraSmall) {
            setNewTimeout.call(this)
          }
        }, 2000)
      }
      return function () {
        setNewTimeout.call(this)
      }
    })(),
    onClickIcon (_iconId) {
      switch(_iconId) {
      case 'print':
        this.$router.push({name: 'print'})
      }
    }
  }
}
</script>

<style module>
 .title {
    overflow: auto;
    min-width: 100%;
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
  .siteName {
    flex-grow: 0
  }
  .siteNameFontDesktop {
    font-size: 40px;
  }
  .siteNameFontMobile {
    min-width: 160px;
    font-size: 30px;
  }
</style>
