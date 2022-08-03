import styled from '@emotion/native'
import React from 'react'

import FolderImage from '../assets/image/folder.svg'

const FolderBox = styled.View`
  margin: 8px 0;
`

const FolderName = styled.Text`
  position: absolute;
  color: white;
  font-size: 16px;
  font-family: 'Pretendard-Medium';
  bottom: 42px;
  width: 90px;
  text-align: right;
  left: 28px;
`

const FolderCount = styled.Text`
  position: absolute;
  left: 28px;
  top: 18px;
  color: rgba(255, 255, 255, 0.5);
  font-family: 'Pretendard-Medium';
  font-size: 14px;
`

interface Props {
  name: string
  count?: number
}

const Folder = ({ name, count }: Props) => {
  return (
    <FolderBox>
      <FolderImage />
      <FolderCount>{count || 0}</FolderCount>
      <FolderName>{name}</FolderName>
    </FolderBox>
  )
}

export default Folder
