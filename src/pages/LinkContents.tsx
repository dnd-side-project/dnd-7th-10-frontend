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
      source: require('../assets/images/icon_edit.png')
    }
  ]

  const { articleId } = route.params

  const {
    isLoading,
    isError,
    recoilValue: articleDetail,
    refresh
  } = useArticleDetail(articleId, true)

  const onFocus = useCallback(() => {
    refresh()
  }, [refresh])

  useEffect(() => {
    navigation.addListener('focus', onFocus)
    return () => {
      navigation.removeListener('focus', onFocus)
    }
  }, [onFocus, navigation])

  const onClick = useCallback(() => {}, [])

  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, removeEventListener, onClick])

  return (
    <LinkView>
      <Header iconButtons={iconButtons}>링크 정보</Header>
      <LinkContentScroll contentContainerStyle={containerStyle}>
        <LinkContentView>
          {!isLoading && (
            <>
              <LinkContent article={articleDetail} />
              <TagBar tags={articleDetail.tags} />
              <MemoContent memos={articleDetail.memos} />
            </>
          )}
          {isError && <Text>Error</Text>}
        </LinkContentView>
      </LinkContentScroll>
    </LinkView>
  )
}

export default LinkContents
