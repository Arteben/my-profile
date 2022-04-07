<template>
  <v-card
    class="ma-2"
    :class="$style[`card${isExpanded && 'Expanded' || ''}`]"
    flat
    :color="isExpanded && 'titleBackground' || 'transparent'"
    @click="$emit('expandCard')"
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
      >{{ $langs.translate(p_blockInfo.title) }}:</span>
    </v-card-title>
    <v-tabs-items>
      <v-tab-item>
        <v-layout
          v-for="(item, idx) of p_blockInfo.items"
          :key="idx"
          class="ml-4 body-2"
          pa-2
          align-start
        >
          <v-icon
            :class="$style.itemIcon"
            color="primaryText"
            :size="item.isBig && '24' || '18'"
          >
            mdi-{{ item.icon }}
          </v-icon>
          <v-flex
            mx-2
            :class="$style.infoTextCommon"
          >
            <v-flex
              class="bold"
              :class="item.isBig && 'subheading' || ''"
            >
              {{ getTitle(item) }}
            </v-flex>
            <v-flex
              v-if="isExpanded && item.description"
              class="my-2 subheading font-weight-light"
              :class="$style.infoTextSpecialTitle"
            >
              {{ $langs.translate(item.description) }}
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
  props: {
    p_blockInfo: Object,
    p_isExpanded: {
      type: Boolean,
      default: false,
    },
  },
  data () {
    return {
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
    isExpanded () {
      return this.p_isExpanded
    },
  },
  methods: {
    getTitle (_item) {
      const text = this.isExpanded ?
        (_item.question || _item.title) :_item.title
      return this.$langs.translate(text)
    },
  },
}
</script>

<style module>
  .card, .cardExpanded {
    width: 300px;
    cursor: pointer;
  }

  .cardExpanded {
    width: 800px;
    max-width: 100%;
  }

  .card:hover {
    background: linear-gradient(to bottom, var(--v-primaryBackground-darken3), var(--v-primaryBackground-base));
  }

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
