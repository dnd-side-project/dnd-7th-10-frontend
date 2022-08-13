import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'

const FolderSelectItemView = styled.View`
  width: 108px;
  margin-right: 16px;
`

const FolderSelectItemImage = styled.Image`
  width: 108px;
  height: 90px;
  margin-bottom: 6px;
`

const FolderSelectItemText = styled.Text`
  ${fontWithColorFamily('gray_6', 'SemiBold')}
  font-size: 14px;
`

const FolderSelectedImage = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 34px;
  left: 38px;
`

interface Props {
  selected?: boolean
}

const FolderSelectItem = ({ selected }: Props) => {
  return (
    <FolderSelectItemView>
      <FolderSelectItemImage
        source={require('../../assets/images/folder_navy.png')}
        resizeMode="stretch"
      />
      <FolderSelectItemText>기본 폴더</FolderSelectItemText>
      {selected && (
        <FolderSelectedImage
          source={require('../../assets/images/folder_selected.png')}
          resizeMode="contain"
        />
      )}
    </FolderSelectItemView>
  )
}

export default FolderSelectItem
