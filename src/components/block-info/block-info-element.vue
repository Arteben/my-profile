<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="ma-2"
      :class="[$style[`card${isExpanded && 'Expanded' || ''}`], isHover(hover) ? $style.contentCardHover : '']"
      text
      :color="isExpanded && 'titleBackground' || 'transparent'"
      @click="onClickElement"
      :ripple="false"
    >
      <v-card-title
        class="align-start"
        :class="[
          $style.cardTitle,
          isHover(hover) ? $style.titleCardHover : '',
          isExpanded ? $style.titleExpandedHover : ''
        ]"
      >
        <v-icon
          left
          medium
          class="mt-1"
          color="primaryText"
        >mdi-{{ p_blockInfo.icon }}</v-icon>
        <span
          class="title"
        >{{ $langs.translate(p_blockInfo.title) }}:</span>
      </v-card-title>
      <v-list
        class="transparent"
      >
        <v-list-item
          v-for="(item, idx) of p_blockInfo.items"
          :key="idx"
          no-action
          class="ml-4 pa-1"
          align-start
        >
          <v-list-item-content>
            <v-list-item-title
              :class="$style.listItemTitle"
              class="d-flex flex-row"
            >
              <v-icon
                class="mr-2"
                color="primaryText"
                :size="item.isBig && '24' || '18'"
              >
                mdi-{{ item.icon }}
              </v-icon>
              <v-flex
                class="bold text-subtitle-1"
              >
                {{ getTitle(item) }}
              </v-flex>
            </v-list-item-title>
            <v-list-item-subtitle
              v-if="isExpanded && item.description"
              class="ma-3 ml-8 text-body-1"
              :class="$style.infoTextDesc"
            >
              {{ $langs.translate(item.description) }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>
  </v-hover>
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
    isHover(_h) {
      return !this.isExpanded && _h
    },
    isTitleExpandHover(_h) {
      return this.isExpanded && _h
    },
    onClickElement(event) {
      event.stopPropagation()
      if (this.isExpanded) {
        this.$emit('collapseCard')
      } else {
        this.$emit('expandCard')
      }
    },
  },
}
</script>

<style module lang="sass">
  .card, .cardExpanded {
    width: 300px;
    cursor: pointer;
  }

  .cardExpanded {
    max-width: 700px;
    width: 80%;

    @media print {
      min-width: 100%;
    }
  }

  .cardTitle {
    flex-wrap: nowrap;
    background: linear-gradient(to bottom, var(--v-primaryBackground-darken3), var(--v-primaryBackground-base));
    color: var(--v-primaryText-base);
    word-break: normal;
  }
  .infoTextDesc {
    line-height: 30px !important;
    text-wrap: inherit;
    color: var(--v-primaryText-base) !important;
  }

  .titleCardHover {
     background: var(--v-primaryBackground-darken3);
  }

  .titleExpandedHover:hover {
    cursor: pointer;
  }

  .contentCardHover {
    background: linear-gradient(to bottom, var(--v-primaryBackground-darken3), var(--v-primaryBackground-base));
  }

  @media print {
    .listItemTitle {
      flex-direction: row;
      display: flex;

      I {
        margin: 0 4px 5px 0;
      }
    }
  }
</style>
