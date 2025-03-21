<template>
  <v-app-bar
    app
    height="80"
    class="titleBackground"
  >
    <v-btn
      icon
      v-if="isMedium"
      @click="$emit('clickSideIcon')"
      :class="$style.sideIcon"
    >
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    <v-toolbar-title
      :class="$style.title"
    >
      <v-layout
        raw
        fill-height
        align-center
      >
        <v-layout
          :class="[$style.wholeName, isExtraSmall ? 'mr-4' : 'mr-16']"
          column
          align-end
          mr-10
        >
          <v-flex
            :class="[$style.firstName, isMobile && $style.firstName_mobile]"
          > {{ $langs.title('head_name') }} </v-flex>
          <v-flex
            :class="[$style.lastName, isMobile && $style.lastName_mobile]"
          > {{ $langs.title('head_lastname') }} </v-flex>
        </v-layout>
        <v-layout
          :class="[$style.lobsterFont, $style.siteName, $style[getClassFontSizeFor('siteNameFont')]]"
          row
          justify-start
          align-content-center
          wrap
        > <v-flex>
            <partLink :p_item="{name: $langs.title('head_firstLink'), to: getPartLink('resume')}" />
            <span>&nbsp; {{ $langs.title('head_unionLinks') }} &nbsp;</span>
          </v-flex>
          <v-flex>
            <partLink :p_item="{name: $langs.title('head_works'), to: getPartLink('works')}" />
          </v-flex>
        </v-layout>
        <v-spacer />
        <add-buttons
          v-if="!isMedium"
          class="flex-grow-0"
        />
      </v-layout>
    </v-toolbar-title>
  </v-app-bar>
</template>

<script>
import partLink from './part-app-link'
import addButtons from '@/components/additional-buttons'

export default {
  name: 'ToolbarApp',
  components: {
    partLink,
    addButtons,
  },
  computed: {
    isMobile () {
      return  this.$vuetify.breakpoint.smAndDown
    },
    isExtraSmall () {
      return this.$vuetify.breakpoint.xs
    },
    isMedium () {
      return this.isExtraSmall || this.$vuetify.breakpoint.sm
    },
  },
  methods: {
    getClassFontSizeFor (_nameClass) {
      // ret
      if (this.isMobile) {
        _nameClass += 'Mobile'
      } else {
        _nameClass += 'Desktop'
      }
      return _nameClass
    },
    getPartLink(_hash) {
      const lang = this.$route.params.lang || ''
      return `/${lang}/${_hash}/`
    },
  },
}
</script>

<style module lang="sass">
 .title {
    overflow: hidden;
    flex-grow: 1;
    color: var(--v-titleText-base);
  }
  /* name person */
  .wholeName {
    font-family: "press-start", sans-serif;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .firstName {
    font-size: 35px;
    &.firstName_mobile {
      font-size: 18px;
    }
  }
  .lastName {
    font-size: 15px;
    &.lastName_mobile {
      font-size: 10px;
    }
  }
  /* name site */
  .lobsterFont {
    font-family: "lobster", sans-serif;
  }
  .siteName {
    flex-grow: 0
  }
  .siteNameFontDesktop {
    font-size: 35px;
  }
  .siteNameFontMobile {
    min-width: 160px;
    font-size: 30px;
  }

  .sideIcon {
    color: var(--v-titleText-base) !important;
    background: var(--v-titleBackground-darken1) !important;
  }
</style>
