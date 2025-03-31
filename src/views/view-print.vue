<template>
  <div
    :class="$style.mainContainer"
  >
    <v-layout
      :class="$style.printedTitle"
    >
      <my-photo
        :p_isPrintMode="true"
        @photoLoad="loadImagesCounter++"
        :class="$style.myPhoto"
      />
      <v-flex>
        <span :class="$style.titleCaption">{{ $langs.title('print_fullName') }} </span>
      </v-flex>
      <v-flex :class="$style.qrCodeDiv">
        <canvas
          :class="$style.qrCode"
          ref="qrCodeEl"
        />
      </v-flex>
    </v-layout>
    <hr>
    <contacts :class="$style.printedMyContacts" />
    <hr>
    <info-blocks
      :class="$style.printedMyInfo"
      :p_isExpanded="true"
    />
    <v-layout
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
import QRCode from 'qrcode'

import worksInfo from '@/assets/myWorks.json'
import { infoBlocks, contacts, myPhoto, myPrintedWork } from '@/components'
import { pushAppRouter } from '@/utils'
import { resumeLink } from '@/rc-links'

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

    QRCode.toDataURL(this.$refs.qrCodeEl, resumeLink)

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

<style module lang="sass">
  .mainContainer {
    background: white;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-items: start;
    align-items: stretch;

    .printedMyInfo *,
    .printedTitle *,
    .printedMyContacts *,
    .printedWorks * {
      color: black !important;
      background: white !important;
    }
  }

  .printedTitle {
    align-items: center;
  }

  .spacer {
    display: none;
  }

  .titleCaption {
    font-size: 30px;
    font-weight: bold;
    font-family: serif;
  }

  .qrCodeDiv {
    align-self: start;
  }

  .qrCode {
    width: 70px !important;
    height: 70px !important;
  }

  .myPhoto {
    margin: 10px;
  }

  .printedMyContacts {
    margin: 40px 0;
    font-size: 20px !important;
  }

  @media print {
    .hideForPrint {
      display: none;
    }
  }
</style>
