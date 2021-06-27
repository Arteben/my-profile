export default {
  methods: {
    log () {
      console.log(this.$options.name, ...arguments)
    },
  },
}
