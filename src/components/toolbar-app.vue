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
      >
        <v-layout
          :class="$style.wholeName"
          pa-2
          column
          align-end
        >
          <v-flex :class="$style.firstName">
            Артема
          </v-flex>
          <v-flex :class="$style.lastName">
            Бебенина
          </v-flex>
        </v-layout>
        <v-layout
          :class="[$style.lobsterFont, $style[siteNameFontSize]]"
          row
          px-4
          justify-start
          align-content-center
          wrap
        >
          <v-flex>
            <span :class="{ [$style.siteNameUnderline]: isMainPlace }">резюме</span>
            <span>&nbsp;и&nbsp;</span>
          </v-flex>
          <v-flex>
            <span :class="{ [$style.siteNameUnderline]: isMyWorksPlace }">проектики</span>
          </v-flex>
        </v-layout>
        <v-spacer />
      </v-layout>
    </v-toolbar-title>
  </v-toolbar>
</template>

<script>
export default {
  name: 'ToolbarApp',
  data () {
    return {
      // titlePlaceFontSize: titlePlaceNotXsFont
    }
  },
  computed: {
    isMobile () {
      var breakpoint = this.$vuetify.breakpoint || {}
      return breakpoint.smAndDown
    },
    toolbarHeight () {
      var height = 80
      if (this.isMobile) {
        height = 100
      }
      return height
    },
    siteNameFontSize () {
      var nameSize = 'siteNameFont'
      if (this.isMobile) {
        nameSize += 'Mobile'
      } else {
        nameSize += 'Desktop'
      }
      return nameSize
    },
    isMainPlace () {
      return true
    },
    isMyWorksPlace () {
      return false
    }
  }
}
</script>

<style module>
 .title {
    overflow: auto;
  }
  /* name person */
  .wholeName {
    min-width: 180px;
    font-family: "press-start", sans-serif;
  }
  .firstName {
    font-size: 30px;
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
    font-size: 25px;
  }
  .siteNameUnderline {
    text-decoration-line: underline;
  }
</style>
