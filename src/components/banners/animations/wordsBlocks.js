import destruction from '@/assets/sounds/destruction.wav'
import tip from '@/assets/sounds/tip.wav'

const animateStates = {
  'calm': 'calm',
  'drop': 'drop',
  'fallingSupport': 'fallingSupport',
  'fallingWords': 'fallingWords',
}

const destructionSound = new Audio(destruction)
const tipSound = new Audio(tip)

export default class CanvasBanner {
  constructor(_props) {
    // var width = _props.width
    // var height = _props.height

    const background = _props.background || 'black'
    const textColor = _props.textColor || 'white'
    const words = ['programmer', 'modest boy', 'perfect man']
    const ventureFont = '11pt venture'

    this.sizes = {
      w: _props.width,
      h: _props.height,
      textHeight: 11,
      font: ventureFont,
      edgePers: 30,
    }

    this.colors = {
      background,
      support: textColor,
      container: textColor,
      containerBorder: background,
      textColor: background,
    }

    this.isSound = _props.isSound
    // this.mainFont

    this.blockWords = words.map((word) => {
      const minX = (_props.width * 0.42)
      const maxX = (_props.width * 0.58)
      const x = (Math.floor(Math.random() * (maxX - minX + 1)) + minX)
      return {
        width: (String(word).length * 10),
        symbs: word,
        y: 0,
        x,
      }
    })

    this.animateCurrentState = animateStates.calm

    const ctx = _props.canvas && _props.canvas.getContext('2d') || {}
    ctx.font = ventureFont
    ctx.textBaseline = 'middle'
    ctx.textAlign = 'center'
    this.layer = ctx
  }

  draw () {
    let animatePercents = 0

    const dropAnimation = () => {
      this.clear()
      getBreakSupportSprites.call(this, animatePercents)
      setAllWords.call(this, animatePercents)
      if (100 > animatePercents) {
        animatePercents += 3
        window.requestAnimationFrame(dropAnimation)
      } else {
        this.animateCurrentState = animateStates.fallingSupport
        this.draw()
      }
    }

    const fallingSupportAnimation = () => {
      this.clear()
      getFallSupportSprite.call(this, animatePercents)
      if (100 > animatePercents) {
        animatePercents += 8
        window.requestAnimationFrame(fallingSupportAnimation)
      } else {
        this.animateCurrentState = animateStates.fallingWords
        this.draw()
      }
    }

    const percentsForWord = Math.ceil(100 / this.blockWords.length)
    const fallingWordsAnimation = () => {
      this.clear()
      const wordIndex = Math.floor(animatePercents / percentsForWord)
      getSpriteForWord.call(this, wordIndex, percentsForWord, animatePercents)
      getFallSupportSprite.call(this, 100)
      if (100 > animatePercents) {
        animatePercents += 4
        window.requestAnimationFrame(fallingWordsAnimation)
      } else {
        this.animateCurrentState = animateStates.calm
        this.draw()
      }
    }

    switch(this.animateCurrentState) {
      case animateStates.calm:
        this.clear()
        setAllWords.call(this, 0)
        getFallSupportSprite.call(this, 100)
        break
      case animateStates.drop:
        if (this.isSound) {
          destructionSound.play()
        }
        window.requestAnimationFrame(dropAnimation)
        break
      case animateStates.fallingSupport:
        window.requestAnimationFrame(fallingSupportAnimation)
        break
      case animateStates.fallingWords:
        window.requestAnimationFrame(fallingWordsAnimation)
        break
    }
  }

  drop () {
    this.animateCurrentState = animateStates.drop
    this.draw()
  }

  clear() {
    this.layer.clearRect(0, 0, this.sizes.w, this.sizes.h)
    this.layer.fillStyle = this.colors.container

    const fillArc = (_x, _y, _r) => {
      this.layer.beginPath();
      this.layer.arc(_x, _y, _r, 0, Math.PI * 2)
      this.layer.fill()
    }

    fillArc(10, 35, 3)
    fillArc(240, 30, 2)
    fillArc(230, 10, 1)
    fillArc(5, 3, 2)
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

function getSupportLinePosY(_sizes, _blockWords) {
  const lastIdx = (_blockWords.length - 1)
  return getStartedWordHeight((lastIdx), _sizes) + (_sizes.textHeight / 2)
}

function drawSupportLine(_layer, color, _pos1X, _pos1Y, _pos2X, _pos2Y) {
  _layer.strokeStyle = color
  _layer.beginPath()
  _layer.moveTo(_pos1X, _pos1Y)
  _layer.lineTo(_pos2X, _pos2Y)
  _layer.closePath()
  _layer.stroke()
}

function getNum(_num, _pers) {
  return (_num * _pers) / 100
}

function getFallSupportSprite(_percents) {
  const endPosY = getSupportLinePosY(this.sizes, this.blockWords)
  const posY = Math.round(getNum(endPosY, _percents))
  const beginX = this.sizes.w * 0.1
  const endX = this.sizes.w * 0.9
  drawSupportLine(this.layer, this.colors.support, beginX, posY, endX, posY)
}

function getBreakSupportSprites(_percents) {
  if (_percents < 25) {
    getFallSupportSprite.call(this, 100)
  } else if (_percents < 50) {
    drawSlantedLines.call(this)
  } else if (_percents < 75) {
    drawVerticalLines.call(this)
  }

  function drawSlantedLines() {
    const sizes = this.sizes
    const endPosY = getSupportLinePosY(sizes, this.blockWords)

    const firstLine = {
      x1: getNum(sizes.w, sizes.edgePers * 0.3),
      y1: getNum(sizes.h, 100 - sizes.edgePers),
      x2: getNum(sizes.w, sizes.edgePers),
      y2: endPosY,
    }

    const lastLine = {
      x1: sizes.w - firstLine.x1,
      y1: firstLine.y1,
      x2: sizes.w - firstLine.x2,
      y2: endPosY,
    }

    const drawLine = (_line) => {
      drawSupportLine(this.layer, this.colors.support, _line.x1, _line.y1, _line.x2, _line.y2)
    }

    drawLine(firstLine)
    drawLine(lastLine)
  }

  function drawVerticalLines() {
    const sizes = this.sizes
    const posX1 = getNum(sizes.w, sizes.edgePers * 0.4)
    const posX2 = (sizes.w - posX1)
    const posHightY = getNum(sizes.h, (100 - sizes.edgePers))
    const drawLine = (_posX) => {
      drawSupportLine(this.layer, this.colors.support, _posX, posHightY, _posX, sizes.h)
    }
    drawLine(posX1)
    drawLine(posX2)
  }
}

function setAllWords (_addPosY, _beginIdx = 0, _endIdx = this.blockWords.length) {
  for (let i = _beginIdx; i < _endIdx; i++) {
    const y = getStartedWordHeight(i, this.sizes)
    this.blockWords[i].y = y + _addPosY
    drawBlockWord(this.blockWords[i], this.layer, this.sizes, this.colors)
  }
}

function getSpriteForWord(_idx, _prs, _allPrc) {
  let wordPercents = _allPrc % _prs

  if ((_idx * _prs) === _allPrc || _allPrc === 100) {
    if (this.isSound) {
      console.log('tip!')
      tipSound.play()
    }
  }
  const reverseIndex = this.blockWords.length - _idx - 1
  const percents = (100 * (wordPercents) / _prs)
  const startY = this.sizes.textHeight
  const height = getStartedWordHeight(reverseIndex, this.sizes) + startY
  const word = this.blockWords[reverseIndex]
  word.y = getNum(height, percents) - startY
  drawBlockWord(word, this.layer, this.sizes, this.colors)
  setAllWords.call(this, 0, reverseIndex + 1)
}
