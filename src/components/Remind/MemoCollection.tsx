import React from 'react'
import styled from '@emotion/native'
import MemoCard from './MemoCard'

const MemoCollectionView = styled.View``

const MemoCollection = () => {
  return (
    <MemoCollectionView>
      <MemoCard />
    </MemoCollectionView>
  )
}

export default MemoCollection
