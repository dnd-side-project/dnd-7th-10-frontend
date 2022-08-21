import React, { useEffect, useMemo, useState } from 'react'
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

const LinkAddPageView = styled.View`
  ${backgroundWithColor('gray_1')}
  flex: 1;
`

const LinkContentScroll = styled.ScrollView`
  flex: 1;
`

const LinkAddContentView = styled.View`
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
  const [linkUrl, setLinkUrl] = useState<string>('')
  const [folderId, setFolderId] = useState<string>('')
  const [tagIds, setTagIds] = useState<string[]>([])

  const isCreatable = useMemo(
    () => linkUrl.length > 0 && folderId !== '',
    [linkUrl, folderId]
  )

  useEffect(() => {
    fetchTagList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (route.params && route.params.folderId) {
      setFolderId(route.params.folderId)
    }
  }, [route])

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
        console.error(error)
      })
  }

  const onTagAddPress = () => {
    setIsInputShow(!isInputShow)
  }

  const onTagClosePress = () => {
    const trimmedTagName = tagName.trim()
    if (tagName.length === 0) {
      return
    }
    if (tagName.length > 20) {
      return
    }
    api
      .post<ITag>('/tag', { tagName: trimmedTagName })
      .then(response => {
        if (response.status === 200) {
          setIsInputShow(false)
          fetchTagList()
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
    }
  }

  const onTagRemovePress = (tagId: string) => {
    api
      .delete(`/tag/${tagId}`)
      .then(response => {
        if (response.status === 200) {
          fetchTagList()
        }
      })
      .catch(error => console.error(error))
  }

  return (
    <LinkAddPageView>
      <Header>링크추가</Header>
      <LinkContentScroll contentContainerStyle={containerStyle}>
        <LinkAddContentView>
          <SectionTitle title="링크 URL" />
          <SectionContent>
            <Input value={linkUrl} onChangeText={setLinkUrl} />
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
                remove={isInputShow}
                tags={tags}
                selectedIds={tagIds}
                onTagPress={onTagPress}
                onRemovePress={onTagRemovePress}
              />
            )}
          </SectionContent>
        </LinkAddContentView>
        <BottomButton>
          <Button disabled={!isCreatable} onPress={onPress}>
            링크를 담을 폴더 생성하기
          </Button>
        </BottomButton>
      </LinkContentScroll>
      <LinkAddInputView disabled={!isInputShow} style={shadow}>
        <Input
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
