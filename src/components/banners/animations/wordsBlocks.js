import click from '@/assets/sounds/478_click.wav'

export default class CanvasQueryBanner {
  constructor(_props) {
    // var width = _props.width
    // var height = _props.height

    const background = _props.background || 'black'
    const textColor = _props.textColor || 'white'
    const words = ['coder', 'modest boy', 'perfect man']
    const ventureFont = '11pt venture'

    this.sizes = {
      w: _props.width,
      h: _props.height,
      textHeight: 11,
      font: ventureFont,
    }

    this.colors = {
      background,
      support: textColor,
      container: textColor,
      containerBorder: background,
      textColor: background
    }

    this.isSound = _props.isSound
    this.audio = new Audio(click)
    // this.mainFont

    this.blockWords = words.map((word) => {
      const minX = (_props.width * 0.45)
      const maxX = (_props.width * 0.55)
      const x = (Math.floor(Math.random() * (maxX - minX + 1)) + minX)
      return {
        width: (String(word).length * 10),
        symbs: word,
        y: 0,
        x,
      }
    })

    const ctx = _props.canvas && _props.canvas.getContext('2d') || null
    if (ctx) {
      ctx.font = ventureFont
      ctx.textBaseline = 'middle'
      ctx.textAlign = 'center'
      this.layer = ctx
    } else {
      console.error('dont canvas in constructor word blocks!')
    }

    this.getStartWordHeight = function () {

    }
  }

  draw () {
    const layer = this.layer
    const colors = this.colors
    const sizes = this.sizes

    layer.clearRect(0, 0, sizes.w, sizes.h)

    this.blockWords.forEach((word, idx) => {
      const y = getStartedWordHeight(idx, sizes)
      word.y = y
      drawBlockWord(word, layer, sizes, colors)
    })

    layer.strokeStyle = colors.support
    const lastIdx = (this.blockWords.length - 1)
    const lineY = getStartedWordHeight((lastIdx), sizes) + (sizes.textHeight / 2)
    layer.beginPath()
    layer.moveTo(0, lineY)
    layer.lineTo(sizes.w, lineY)
    layer.closePath()
    layer.stroke()
  }
}

function drawBlockWord(_word, _layer, _sizes, _colors) {
  const middleX = _word.x
  const width = _word.width
  const posY = _word.y

  const getRectX = _x => (_x - (width / 2))
  const getRextY = _y => (_y - (_sizes.textHeight / 2) - 1)

  _layer.fillStyle = _colors.container
  _layer.strokeStyle = _colors.containerBorder

  const rectParams = [getRectX(middleX), getRextY(posY), width, _sizes.textHeight]
  _layer.fillRect(...rectParams)
  _layer.strokeRect(getRectX(middleX), getRextY(posY), width, _sizes.textHeight)

  _layer.fillStyle = _colors.textColor
  _layer.fillText(_word.symbs, middleX, (posY - 1))
}

function getStartedWordHeight (_idx, _sizes) {
  return ((_idx + 1) * _sizes.textHeight)
}