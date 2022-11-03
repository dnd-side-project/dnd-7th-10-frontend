import React, { useCallback, useEffect } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import TagBar from '../components/LinkContent/TagBar'
import LinkContent from '../components/LinkContent/LinkContent'
import MemoContent from '../components/LinkContent/MemoContent'
import { IIconButton } from '../components/Common/Header'
import { backgroundWithColor } from '../styles/backgrounds'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import useArticleDetail from '../hooks/useArticleDetail'
import useHeaderEvent from '../hooks/useHeaderEvent'
import { Text } from 'react-native-svg'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'
import api from '../lib/api'
import useToast, { createWarnToast } from '../hooks/useToast'

const LinkView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkContentView = styled.View`
  flex: 1;
`

const containerStyle = { flexGrow: 1 }

const LinkContents = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'LinkContents'>) => {
  const iconButtons: IIconButton[] = [
    {
      name: 'edit',
      source: require('../assets/images/edit.png')
    }
  ]

  const showToast = useToast()

  const { articleId } = route.params

  const {
    isLoading,
    isError,
    recoilValue: articleDetail,
    refresh
  } = useArticleDetail(articleId, true)

  const onFocus = useCallback(() => {
    refresh(true)
  }, [refresh])

  useEffect(() => {
    navigation.addListener('focus', onFocus)
    return () => {
      navigation.removeListener('focus', onFocus)
    }
  }, [onFocus, navigation])

  const onClick = useCallback((name: string) => {
    if (name === 'edit') {
      navigateToEdit()
    }
  }, [])

  const navigateToEdit = () => {
    navigation.navigate('LinkEdit', {
      articleId: articleId
    })
  }

  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, removeEventListener, onClick])

  const onWebPress = () => {
    navigation.navigate('Browser', {
      url: articleDetail.linkUrl,
      articleId: articleDetail.id
    })
  }

  const onBookmarkPress = () => {
    api.patch(`/article/mark/${articleId}`).then(response => {
      if (response.status !== 200) {
        showToast(createWarnToast('북마크 변경에 실패하였습니다.'))
      }
      if (refresh) {
        refresh(true)
      }
    })
  }

  return (
    <LinkView>
      <Header iconButtons={iconButtons}>링크 정보</Header>
      <LinkContentScroll contentContainerStyle={containerStyle}>
        <LinkContentView>
          {!isLoading && (
            <>
              <LinkContent
                article={articleDetail}
                onBookmarkPress={onBookmarkPress}
              />
              <TagBar tags={articleDetail.tags} onAddPress={navigateToEdit} />
              <MemoContent
                memos={articleDetail.memos}
                article={articleDetail}
              />
            </>
          )}
          {isError && <Text>Error</Text>}
        </LinkContentView>
        {!isLoading && !isError && (
          <BottomButton>
            <Button onPress={onWebPress}>웹사이트로 이동하기</Button>
          </BottomButton>
        )}
      </LinkContentScroll>
    </LinkView>
  )
}

export default LinkContents
