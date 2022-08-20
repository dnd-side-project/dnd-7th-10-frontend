import React from 'react'
import styled from '@emotion/native'
import GatherFolderList from '../components/RemindingGather/GatherFolderList'
import Header from '../components/Common/Header'
import GatherArticleList from '../components/RemindingGather/GatherArticleList'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'

const RemindingGatherView = styled.View`
  flex: 1;
`

const RemindingGather = () => {
  return (
    <RemindingGatherView>
      <Header>링크 모으기</Header>
      <GatherFolderList />
      <GatherArticleList />
      <BottomButton>
        <Button>링크 알림 받기</Button>
      </BottomButton>
    </RemindingGatherView>
  )
}

export default RemindingGather
