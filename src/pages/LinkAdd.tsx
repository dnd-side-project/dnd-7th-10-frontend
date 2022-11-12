import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import Input from '../components/Common/Input'
import { backgroundWithColor, shadow } from '../styles/backgrounds'
import SectionTitle from '../components/Common/SectionTitle'
import SectionContent from '../components/Common/SectionContent'
import FolderSelectList from '../components/LinkAdd/FolderSelectList'
import TagGuide from '../components/LinkAdd/TagGuide'
import TagList from '../components/Common/TagList'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps, RouterParamList } from './Router'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'
import useTagList from '../hooks/useTagList'
import api from '../lib/api'
import { IArticle } from '../recoil/folders'
import useFolderList from '../components/Home/FolderList.hook'
import { NativeStackScreenProps } from '@react-navigation/native-stack/lib/typescript/src/types'
import { ITag } from '../recoil/tags'
import useToast, { createWarnToast, ToastOffset } from '../hooks/useToast'
import { Platform, ScrollView, TextInput } from 'react-native'
import { useRecoilState } from 'recoil'
import { quicklinkAtom } from '../recoil/global'
import { isValidUrl } from '../lib/urlcheck'

const LinkAddPageView = styled.View`
  ${backgroundWithColor('gray_1')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkAddContentView = styled.KeyboardAvoidingView`
  ${backgroundWithColor('gray_1')}
  padding: 0 24px;
  flex: 1;
`

interface InputViewProps {
  disabled: boolean
}

const LinkAddInputView = styled.View<InputViewProps>`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 72px;
  background: white;
  z-index: 999;
  justify-content: center;
  padding: 0 24px;
  display: ${props => (props.disabled ? 'none' : 'flex')};
  elevation: 4;
`

const containerStyle = { flexGrow: 1 }

const LinkAdd = ({
  route
}: NativeStackScreenProps<RouterParamList, 'LinkAdd'>) => {
  const navigation = useNavigation<RouterNavigationProps>()
  const [isInputShow, setIsInputShow] = useState<boolean>(false)
  const [isTagLoading, tags, fetchTagList] = useTagList()
  const [, fetchFolders] = useFolderList()

  const [tagName, setTagName] = useState<string>('')
  const [linkUrl, setLinkUrl] = useState<string>(route.params?.linkUrl || '')
  const [folderId, setFolderId] = useState<string>(route.params?.folderId || '')
  const [tagIds, setTagIds] = useState<string[]>([])

  const [quickLink, setQuickLink] = useRecoilState(quicklinkAtom)

  const inputRef = useRef<TextInput>(null)
  const scrollRef = useRef<ScrollView>(null)
  const showToast = useToast()

  const isCreatable = useMemo(
    () => linkUrl.length > 0 && folderId !== '',
    [linkUrl, folderId]
  )

  useEffect(() => {
    fetchTagList()
    const url = isValidUrl(quickLink.linkUrl || '')
    if (quickLink.linkUrl && url) {
      setLinkUrl(url)
      setQuickLink({
        folderId: undefined,
        linkUrl: undefined
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onPress = () => {
    api
      .post<IArticle>('/article', { folderId, linkUrl, tagIds })
      .then(response => {
        if (response.status === 200) {
          fetchFolders()
          navigation.goBack()
        }
      })
      .catch(error => {
        console.error(JSON.stringify(error, null, 2))
        if (error.response) {
          console.error(JSON.stringify(error.response, null, 2))
        }
        showToast(
          createWarnToast('링크 생성에 실패하였습니다.', ToastOffset.BottomTab)
        )
      })
  }

  const onTagAddPress = () => {
    setIsInputShow(!isInputShow)
    setTimeout(() => {
      if (!isInputShow) {
        inputRef.current?.focus()
        scrollRef.current?.scrollToEnd({ animated: true })
      }
    }, 500)
  }

  const onTagClosePress = () => {
    const trimmedTagName = tagName.trim()
    if (tagName.length === 0) {
      showToast(createWarnToast('태그를 입력하세요', ToastOffset.TagInput))
      return
    }
    if (tagName.length > 20) {
      showToast(
        createWarnToast(
          '글자 수는 20자 이하로 설정해주세요.',
          ToastOffset.TagInput
        )
      )
      return
    }
    api
      .post<ITag>('/tag', { tagName: trimmedTagName })
      .then(response => {
        if (response.status === 200) {
          setIsInputShow(false)
          fetchTagList()
          setTagName('')
        }
      })
      .catch(error => {
        console.error(error)
      })
  }

  const onFolderAddPress = () => {
    navigation.navigate('FolderAdd')
  }

  const onTagPress = (tagId: string) => {
    const index = tagIds.indexOf(tagId)
    if (index > -1) {
      tagIds.splice(index, 1)
      setTagIds([...tagIds])
    } else if (tagIds.length < 3) {
      setTagIds([...tagIds, tagId])
    } else {
      // cannot over 3
      showToast(
        createWarnToast('태그 선택은 최대 3개입니다.', ToastOffset.BottomTab)
      )
    }
  }

  const onTagRemovePress = (tagId: string) => {
    api
      .delete(`/tag/${tagId}`)
      .then(response => {
        if (response.status === 200) {
          fetchTagList()
          const index = tagIds.indexOf(tagId)
          if (index > -1) {
            tagIds.splice(index, 1)
            setTagIds([...tagIds])
          }
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <LinkAddPageView>
      <Header>링크추가</Header>
      <LinkContentScroll ref={scrollRef} contentContainerStyle={containerStyle}>
        <LinkAddContentView
          behavior={Platform.OS === 'android' ? 'padding' : 'height'}
        >
          <SectionTitle title="링크 URL" />
          <SectionContent>
            <Input
              value={linkUrl}
              onChangeText={setLinkUrl}
              placeholder="링크를 입력해주세요."
            />
          </SectionContent>
          <SectionTitle
            title="저장할 폴더 선택"
            plus
            onPlusPress={onFolderAddPress}
          />
          <SectionContent>
            <FolderSelectList folderId={folderId} onChange={setFolderId} />
          </SectionContent>
          <SectionTitle title="태그 선택" plus onPlusPress={onTagAddPress} />
          <SectionContent>
            <TagGuide />
            {!isTagLoading && (
              <TagList
                remove
                tags={tags}
                selectedIds={tagIds}
                onTagPress={onTagPress}
                onRemovePress={onTagRemovePress}
                border={true}
              />
            )}
          </SectionContent>
        </LinkAddContentView>
        <BottomButton>
          <Button disabled={!isCreatable} onPress={onPress}>
            링크 생성 완료하기
          </Button>
        </BottomButton>
      </LinkContentScroll>
      <LinkAddInputView disabled={!isInputShow} style={shadow}>
        <Input
          ref={inputRef}
          value={tagName}
          onChangeText={setTagName}
          small
          disabled={!isInputShow}
          onEnterPress={onTagClosePress}
        />
      </LinkAddInputView>
    </LinkAddPageView>
  )
}

export default LinkAdd
