import titles from '@/translates/titles.json'
import { pushAppRouter } from '@/utils'

export const getTranslateModule = function() {
  const getLang = function () {
    const params = this.$route.params
    const langs = ['ru', 'eng']
    return langs.includes(params.lang) && params.lang || langs[0]
  }

  if (window.location.hash == '#/') {
    window.location.hash = '#/ru'
  }

  return {
    mixins: [{
      methods: {
        title(_key) {
          const lang = getLang.call(this)
          const title = titles[_key] && titles[_key][lang]
          return title && title || `><${_key}><`
        },
        getLang() {
          return getLang.call(this)
        },
        getReverseLang () {
          return getLang.call(this) == 'ru' && 'eng' || 'ru'
        },
        switch () {
          const newLang = this.getReverseLang()
          this.$route.meta.isScroll = false
          pushAppRouter.call(this, {_lang: newLang})
        },
        translate(_data) {
          let translate
          if (typeof _data == 'string') {
            translate = _data
          } else if (_data) {
            const lang = getLang.call(this)
            translate = (_data || {})[lang] || `<>${_data}|${lang}<>`
          } else {
            translate = 'no data in:' + _data
          }
          return translate
        },
      },
    }],
  }
}
