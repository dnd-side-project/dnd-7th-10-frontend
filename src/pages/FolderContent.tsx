import React from 'react'
import styled from '@emotion/native'
// import FolderCardList from '../components/FolderContent/FolderCardList'
import Header, { IIconButton } from '../components/Header'
import FolderEmpty from '../components/FolderContent/FolderEmpty'

const FolderDescView = styled.View`
  flex: 1;
`

const FolderContent = () => {
  const iconButtons: IIconButton[] = [
    {
      name: 'search',
      source: require('../assets/images/search.png'),
      onPress: () => console.log('h')
    },
    {
      name: 'link',
      source: require('../assets/images/link.png'),
      onPress: () => console.log('h')
    }
  ]

  return (
    <FolderDescView>
      <Header iconButtons={iconButtons}>디자인 레퍼런스</Header>
      <FolderEmpty />
    </FolderDescView>
  )
}

export default FolderContent
