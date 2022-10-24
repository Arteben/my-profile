import IWantToBe from './i-want-to-be'
import WordsBlocks from './wordsBlocks'
import ScallingIsArt from './scalling'

export const animationList = [
  'iWantBe',
  'blocks',
  'scalling',
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

  const createAnimation = (
    _Class,
    _playMethod,
    _clearNameMethod,
  ) => {
    picture = new _Class(_props)
    animation.picture = picture
    animation.play = () => {
      _playMethod(picture)
    }
    if (typeof picture[_clearNameMethod] == 'function') {
      picture[_clearNameMethod]()
    }
  }

  switch (_name) {
    case 'iWantBe':
      createAnimation(IWantToBe, (_animation) => {
        _animation.animateBottom()
      }, 'draw')
      break
    case 'blocks':
      createAnimation(WordsBlocks, (_anim) => {
        _anim.drop()
      }, 'draw')
      break
    case 'scalling':
      createAnimation(ScallingIsArt, (_anim) => {
        _anim.startScalling()
      }, 'clear')
  }

  return animation
}
