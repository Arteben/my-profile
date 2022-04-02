<template>
  <v-toolbar
    app
    height="100"
    class="titleBackground"
  > <v-toolbar-side-icon
      v-if="isExtraSmall"
      @click="$emit('clickSideIcon')"
      :class="$style.sideIcon"
    />
    <v-toolbar-title :class="$style.title">
      <v-layout
        raw
        fill-height
        align-center
      > <v-layout
          :class="$style.wholeName"
          column
          align-end
        > <v-flex
            :class="[$style.firstName, isMobile && $style.firstName_mobile]"
          > {{ $langs.title('head_name') }} </v-flex>
          <v-flex
            :class="[$style.lastName, isMobile && $style.lastName_mobile]"
          > {{ $langs.title('head_lastname') }} </v-flex>
        </v-layout>
        <v-layout
          :class="[$style.lobsterFont, $style.siteName, $style[getClassFontSizeFor('siteNameFont')]]"
          row
          px-4
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
          v-if="!isExtraSmall"
        />
      </v-layout>
    </v-toolbar-title>
  </v-toolbar>
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
      return `/${lang}#${_hash}`
    },
  },
}
</script>

<style module lang="less">
 .title {
    overflow: auto;
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
    font-size: 40px;
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
