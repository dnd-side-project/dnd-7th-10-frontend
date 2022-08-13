import { css } from '@emotion/native'
import {
  ColorPalette,
  FontFamily,
  IColorPalette,
  IFontFamily
} from './variable'

function fontWithColor(colorName: IColorPalette) {
  return css`
    color: ${ColorPalette[colorName]};
  `
}

function fontWithFamily(fontFamilyName: IFontFamily) {
  return css`
    font-family: ${FontFamily[fontFamilyName]};
  `
}

function fontWithColorFamily(
  colorName: IColorPalette,
  fontFamilyName: IFontFamily
) {
  return css`
    ${fontWithColor(colorName)}
    ${fontWithFamily(fontFamilyName)}
  `
}

export { fontWithColor, fontWithFamily, fontWithColorFamily }
