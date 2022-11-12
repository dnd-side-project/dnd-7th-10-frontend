import React, { useEffect } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import NoticeTop from '../components/RemindingNotice/NoticeTop'
import { backgroundWithColor } from '../styles/backgrounds'
import BottomButton from '../components/Common/BottomButton'
import ButtonGroup from '../components/Common/ButtonGroup'
import Button from '../components/Common/Button'
import Empty from '../components/Common/Empty'
import NoticeContent from '../components/RemindingNotice/NoticeContent'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import useToast, { createWarnToast, ToastOffset } from '../hooks/useToast'
import useArticleDetail from '../hooks/useArticleDetail'
import { StackActions } from '@react-navigation/native'
import { useSetRecoilState } from 'recoil'
import { noticeAtom } from '../recoil/global'

const RemindingNoticeView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingNotice = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'RemindingNotice'>) => {
  const { articleId, remindId } = route.params
  const showToast = useToast()
  if (!articleId || !remindId) {
    showToast(
      createWarnToast('아티클을 찾을 수 없습니다.', ToastOffset.Default)
    )

    navigation.goBack()
  }

  const setNotice = useSetRecoilState(noticeAtom)

  const {
    isLoading,
    isError,
    recoilValue: articleDetail
  } = useArticleDetail(articleId, true)

  const onGatherPress = () => {
    navigation.goBack()
    navigation.navigate('RemindMain')
  }

  const onCancelPress = () => {
    navigation.goBack()
  }

  const onReadPress = () => {
    navigation.dispatch(
      StackActions.replace('Browser', {
        url: articleDetail.linkUrl,
        articleId,
        readable: true
      })
    )
  }

  useEffect(() => {
    console.log('remind opened')
    setNotice(null)
  }, [])

  return (
    <RemindingNoticeView>
      <Header hideBack>리마인딩 알림</Header>
      <NoticeTop />
      {isLoading && <></>}
      {!isLoading && !isError && articleDetail && (
        <NoticeContent article={articleDetail} />
      )}
      {isError && (
        <Empty
          icon
          text={'모든 링크를 다 읽었어요!\n알림 받을 링크를 모아보세요.'}
        />
      )}
      <BottomButton>
        {isError ? (
          <Button onPress={onGatherPress}>링크 모으러 가기</Button>
        ) : (
          <ButtonGroup>
            <Button flex={1} group secondary onPress={onCancelPress}>
              다음에
            </Button>
            <Button flex={2} group onPress={onReadPress}>
              바로 읽으러 가기
            </Button>
          </ButtonGroup>
        )}
      </BottomButton>
    </RemindingNoticeView>
  )
}

export default RemindingNotice
