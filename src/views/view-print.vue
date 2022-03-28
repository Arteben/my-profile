<template>
  <div
    :class="$style.mainContainer"
  >
    <v-flex
      ma-3
      class="display-2"
    >
      Артём Бебенин
    </v-flex>
    <hr>
    <v-layout
      ma-3
      row
      justify-center
      align-center
      full
    >
      <contacts />
      <my-photo
        :p_isPrintMode="true"
        @photoLoad="loadImagesCounter++"
      />
    </v-layout>
    <info-blocks ma-3 />
    <div :class="$style.spacer" />
    <v-layout
      mx-3
      column
    >
      <my-printed-work
        v-for="workItem of worksInfo"
        :key="workItem.name"
        :p_workData="workItem"
        @loadImgWork="loadImagesCounter++"
      />
    </v-layout>
    <div :class="$style.hideForPrint">
      <hr>
      <v-btn @click="$router.push('/')">
        На главную
      </v-btn>
    </div>
  </div>
</template>

<script>
import worksInfo from '@/assets/myWorks.json'
// import query from '@/mixins/query'
import { infoBlocks, contacts, myPhoto, myPrintedWork } from '@/components'

export default {
  name: 'ViewPrint',
  data () {
    return {
      allImagesCounter: 0,
      loadImagesCounter: 0,
      worksInfo,
    }
  },
  mounted () {
    var images = document.getElementsByTagName('img')
    this.allImagesCounter = images.length
  },
  watch: {
    loadImagesCounter (_counter) {
      if (_counter >= this.allImagesCounter) {
        window.print()
      }
    },
  },
  components: {
    infoBlocks,
    contacts,
    myPhoto,
    myPrintedWork,
  },
}
</script>

<style module>
  .mainContainer {
    color: black;
    background: white;
  }

  .spacer {
    display: none;
  }

  @media print {

    .spacer {
      display: block;
      min-height: 500px;
    }
    .hideForPrint {
      display: none;
    }
  }
</style>
