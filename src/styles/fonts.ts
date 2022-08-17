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

function fontWithFull(
  fontFamilyName: IFontFamily,
  size: number,
  lineHeight: number,
  letterSpacing: number
) {
  return css`
    ${fontWithFamily(fontFamilyName)}
    font-size: ${size + 'px'};
    line-height: ${lineHeight + 'px'};
    letter-spacing: ${letterSpacing + 'px'};
  `
}

export { fontWithColor, fontWithFamily, fontWithColorFamily, fontWithFull }
