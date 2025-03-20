<template>
  <v-layout
    justify-center
    class="px-2"
    :class="[$style.mainContainer, isMobile && 'column']"
  >
    <template v-for="(contactsData, idx) in contactsInfo">
      <span
        class="flex my-2"
        :class="$style.contact"
        :key="idx"
        :title="$langs.title('contacts_title_for_copy')"
        @click="copyContact(contactsData.text)"
      >
        <div
          class="px-2 py-1 align-center"
          :class="[$style.contactInfo]"
        >
          <v-icon
            medium
            left
            color="primaryText"
          >
            {{ contactsData.icon }}
          </v-icon>
          <span class="title">{{ contactsData.text }}</span>
        </div>
      </span>
    </template>
  </v-layout>
</template>

<script>
const contactsInfo = [
  {
    text: 'artjombebenin@gmail.com',
    icon: 'mdi-email',
  },
  {
    text: '@artjomben',
    icon: 'mdi-telegram',
  },
];

export default {
  name: 'Contacts',
  data() {
    return {
      contactsInfo,
    };
  },
  computed: {
    isMobile() {
      return this.$vuetify.breakpoint.smAndDown;
    },
  },
  methods: {
    copyContact(_text) {
      var textArea = document.createElement('textarea')
      textArea.value = _text
      document.body.appendChild(textArea)

      textArea.select()

      var copText = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (copText) {
        var message = this.$langs.title('contacts_copy_success')
        this.$eventsBus.callEvent('showAlert', {type: 'alert', text: message})
      }
    },
  },
};
</script>

<style module lang="sass">
.mainContainer {
  min-width: 350px;
  & > a {
    text-decoration: none;
  }

  .contact {
    cursor: pointer;
  }

  @media print {
    flex-direction: column;
  }
}
.contactInfo {
  background: linear-gradient(
    to right,
    var(--v-primaryBackground-lighten1),
    var(--v-primaryBackground-base)
  );
  border-left: 2px solid var(--v-primaryText-base);
  color: var(--v-primaryText-base);
  border-radius: 20px;
  max-width: 400px;
  overflow: hidden;
  display: flex;
}
</style>
