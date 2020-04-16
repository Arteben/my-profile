<template>
  <v-layout
    justify-center
    class="px-2"
    :class="[$style.mainContainer, isMobile && 'column']"
  >
    <template v-for="contactsData in contactsInfo">
      <v-flex
        class="my-2"
        :key="contactsData.type"
        :title="contactsData.type"
      >
        <div
          class="px-2 py-1 flex-grow-0"
          :class="[$style.contactInfo]"
        >
          <v-icon
            medium
            left
          >{{ contactsData.icon }}</v-icon>
          <v-component
            :is="getElementForContactInfo(contactsData)"
            :href="contactsData.href"
          >{{ contactsData.text }}</v-component>
        </div>
      </v-flex>
    </template>
  </v-layout>
</template>

<script>

import contactsInfo from '@/assets/contacts'

export default {
  name: 'Contacts',
  data () {
    return {
      contactsInfo
    }
  },
  computed: {
    isMobile () {
      return  this.$vuetify.breakpoint.smAndDown
    },
  },
  methods: {
    getElementForContactInfo(_info) {
      return (_info && _info.href) && 'a' || 'span'
    }
  }
}
</script>

<style module lang="less">
  .mainContainer {
    min-width: 350px;
    @media print {
      flex-direction: column;
    }
  }
  .contactInfo {
    background: linear-gradient(to right, var(--v-secondary-lighten1), var(--v-secondary-base));
    border-left: 2px solid var(--v-primary-base);
    border-radius: 20px;
    display: inline-block;
    & > a {
      text-decoration: none;
    }
  }
</style>
