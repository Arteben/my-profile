<template>
  <v-toolbar
    app
    height="100"
  > <v-toolbar-side-icon
      v-if="isExtraSmall"
      @click="$emit('clickSideIcon')"
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
          > Артёма </v-flex>
          <v-flex
            :class="[$style.lastName, isMobile && $style.lastName_mobile]"
          > Бебенина </v-flex>
        </v-layout>
        <v-layout
          :class="[$style.lobsterFont, $style.siteName, $style[getClassFontSizeFor('siteNameFont')]]"
          row
          px-4
          justify-start
          align-content-center
          wrap
        > <v-flex>
            <partLink :p_item="{name: 'резюме', to: '#resume'}" />
            <span>&nbsp;и&nbsp;</span>
          </v-flex>
          <v-flex>
            <partLink :p_item="{name: 'проектики', to: '#works'}" />
          </v-flex>
        </v-layout>
        <!-- added icons for app panel -->
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
  },
}
</script>

<style module lang="less">
 .title {
    overflow: auto;
    flex-grow: 1;
  }
  /* name person */
  .wholeName {
    font-family: "press-start", sans-serif;
    flex-shrink: 0;
    flex-grow: 0;
  }
  .firstName {
    font-size: 40px;
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
</style>
