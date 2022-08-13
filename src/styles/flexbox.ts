import { css } from '@emotion/native'
import { FlexAlignType } from 'react-native'

export type FlexJustifyType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'space-between'
  | 'space-around'
  | 'space-evenly'
  | undefined

export type FlexDirection =
  | 'row'
  | 'column'
  | 'row-reverse'
  | 'column-reverse'
  | undefined

function flexWithAlign(
  alignItems: FlexAlignType = 'stretch',
  justifyContent: FlexJustifyType = 'flex-start',
  flexDirection: FlexDirection = 'column'
) {
  return css`
    align-items: ${alignItems};
    justify-content: ${justifyContent};
    flex-direction: ${flexDirection};
  `
}

function flexWithSelfAlign(
  alignItems: FlexAlignType = 'stretch',
  justifyContent: FlexJustifyType = 'flex-start'
) {
  return css`
    align-self: ${alignItems};
    justify-self: ${justifyContent};
  `
}

export { flexWithAlign, flexWithSelfAlign }
