<template>
  <v-layout
    justify-center
    class="px-2"
    :class="[$style.containerMinWidth, isMobile && 'column']"
  >
    <template v-for="contactsData in myContacts">
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

const myContacts = [
  {
    type: 'phone',
    text: '+7(920)-927-75-72',
    href: '',
    icon: 'mdi-cellphone-basic',
  },
  {
    type: 'mail',
    text: 'artjombebenin@gmail.com',
    href: 'mailto:artjombebenin@gmail.com',
    icon: 'mdi-email'
  },
  {
    type: 'stype',
    text: 'artem__r',
    href: 'skype:artem__r?userinfo',
    icon: 'mdi-skype'
  }
]

export default {
  name: 'Contacts',
  data () {
    return {
      myContacts
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
  .containerMinWidth {
    min-width: 350px;
  }
  .contactInfo {
    background: linear-gradient(to right, var(--v-secondary-lighten1), var(--v-secondary-base));
    border-left: 2px solid var(--v-primary-base);
    border-radius: 20px;
    display: inline-block;
  }
</style>
