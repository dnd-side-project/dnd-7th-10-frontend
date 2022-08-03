import styled from '@emotion/native'
import React from 'react'
import Folder from './Folder'

const FolderListBox = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  margin: 16px 0;
`

const FolderList = () => {
  const folders = ['안녕', '하이', '기본', '으악']

  return (
    <FolderListBox>
      {folders.map(key => (
        <Folder key={key} name={key} />
      ))}
    </FolderListBox>
  )
}

export default FolderList
