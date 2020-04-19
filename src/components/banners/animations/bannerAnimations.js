import IWantToBe from './i-want-to-be'
import WordsBlocks from './wordsBlocks'

const animations = {
  iWantBe: 'iWantToBe',
  blocks: 'wordsBlocks'
}

/*
  name - name for animation
  props
    canvasElement
    background
    textColor
    width
    height
    isSounds
*/
export default function (_name, _props) {
  return {
    name: _name,
    props: _props,
    mounted () {
      switch (this.name) {
        case animations.iWantBe:
          this.animation = new IWantToBe(this.props)
          this.animation.draw()
          break
        case animations.blocks:
          this.animation = new WordsBlocks(this.props)
      }
    },
    action () {
      if (this.animation) {
        switch (this.name) {
          case animations.iWantBe:
            this.animation.animateBottom()
        }
      }
    },
    sound (_isSound) {
      this.animation.sound(_isSound)
    }
  }
}
