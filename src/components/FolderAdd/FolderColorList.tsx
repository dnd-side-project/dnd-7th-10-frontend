import React from 'react'
import styled from '@emotion/native'
import { flexWithAlign } from '../../styles/flexbox'
import FolderColorItem from './FolderColorItem'

const FolderColorListView = styled.View`
  ${flexWithAlign('flex-start', 'space-between', 'row')}
  flex-wrap: wrap;
`

const FolderColorList = () => {
  return (
    <FolderColorListView>
      {[1, 2, 3].map(e => (
        <FolderColorItem selected key={`${e}`} />
      ))}
    </FolderColorListView>
  )
}

export default FolderColorList
