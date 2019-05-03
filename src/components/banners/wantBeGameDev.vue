<template>
  <canvas
    :class="$style.canvas"
    @click="onCanvasClick"
    style="width: 1600px; height: 260px;"
    width="250px"
    height="40px"
  />
</template>

<script>
import cq from './canvasquery'
console.log('canvas query', cq)

class CanvasQueryBanner {
  constructor(_canvasElement) {
    var width = 250;
    var height = 40

    this.backgroundColor = '#333'
    this.textColor = '#f5f5f5'
    this.ventureFont = '14pt venture'

    this.w = width
    this.h = height
    this.setHW = false
    this.p = this.h / this.w
    this.l = cq(_canvasElement)

    this.banner = {
      iwant: {
        x: width / 2,
        xPos: width / 2,
        y: 10,
        yPos: 10,
        font: '10px sans-serif'
      },
      game: []
    }

    var gameString = 'game'
    var developerString = 'developer'
    var indent = 0
    var gDsymbols = this.banner.game
    var addSymbol = _sym => {
      gDsymbols.push(CanvasQueryBanner.getBigSymbols(indent, _sym, width))
      indent += 26
    }

    for (let sym of gameString) {
      addSymbol(sym)
    }
    indent += 25
    for (let sym of developerString) {
      addSymbol(sym)
    }

    this.l.textBaseline('top')
    this.l.textAlign('center')
  }

  drawBanner() {
    var layer = this.l
    var banner = this.banner

    layer.clear(this.backgroundColor)

    layer.context.fillStyle = this.textColor
    layer.context.font = banner.iwant.font
    layer.context.fillText('I want to be', banner.iwant.x, banner.iwant.y)

    banner.game.forEach(_sym => {
      layer.fillStyle(this.textColor)
      layer.font(this.ventureFont)
      layer.context.fillText(_sym.s, _sym.x, _sym.y)
    })
    layer.fillStyle(this.textColor)
    layer.fillCircle(10, 10, 5)
    layer.fillCircle(240, 30, 2)
    layer.fillCircle(230, 10, 1)
  }

  tremorIwant() {
    var dif_1 = Math.floor(Math.random() * 4 + 1) - 2
    var dif_2 = Math.floor(Math.random() * 4 + 1) - 2

    this.banner.iwant.x = this.banner.iwant.x_pos - dif_1
    this.banner.iwant.y = this.banner.iwant.y_pos - dif_2
    this.draw_banner()
  }

  animationSymbols() {
    var symbolIdx = 0
    var ang = 0
    var speed = 0.2
    var animate_now = true
    var order_right = true
    var invertSymbolIdx
    var gameDevSym
    var gameDevTitle = this.banner.game

    var getPositionIndent = (_pos, _ang) =>
      _pos + Math.sin(_ang * Math.PI) * 10 - 5

    var requestFunc = () => {
      console.log('animation symbols')
      if (symbolIdx < gameDevTitle.length) {
        gameDevSym = gameDevTitle[symbolIdx]
        gameDevSym.color = this.textColor
        if (ang < 2) {
          ang += speed
          if (order_right) {
            gameDevSym.y = getPositionIndent(gameDevSym.yPos, ang)
          } else {
            invertSymbolIdx = gameDevTitle.length - symbolIdx - 1
            gameDevTitle[invertSymbolIdx].y = getPositionIndent(
              gameDevTitle[invertSymbolIdx].yPos,
              ang
            )
          }
          console.log('draw banner!')
          this.drawBanner()
        } else {
          ang = 0
          symbolIdx++
        }
        window.requestAnimationFrame(requestFunc)
      } else {
        symbolIdx = 0
        order_right = !order_right
        animate_now = true
      }
    }

    return () => {
      if (this.banner !== null && animate_now) {
        animate_now = false
        requestFunc()
      }

      this.tremor_draw_banner()
    }
  }

  static getBigSymbols(_setW, _symbol, _width) {
    var indentW = 170
    var indentH = 20

    var xPosition = (_width - indentW + _setW) / 2

    return {
      x: xPosition,
      xPos: xPosition,
      y: indentH,
      yPos: indentH,
      s: _symbol
    }
  }
}

export default {
  name: 'WantBeGameDev',
  data() {
    return {
      banner: null
    }
  },
  mounted() {
    this.banner = new CanvasQueryBanner(this.$el)
    this.banner.drawBanner()
  },
  methods: {
    onCanvasClick() {
      if (this.banner) {
        this.banner.animationSymbols()
      }
    }
  }
}
</script>

<style module>
.canvas {
  image-rendering: optimizeSpeed; /* Older versions of FF          */
  image-rendering: -moz-crisp-edges; /* FF 6.0+                       */
  image-rendering: -webkit-optimize-contrast; /* Safari                        */
  image-rendering: -o-crisp-edges; /* OS X & Windows Opera (12.02+) */
  image-rendering: pixelated; /* Awesome future-browsers       */
  -ms-interpolation-mode: nearest-neighbor; /* IE                            */
}
</style>
