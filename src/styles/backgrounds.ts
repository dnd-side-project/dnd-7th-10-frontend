import { css } from '@emotion/native'
import { ColorPalette, IColorPalette } from './variable'

function backgroundWithColor(colorName: IColorPalette) {
  return css`
    background-color: ${ColorPalette[colorName]};
  `
}

export { backgroundWithColor }
