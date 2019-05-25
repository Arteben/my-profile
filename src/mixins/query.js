export default {
  methods: {
    initQuery (_key, _path) {
      var xmlhttp = new XMLHttpRequest()
      var vueCtx = this

      xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
          vueCtx[_key] = JSON.parse(this.responseText)
        }
      }

      xmlhttp.open('GET', _path);
      xmlhttp.send();
    }
  }
}
