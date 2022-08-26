import React from 'react'
import styled from '@emotion/native'
// import FolderCardList from '../components/FolderContent/FolderCardList'
import Header, { IIconButton } from '../components/Common/Header'
import RemindingCardList from '../components/RemindingList/RemindingCardList'

const RemindDescView = styled.View`
  flex: 1;
`

const RemindingList = () => {
  const iconButtons: IIconButton[] = [
    {
      name: 'folder-content-search',
      source: require('../assets/images/alert-circle-normal.png')
    }
  ]

  return (
    <RemindDescView>
      <Header iconButtons={iconButtons}>리마인딩 리스트</Header>
      <RemindingCardList />
    </RemindDescView>
  )
}

export default RemindingList
