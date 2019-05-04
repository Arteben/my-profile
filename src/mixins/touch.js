export default {
  props: {
    _debug: Boolean
  },
  data: function () {
    return {
      deferTimeout: null
    }
  },
  methods: {
    log: function () {
      console.log(this.$options.name, ...arguments)
    }
  }
}
