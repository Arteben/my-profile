<template>
  <v-card
    class="ma-2"
    flat
    color="transparent"
  >
    <v-card-title
      :class="$style.cardTitle"
    >
      <v-icon
        left
        medium
        color="primaryText"
      >mdi-{{ p_blockInfo.icon }}</v-icon>
      <span
        class="title"
      >{{ p_blockInfo.title }}:</span>
    </v-card-title>
    <v-tabs-items
      v-model="selectedIdx"
    >
      <v-tab-item
        v-for="(option, idx) in props"
        :key="option"
      >
        <v-layout
          v-for="item of p_blockInfo.items"
          :key="item.title"
          class="ml-5 body-2"
          :title="item.title"
          align-center
        >
          <v-icon
            :class="$style.itemIcon"
            color="primaryText"
            :size="item.isBig && '24' || '18'"
          >
            mdi-{{ item.icon }}
          </v-icon>
          <v-flex
            ma-2
            :class="$style.infoTextCommon"
          >
            <v-flex
              :class="item.isBig && 'subheading' || ''"
            >
              {{ item.name || item.title }}
            </v-flex>
            <v-flex
              v-if="(idx > 0) && item.description"
              class="my-2 subheading font-weight-light"
              :class="$style.infoTextSpecialTitle"
            >
              {{ item.description }}
            </v-flex>
          </v-flex>
        </v-layout>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
const heightTabs = '25'

export default {
  name: 'BlockInfoElement',
  props: { p_blockInfo: Object },
  data () {
    return {
      props: ['кратко', 'подробно'],
      selectedIdx: 0,
      heightTabs,
    }
  },
  computed: {
    isMobileScreen () {
      return this.$vuetify.breakpoint.smAndDown
    },
    isDescriptions () {
      const items = this.p_blockInfo && this.p_blockInfo.items || []
      return items.some(_item => Boolean(_item.description))
    },
  },
  methods: {
    onTabsChange (_tabIdx) {
      this.$emit('changeTabs', {
        elementTitle: this.p_blockInfo.title,
        tabIdx: _tabIdx,
      })
    },
  },
}
</script>

<style module>
  .cardTitle {
    flex-wrap: nowrap;
    background: linear-gradient(to bottom, var(--v-primaryBackground-darken3), var(--v-primaryBackground-base));
    color: var(--v-primaryText-base);
  }
  .infoTextCommon {
    color: var(--v-primaryText-base);
  }
  .infoTextSpecialTitle {
    line-height: 30px;
  }
  .itemIcon {
    width: 25px;
  }
</style>
