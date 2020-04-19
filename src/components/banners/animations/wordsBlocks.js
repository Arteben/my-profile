import cq from './canvasquery'
import click from '@/assets/sounds/478_click.wav'

export default class CanvasQueryBanner {
  constructor(_props) {
    // var width = _props.width
    // var height = _props.height

    this.backgroundColor = _props.background || 'black'
    this.textColor = _props.textColor || 'white'
    this.ventureFont = '14pt venture'
    this.maincraftFont = '13px maincraft'
    this.isSound = _props.isSound
    this.audio = new Audio(click)
    // this.mainFont

    this.l = cq(_props.canvas)
  }
}
