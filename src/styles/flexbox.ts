import { css } from '@emotion/native'
import { FlexAlignType } from 'react-native'

function flexWithAlign(
  alignItems: FlexAlignType = 'stretch',
  justifyContent: FlexAlignType = 'flex-start'
) {
  return css`
    align-items: ${alignItems};
    justify-content: ${justifyContent};
  `
}

function flexWithSelfAlign(
  alignItems: FlexAlignType = 'stretch',
  justifyContent: FlexAlignType = 'flex-start'
) {
  return css`
    align-self: ${alignItems};
    justify-self: ${justifyContent};
  `
}

export { flexWithAlign, flexWithSelfAlign }
