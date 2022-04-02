<template>
  <v-layout
    justify-center
    class="px-2"
    :class="[$style.mainContainer, isMobile && 'column']"
  >
    <template v-for="contactsData in contactsInfo">
      <v-component
        :is="getElementForContactInfo(contactsData)"
        class="flex my-2"
        :href="contactsData.href"
        :key="contactsData.type"
        :title="$langs.title(`contacts_title_${contactsData.type}`)"
      >
        <div
          class="px-2 py-1 align-center"
          :class="[$style.contactInfo]"
        >
          <v-icon
            medium
            left
            color="primaryText"
          >{{ contactsData.icon }}</v-icon>
          <span
            class="title"
          >{{ contactsData.text }}</span>
        </div>
      </v-component>
    </template>
  </v-layout>
</template>

<script>

const contactsInfo = [{
  type: 'mail',
  text: 'artjombebenin@gmail.com',
  href: 'mailto:artjombebenin@gmail.com',
  icon: 'mdi-email',
}]

export default {
  name: 'Contacts',
  data () {
    return {
      contactsInfo,
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
    },
  },
}
</script>

<style module lang="less">
  .mainContainer {
    min-width: 350px;
    & > a {
      text-decoration: none;
    }

    @media print {
      flex-direction: column;
    }
  }
  .contactInfo {
    background: linear-gradient(to right, var(--v-primaryBackground-lighten1), var(--v-primaryBackground-base));
    border-left: 2px solid var(--v-primaryText-base);
    color: var(--v-primaryText-base);
    border-radius: 20px;
    max-width: 400px;
    overflow: hidden;
    display: flex;
  }
</style>
