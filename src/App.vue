<template>
  <v-app dark>
    <v-toolbar
      app
      height="100"
    >
      <v-toolbar-title :class="$style.toolbarTitle">
        <v-layout
          raw
          xs12
        >
          <v-layout
            :class="$style.fullName"
            pa-2
            column
            align-end
            xs12
          >
            <v-flex :class="$style.firstName">
              Артема
            </v-flex>
            <v-flex :class="$style.lastName">
              Бебенина
            </v-flex>
          </v-layout>
          <v-layout
            :class="[$style.lobsterFont, $style[titlePlaceFontSize]]"
            row
            px-3
            justify-center
            align-content-center
            wrap
          >
            <v-flex>резюме и</v-flex>
            &nbsp;
            <v-flex>проекты</v-flex>
          </v-layout>
        </v-layout>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>

const titlePlaceNotXsFont = 'titleSiteBigSize'

export default {
  name: 'App',
  data () {
    return {
      titlePlaceFontSize: titlePlaceNotXsFont
    }
  },
  watch: {
    '$vuetify.breakpoint.name': {
      handler (_newName) {
        if (_newName == 'xs') {
          this.titlePlaceFontSize = 'titleSiteSmallSize'
        } else {
          this.titlePlaceFontSize = titlePlaceNotXsFont
        }
      },
      immediate: true
    }
  }
}
</script>

<style module>
  .toolbarTitle {
    overflow: visible;
  }
  .titleSiteBigSize {
     font-size: 35px;
  }
  .titleSiteSmallSize {
    font-size: 25px;
  }
  .fullName {
    min-width: 180px;
  }
  .firstName {
    font-family: "press-start", sans-serif;
    font-size: 30px;
    min-width: 180px;
  }
  .lastName {
    font-family: "press-start", sans-serif;
    font-size: 14px;
  }
  .lobsterFont {
    font-family: "lobster", sans-serif;
  }
</style>
