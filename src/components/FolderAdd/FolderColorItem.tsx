import React from 'react'
import styled from '@emotion/native'
import { fontWithColorFamily } from '../../styles/fonts'

const FolderColorItemView = styled.View``

const FolderColorImage = styled.Image`
  width: 108px;
  height: 90px;
`

const FolderColorText = styled.Text`
  ${fontWithColorFamily('gray_1', 'SemiBold')}
  font-size: 14px;
  position: absolute;
  right: 8px;
  bottom: 8px;
`

const FolderSelectedImage = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 32px;
  left: 38px;
`

interface Props {
  selected?: boolean
}

const FolderColorItem = ({ selected }: Props) => {
  return (
    <FolderColorItemView>
      <FolderColorImage
        source={require('../../assets/images/folder_navy.png')}
      />
      <FolderColorText>Navy</FolderColorText>
      {selected && (
        <FolderSelectedImage
          source={require('../../assets/images/folder_selected.png')}
          resizeMode="contain"
        />
      )}
    </FolderColorItemView>
  )
}

export default FolderColorItem
