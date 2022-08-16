import React from 'react'
import styled from '@emotion/native'
import Tag from '../components/Tag'

const TagsView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  border-width: 2px 0px 2px 0px;
  border-color: gray;
  width: 414px;
  height: 57px;
  padding: 11px 24px;
  margin: 10px 0px;
  position: relative;
`

const TagImage = styled.Image`
  width: 24px;
  height: 24px;
`

const TagAddButton = styled.TouchableOpacity`
  position: absolute;
  right: 36px;
  top: 17px;
`

interface Props {
  tags: string[]
}

const TagBar = ({ tags }: Props) => {
  return (
    <TagsView>
      {tags.map(el => (
        <Tag tag={el} />
      ))}
      <TagAddButton>
        <TagImage source={require('../assets/images/icon_+.png')} />
      </TagAddButton>
    </TagsView>
  )
}

export default TagBar
