import { css } from '@emotion/native'
import { ColorPalette, IColorPalette } from './variable'

function backgroundWithColor(colorName: IColorPalette) {
  return css`
    background-color: ${ColorPalette[colorName]};
  `
}

const shadow = {
  shadowOffset: { width: 10, height: 10 },
  shadowColor: 'black',
  shadowOpacity: 1,
  elevation: 3,
  zIndex: 999
}

export { backgroundWithColor, shadow }
