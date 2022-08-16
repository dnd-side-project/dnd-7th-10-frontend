import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import RemindingList from '../components/Remind/RemindingList'
import Notice from '../components/Remind/Notice'
import MemoCollection from '../components/Remind/MemoCollection'

const RemindingView = styled.View``

const iconButtons: IIconButton[] = [
  {
    name: 'alarm',
    source: require('../assets/images/bell.png'),
    onPress: () => console.log('bell')
  }
]

const RemindMain = () => {
  return (
    <RemindingView>
      <Header iconButtons={iconButtons}>리마인딩</Header>
      <RemindingList />
      <Notice />
      <MemoCollection />
    </RemindingView>
  )
}

export default RemindMain
