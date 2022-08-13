import React, { useCallback } from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'

function getTagBackground(props: TagViewProps) {
  if (props.selected) {
    return backgroundWithColor('gray_6')
  }
  if (props.fixed) {
    return backgroundWithColor('gray_5')
  }
  return backgroundWithColor('gray_3')
}

function getTagColor(props: TagViewProps) {
  if (props.selected || props.fixed) {
    return fontWithColorFamily('gray_1', 'Regular')
  }
  return fontWithColorFamily('gray_6', 'Regular')
}

interface TagViewProps {
  selected?: boolean
  fixed?: boolean
}

const TagView = styled.View<TagViewProps>`
  ${getTagBackground}
  ${flexWithAlign('center', 'center', 'row')}
  height: 35px;
  border-radius: 30px;
  padding: 0 16px;
  margin: 0 8px 12px 0;
`

const TagText = styled.Text<TagViewProps>`
  ${getTagColor}
  font-size: 16px;
  line-height: 35px;
`

const TagRemoveButton = styled.TouchableOpacity`
  margin-left: 8px;
`

const TagRemoveIcon = styled.Image`
  width: 16px;
  height: 16px;
  margin-left: 8px;
`

interface Props extends TagViewProps {
  text: string
  remove?: boolean
}

const tagRemoveButtonInsets = { top: 10, bottom: 10, left: 10, right: 10 }

const Tag = ({ text, remove, selected, fixed }: Props) => {
  const getTagIcon = useCallback(() => {
    if (selected || fixed) {
      return require('../assets/images/tag_remove_white.png')
    }
    return require('../assets/images/tag_remove.png')
  }, [selected, fixed])

  return (
    <TagView selected={selected} fixed={fixed}>
      <TagText selected={selected} fixed={fixed}>
        {text}
      </TagText>
      {remove && (
        <TagRemoveButton hitSlop={tagRemoveButtonInsets}>
          <TagRemoveIcon source={getTagIcon()} resizeMode="contain" />
        </TagRemoveButton>
      )}
    </TagView>
  )
}

export default Tag
