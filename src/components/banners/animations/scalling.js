import cq from './canvasquery'

const animateStates = {
  'showTitle': 1,
  'scaleCOde': 10,
  // 'toGray': 2,
  // 'scaleRectangles': 3,
}

let animateCounter = 0

export default class CanvasBanner {
  constructor(_props) {
    this.background = _props.background || 'black'
    this.textColor = _props.textColor || 'white'
    this.phrases = ['Code is art', 'that does something']
    this.mainFont = '32px venture'
    this.smallFont = '14px maincraft'
    this.sizes = {
      h: _props.height,
      w: _props.width,
    }

    this.layer = cq(_props.canvas)
    this.layer.textBaseline('top')
    this.layer.textAlign('left')

    this.stateId = 0
    this.stateList = Object.keys(animateStates)
  }

  setTransform (_zoom = 1, _moveX = 0, _moveY = 0) {
    _zoom = (1 > _zoom) ? 1 : _zoom
    this.layer.context.setTransform(_zoom, 0, 0, _zoom, _moveX, _moveY)
  }

  clear() {
    this.layer.clear(this.background)
    this.layer.context.fillStyle = this.textColor
  }

  clearWithTransform() {
    this.setTransform()
    this.clear()
  }

  setNextStateId () {
    const maxStates = this.stateList.length
    const nextStateId = this.stateId + 1
    this.stateId = (nextStateId > maxStates) ? 0 : nextStateId
  }

  getTimeCount () {
    return animateStates[this.stateList[this.stateId]] * 60
  }

  drawScalling () {
    const time = this.getTimeCount()
    const timePercent = 100 / time
    if (animateCounter > time) {
      animateCounter = 0
      this.setNextStateId()
      if (this.stateId !== 0) {
        this.drawScalling()
      }
    } else {
      if (animateCounter === 0) {
        this.clearWithTransform()
      }

      const pT = animateCounter * timePercent

      switch (this.stateList[this.stateId]) {
        case 'showTitle':
          this.showTitle()
          break;
          case 'scaleCOde':
            this.showTitle()
            this.scaleCOde(pT)
          }
      animateCounter++
      window.requestAnimationFrame(() => {
        this.drawScalling()
      })
    }
  }

  showTitle () {
    this.clear()
    this.layer.context.font = this.mainFont
    this.layer.context.fillText(this.phrases[0],
      this.sizes.w * 0.1, this.sizes.h * 0.1)
    this.layer.context.font = this.smallFont
    this.layer.context.fillText(this.phrases[1],
      this.sizes.w * 0.4, this.sizes.h * 0.7)
  }

  scaleCOde (_pT) {
    const oneTranslatePW = -400 / 100
    const oneTranslatePH = -180 / 100
    const oneScallingP = 16 / 100

    const stepScalling = _pT * oneScallingP
    const moveX = oneTranslatePW * _pT
    const moveY = oneTranslatePH * _pT

    this.setTransform(stepScalling, moveX, moveY)
  }
}
