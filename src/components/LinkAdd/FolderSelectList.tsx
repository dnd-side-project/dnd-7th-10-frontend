import React from 'react'
import styled from '@emotion/native'
import FolderSelectItem from './FolderSelectItem'

const FolderSelectListScrollView = styled.ScrollView`
  margin: 0 -24px;
`

const FolderSelectListView = styled.View`
  flex-direction: row;
  padding-left: 24px;
`

const FolderSelectList = () => {
  return (
    <FolderSelectListScrollView horizontal>
      <FolderSelectListView>
        <FolderSelectItem selected />
        <FolderSelectItem />
        <FolderSelectItem />
        <FolderSelectItem />
      </FolderSelectListView>
    </FolderSelectListScrollView>
  )
}

export default FolderSelectList
