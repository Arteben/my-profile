import IWantToBe from './i-want-to-be'
import WordsBlocks from './wordsBlocks'
// import Scalling from './scalling'

export const animationList = [
  'iWantBe',
  'blocks',
  // 'scalling',
]

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

  const animation = {
    name: _name,
    props: _props,
    picture: null,
    sound (_isSound) {
      const animation = this.picture || {}
      animation.isSound = _isSound
    },
  }

  let picture

  switch (_name) {
    case 'iWantBe':
      picture = new IWantToBe(_props)
      animation.picture = picture
      animation.play = () => {
        picture.animateBottom()
      }
      picture.draw()
      break
    case 'blocks':
      picture = new WordsBlocks(_props)
      animation.picture = picture
      animation.play = () => {
        picture.drop()
      }
      picture.draw()
      break
    // case 'scalling':
    //   this.picture = new Scalling(this.props)
    //   // this.play = () => {
    //   //   this.picture.clear()
    //   // }
    //   this.picture.clear()
  }

  return animation
}
