import cq from './canvasquery'

const animateStates = {
  'showTitle': 1,
  'scaleCOde': 3,
  'circles': 3,
  'outScalling': 4,
}

const getLeftSideScallingMove = (_w, _s) => {
  return - (_s / 2 * _w)
}

const getReturnPtValue = (_pt, _value) => {
  const reversePT = 100 - _pt
  return _value - (reversePT * _value / 100)
}

export default class CanvasBanner {
  constructor(_props) {
    this.background = _props.background || 'black'
    this.textColor = _props.textColor || 'white'
    this.phrases = ['Code is art', 'that does something']
    this.phrasesParams = {
      mainFont: 'venture',
      mainSize: 32,
      mainTitleW: 0.1,
      mainTitleH: 0.1,
      smallFont: 'maincraft',
      smallFontSize: 14,
      smallTitleW: 0.4,
      smallTitleH: 0.7,
    }
    this.sizes = {
      h: _props.height,
      w: _props.width,
    }

    this.layer = cq(_props.canvas)
    this.layer.textBaseline('top')
    this.layer.textAlign('left')

    this.stateList = Object.keys(animateStates)

    this.stateId = 0
    this.counter = 0
  }

  setTransform (_zoom = 1, _moveX = 0, _moveY = 0) {
    _zoom = (1 > _zoom) ? 1 : _zoom
    this.layer.context.setTransform(_zoom, 0, 0, _zoom, _moveX, _moveY)
  }

  clear() {
    this.layer.clear(this.background)
    this.layer.context.fillStyle = this.textColor
  }

  setNextStateId () {
    this.stateId++;
  }

  getTimeCount () {
    return animateStates[this.stateList[this.stateId]] * 60
  }

  startScalling () {
    this.counter = 0
    this.stateId = 0
    this.drawScalling()
  }

  drawScalling () {

    if (!this.stateList[this.stateId]) {
      return
    }

    const time = this.getTimeCount()
    const timePercent = 100 / time

    if (this.counter > time) {
      this.counter = 0
      this.setNextStateId()
      if (this.stateId !== 0) {
        this.drawScalling()
      }
    } else {
      if (this.counter == 0) {
        this.setTransform()
      }

      const pT = this.counter * timePercent

      switch (this.stateList[this.stateId]) {
        case 'showTitle':
            this.showTitle()
          break
          case 'scaleCOde':
            this.showTitle()
            this.scaleCOde(pT)
          break
          case 'circles':
            this.circles(pT)
          break
          case 'outScalling':
            this.outScalling(pT)
          }

      this.counter++
      window.requestAnimationFrame(() => {
        this.drawScalling()
      })
    }
  }

  drawTitle (_fontSize, _w, _h, _type = 'main') {
    let font
    let phrase
    const params = this.phrasesParams
    const sizes = this.sizes

    if (_type == 'main') {
      font = params.mainFont
      phrase = this.phrases[0]
    } else {
      font = params.smallFont
      phrase = this.phrases[1]
    }

    this.layer.context.font = `${_fontSize}px ${font}`
    this.layer.context.fillText(phrase, sizes.w * _w, sizes.h * _h)
  }

  drawMainTitle(_s, _w, _h) {
    this.drawTitle(_s, _w, _h)
  }

  drawSmallTitle(_s, _w, _h) {
    this.drawTitle(_s, _w, _h, 'small')
  }

  showTitle () {
    this.clear()
    const params = this.phrasesParams
    this.drawMainTitle(params.mainSize, params.mainTitleW, params.mainTitleH)
    this.drawSmallTitle(params.smallFontSize, params.smallTitleW, params.smallTitleH)
  }

  scaleCOde (_pT) {
    const oneTranslatePW = -840 / 100
    const oneTranslatePH = -210 / 100
    const oneScallingP = (18 - 1) / 100

    const stepScalling = _pT * oneScallingP + 1
    const moveX = oneTranslatePW * _pT
    const moveY = oneTranslatePH * _pT

    this.setTransform(stepScalling, moveX, moveY)
  }

  circles (_pT) {
    const l = this.layer
    l.clear(this.textColor)
    l.fillStyle(this.background)
    l.fillCircle(this.sizes.w * 0.5, this.sizes.h * 0.5, 0.05)

    l.fillCircle(this.sizes.w * 0.51, this.sizes.h * 0.493, 0.05)
    l.fillCircle(this.sizes.w * 0.501, this.sizes.h * 0.503, 0.003)
    l.fillCircle(this.sizes.w * 0.498, this.sizes.h * 0.494, 0.02)
    l.fillCircle(this.sizes.w * 0.504, this.sizes.h * 0.492, 0.024)
    l.fillCircle(this.sizes.w * 0.492, this.sizes.h * 0.510, 0.08)
    l.fillCircle(this.sizes.w * 0.507, this.sizes.h * 0.499, 0.03)

    const divpT = 10 / Math.pow(_pT, 3)
    const slowPT = (_pT - divpT) > 0 ? _pT - divpT : 0

    const finalScalling = 2600 - 1
    const scalling = finalScalling / 100 * slowPT + 1
    const moveX = getLeftSideScallingMove(this.sizes.w, finalScalling) / 100 * slowPT
    const moveY = getLeftSideScallingMove(this.sizes.h, finalScalling) / 100 * slowPT

    this.setTransform(scalling, moveX, moveY)
  }

  outScalling (_pT) {
    const params = this.phrasesParams
    const mainTitleFont = getReturnPtValue(_pT, params.mainSize)
    const smallTitleFont = getReturnPtValue(_pT, params.smallFontSize)

    const mainFontXCoef = 0.5 - getReturnPtValue(_pT, 0.5 - params.mainTitleW)
    const mainFontYCoef = 0.5 - getReturnPtValue(_pT, 0.5 - params.mainTitleH)

    const smallFontXCoef = 0.5 - getReturnPtValue(_pT, 0.5 - params.smallTitleW)
    const smallFontYCoef = 0.5 - getReturnPtValue(_pT, 0.5 - params.smallTitleH)

    this.clear()
    this.drawMainTitle(mainTitleFont, mainFontXCoef, mainFontYCoef)
    this.drawSmallTitle(smallTitleFont, smallFontXCoef, smallFontYCoef)
  }
}
