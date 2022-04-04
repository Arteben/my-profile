<template>
  <div
    :class="$style.mainContainer"
  >
    <div
      :class="$style.printedTitle"
    >
      <v-flex
        ma-3
        class="display-2"
      >
        {{ $langs.title('print_fullName') }}
      </v-flex>
      <hr>
    </div>
    <div
      :class="$style.printedMyInfo"
    >
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
    </div>
    <div :class="$style.spacer" />
    <v-layout
      mx-3
      column
      :class="$style.printedWorks"
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
      <v-btn
        @click="returnApp"
      >
        {{ $langs.title('print_backButton') }}
      </v-btn>
    </div>
  </div>
</template>

<script>
import worksInfo from '@/assets/myWorks.json'
// import query from '@/mixins/query'
import { infoBlocks, contacts, myPhoto, myPrintedWork } from '@/components'
import { pushAppRouter } from '@/utils'

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
  components: {
    infoBlocks,
    contacts,
    myPhoto,
    myPrintedWork,
  },
  watch: {
    loadImagesCounter (_counter) {
      if (_counter >= this.allImagesCounter) {
        window.print()
      }
    },
  },
  methods: {
    returnApp () {
      pushAppRouter.call(this, {_name: 'app'})
    },
  },
}
</script>

<style module lang="less">
  .mainContainer {
    background: white;

    .printedMyInfo *,
    .printedTitle *,
    .printedWorks * {
      color: black !important;
      background: white !important;
    }
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
