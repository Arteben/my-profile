// const animateStates = {
//   'calm': 'calm',
//   'drop': 'drop',
//   'fallingSupport': 'fallingSupport',
//   'fallingWords': 'fallingWords',
// }


export default class CanvasBanner {
  constructor(_props) {
    // var width = _props.width
    // var height = _props.height

    this.background = _props.background || 'black'
    this.textColor = _props.textColor || 'white'
    this.words = ['Code is art']
    this.ventureFont = '16px venture'
    this.isSound = _props.isSound
    this.sizes = {
      h: _props.height,
      w: _props.width,
    }

    const ctx = _props.canvas && _props.canvas.getContext('2d') || {}
    ctx.font = '16px venture'
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    this.layer = ctx

    this.clear()
  }



  clear() {
    this.layer.clearRect(0, 0, this.sizes.w, this.sizes.h)
    this.layer.fillStyle = this.textColor
  }
}

// function drawBlockWord(_word, _layer, _sizes, _colors) {
//   const middleX = _word.x
//   const width = _word.width
//   const posY = _word.y

//   const getRectX = _x => (_x - (width / 2))
//   const getRextY = _y => (_y - (_sizes.textHeight / 2) - 1)

//   _layer.fillStyle = _colors.container
//   _layer.strokeStyle = _colors.containerBorder

//   const rectParams = [getRectX(middleX), getRextY(posY), width, _sizes.textHeight]
//   _layer.fillRect(...rectParams)
//   _layer.strokeRect(getRectX(middleX), getRextY(posY), width, _sizes.textHeight)

//   _layer.fillStyle = _colors.textColor
//   _layer.fillText(_word.symbs, middleX, posY)
// }

// function drawSupportLine(_layer, color, _pos1X, _pos1Y, _pos2X, _pos2Y) {
//   _layer.strokeStyle = color
//   _layer.beginPath()
//   _layer.moveTo(_pos1X, _pos1Y)
//   _layer.lineTo(_pos2X, _pos2Y)
//   _layer.closePath()
//   _layer.stroke()
// }

