export default {
  data () {
    return {
      jsonData: null
    }
  },
  methods: {
    getJsonData (_path) {
      var xmlhttp = new XMLHttpRequest()
      var vueContx = this

      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          vueContx.jsonData = JSON.parse(this.responseText)
        }
      }

      xmlhttp.open('GET', _path, false);
      xmlhttp.send();
    }
  }
}
