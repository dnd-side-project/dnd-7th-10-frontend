import React from 'react'
import styled from '@emotion/native'
import FolderCard from './FolderCard'
import { backgroundWithColor } from '../../styles/backgrounds'

const FolderCardScrollView = styled.ScrollView`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const FolderCardView = styled.View`
  flex: 1;
  padding: 24px;
`

const FolderCardList = () => {
  return (
    <FolderCardScrollView>
      <FolderCardView>
        <FolderCard />
        <FolderCard />
        <FolderCard />
        <FolderCard />
      </FolderCardView>
    </FolderCardScrollView>
  )
}

export default FolderCardList
