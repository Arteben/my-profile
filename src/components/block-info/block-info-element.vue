<template>
  <v-card
    class="ma-2"
    flat
  >
    <v-tabs
      v-if="isDescriptions"
      v-model="selectedIdx"
      :height="heightTabs"
      color="transparent"
      slider-color="primary"
      @change="onTabsChange"
    >
      <v-tabs-slider color="primary" />
      <v-tab
        class="caption"
        v-for="option in props"
        :key="option"
      >{{ option }}</v-tab>
    </v-tabs>
    <div
      :style="{ minHeight: heightTabs + 'px' }"
      v-else
    />
    <v-card-title
      :class="$style.cardTitle"
    >
      <v-icon
        left
        medium
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
          class="pl-4 body-2"
          :title="item.title"
          align-start
        >
          <v-icon
            left
            :size="item.isBig && '24' || '18'"
          >
            mdi-{{ item.icon }}
          </v-icon>
          <v-flex
            ma-2
          >
            <v-flex
              :class="item.isBig && 'subheading' || ''"
            >
              {{ item.name || item.title }}
            </v-flex>
            <v-flex
              v-if="(idx > 0) && item.description"
              class="my-2 subheading font-weight-light"
              :class="$style.infoText"
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
    background: linear-gradient(to bottom, var(--v-secondary-darken1), var(--v-secondary-base));
    /* background-color: linear-gradient(to bottom, var(--v-secondary-darken1), var(--v-secondary-base)); */
  }
  .infoText {
    line-height: 30px;
    color: var(--v-primary-darken);
  }
</style>
