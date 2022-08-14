import React from 'react'
import styled from '@emotion/native'
import Tag from '../components/Tag'
import { Image } from 'react-native'

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

const TagAddButton = styled.TouchableOpacity`
  position: absolute;
  right: 36px;
  top: 17px;
`

const TagBar = () => {
  return (
    <TagsView>
      <Tag />
      <Tag />
      <Tag />
      <TagAddButton>
        <Image
          source={require('../assets/images/icon_+.png')}
          style={{ width: 24, height: 24 }}
        />
      </TagAddButton>
    </TagsView>
  )
}

export default TagBar
