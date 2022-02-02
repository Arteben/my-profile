import cq from './canvasquery'

export default class CanvasQueryBanner {
  constructor(_props) {
    var width = _props.width
    var height = _props.height

    this.backgroundColor = _props.background || 'black'
    this.textColor = _props.textColor || 'white'
    this.ventureFont = '16px venture'
    this.maincraftFont = '16px maincraft'
    // this.mainFont

    this.w = width
    this.h = height
    this.setHW = false
    this.p = this.h / this.w
    this.l = cq(_props.canvas)

    this.banner = {
      topString: {
        x: width / 2,
        xPos: width / 2,
        y: 10,
        yPos: 10,
      },
      bottomString: [],
    }

    var bottomStringWords = ['a', 'game', 'developer']
    var indent = 0
    var gDsymbols = this.banner.bottomString
    var spaceIndent = 22

    var addSymbol = _sym => {
      gDsymbols.push(CanvasQueryBanner.getBigSymbols(indent, _sym, width))
      indent += spaceIndent
    }

    for (let sym of bottomStringWords[0]) {
      addSymbol(sym)
    }
    indent += spaceIndent
    for (let sym of bottomStringWords[1]) {
      addSymbol(sym)
    }

    indent += spaceIndent
    for (let sym of bottomStringWords[2]) {
      addSymbol(sym)
    }

    this.l.textBaseline('top')
    this.l.textAlign('center')
  }

  draw() {
    var layer = this.l
    var banner = this.banner

    layer.clear(this.backgroundColor)

    layer.context.fillStyle = this.textColor
    layer.context.font = this.maincraftFont
    layer.context.fillText('I want to be', banner.topString.x, banner.topString.y)

    banner.bottomString.forEach(_sym => {
      layer.fillStyle(this.textColor)
      layer.font(this.ventureFont)
      layer.context.fillText(_sym.s, _sym.x, _sym.y)
    })
    layer.fillStyle(this.textColor)
    layer.fillCircle(10, 10, 5)
    layer.fillCircle(240, 30, 2)
    layer.fillCircle(230, 10, 1)
  }

  animateBottom = (function () {
    var animate_now = true
    var order_right = true

    return () => {
      var symbolIdx = 0
      var ang = 0
      var speed = 0.2
      var reverseSymIdx
      var symbol
      var symbols = this.banner.bottomString

      var getPositionIndent = (_pos, _ang) =>
        _pos + Math.sin(_ang * Math.PI) * 10 - 5

      var requestFunc = () => {
        if (symbolIdx < symbols.length) {
          symbol = symbols[symbolIdx]
          symbol.color = this.textColor
          if (ang < 2) {
            ang += speed
            if (order_right) {
              symbol.y = getPositionIndent(symbol.yPos, ang)
            } else {
              reverseSymIdx = symbols.length - symbolIdx - 1
              symbols[reverseSymIdx].y = getPositionIndent(symbols[reverseSymIdx].yPos, ang)
            }
            this.draw()
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

      if (animate_now) {
        animate_now = false
        requestFunc()
      }
    }
  }.call(this))

  static getBigSymbols(_setW, _symbol, _width) {
    var indentW = 170
    var indentH = 20

    var xPosition = (_width - indentW + _setW) / 2

    return {
      x: xPosition,
      xPos: xPosition,
      y: indentH,
      yPos: indentH,
      s: _symbol,
    }
  }
}
