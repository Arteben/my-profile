import IWantToBe from './i-want-to-be'
import WordsBlocks from './wordsBlocks'
import ScallingIsArt from './scalling'

export const animationList = [
  'blocks',
  'scalling',
  'iWantBe',
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
    _updateColors,
  ) => {
    picture = new _Class(_props)
    animation.picture = picture
    animation.play = () => {
      _playMethod(picture)
    }
    animation.updateColors = (_text, _back) => {
      _updateColors(picture, _text, _back)
      animation.play()
    }
    if (typeof picture[_clearNameMethod] == 'function') {
      picture[_clearNameMethod]()
    }
  }

  switch (_name) {
    case 'iWantBe':
      createAnimation(
      IWantToBe,
      (_animation) => {
        _animation.animateBottom()
      },
      'draw',
      (_anim, _text, _color) => {
        _anim.updateColors(_text, _color)
      })
      break
    case 'blocks':
      createAnimation(
      WordsBlocks,
      (_anim) => {
        _anim.drop()
      },
      'draw',
      (_anim, _text, _color) => {
        _anim.updateColors(_text, _color)
      })
      break
    case 'scalling':
      createAnimation(
      ScallingIsArt,
      (_anim) => {
        _anim.startScalling()
      },
      'clear',
      (_anim, _text, _color) => {
        _anim.updateColors(_text, _color)
      })
  }

  return animation
}
