import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import NoticeTop from '../components/RemindingNotice/NoticeTop'
import { backgroundWithColor } from '../styles/backgrounds'
import BottomButton from '../components/Common/BottomButton'
import ButtonGroup from '../components/Common/ButtonGroup'
import Button from '../components/Common/Button'
import Empty from '../components/Common/Empty'
import NoticeContent from '../components/RemindingNotice/NoticeContent'

const RemindingNoticeView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingNotice = () => {
  return (
    <RemindingNoticeView>
      <Header hideBack>리마인딩 알림</Header>
      <NoticeTop />
      {true ? (
        <NoticeContent />
      ) : (
        <Empty
          text={'북마크한 링크들이 없어요!\n리마인딩할 링크들을 모아볼까요?'}
        />
      )}
      <BottomButton>
        <ButtonGroup>
          <Button flex={1} group secondary>
            다음에
          </Button>
          <Button flex={2} group>
            링크 모으러 가기
          </Button>
        </ButtonGroup>
      </BottomButton>
    </RemindingNoticeView>
  )
}

export default RemindingNotice
