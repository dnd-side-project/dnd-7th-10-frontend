import React from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import GatherFolderItem from './GatherFolderItem'

const GatherFolderListView = styled.ScrollView`
  ${backgroundWithColor('White')}
  flex-shrink: 0;
  flex-grow: 0;
  width: 100%;
  height: 176px;
`

const GatherFolderView = styled.View`
  ${flexWithAlign('center', 'flex-start', 'row')}
  padding: 28px 16px;
`

const GatherFolderList = () => {
  return (
    <GatherFolderListView horizontal>
      <GatherFolderView>
        <GatherFolderItem folderName="기본 폴더" selected />
        <GatherFolderItem folderName="기본 폴더" />
        <GatherFolderItem folderName="기본 폴더" />
        <GatherFolderItem folderName="기본 폴더" />
        <GatherFolderItem folderName="기본 폴더" />
        <GatherFolderItem folderName="기본 폴더" />
      </GatherFolderView>
    </GatherFolderListView>
  )
}

export default GatherFolderList
