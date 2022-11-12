import React, { useCallback, useMemo, useState } from 'react'
import styled from '@emotion/native'
import GatherFolderList from '../components/RemindingGather/GatherFolderList'
import Header from '../components/Common/Header'
import GatherArticleList, {
  IArticleSelected
} from '../components/RemindingGather/GatherArticleList'
import BottomButton from '../components/Common/BottomButton'
import Button from '../components/Common/Button'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import useModal from '../hooks/useModal'
import { useFocusEffect } from '@react-navigation/native'
import { BackHandler } from 'react-native'
import { useResetRecoilState } from 'recoil'
import { modalStateAtom } from '../recoil/global'

const RemindingGatherView = styled.View`
  flex: 1;
`

export interface ISelectedFromFolder {
  [key: string]: IArticleSelected[]
}

const RemindingGather = ({
  navigation
}: NativeStackScreenProps<RouterParamList, 'RemindingGather'>) => {
  const [folderId, setFolderId] = useState<string>('')
  const [selectedArticles, setSelectedArticles] = useState<ISelectedFromFolder>(
    {}
  )
  const [modalShow, setModalShow] = useState<boolean>(false)
  const resetModal = useResetRecoilState(modalStateAtom)

  const onArticlePress = (selectedArticle: IArticleSelected) => {
    setSelectedArticles(articles => {
      const newArticles = {
        ...(articles || {})
      }
      let selected = newArticles[folderId]
      if (selected) {
        const index = selected.findIndex(
          ({ articleId }) => articleId === selectedArticle.articleId
        )
        if (index > -1) {
          selected.splice(index, 1)
        } else {
          selected.push(selectedArticle)
        }
      } else {
        selected = [selectedArticle]
      }
      newArticles[folderId] = selected
      return newArticles
    })
  }

  const articles = useMemo(() => {
    const articleArray = (Object.values(selectedArticles) || []).flat()
    return articleArray
  }, [selectedArticles])

  const onFinishPress = async () => {
    await AsyncStorage.setItem('gather-selects', JSON.stringify(articles))
    navigation.goBack()
  }

  const { showModal } = useModal()

  const exitBehavior = async () => {
    if (modalShow) {
      resetModal()
      setModalShow(false)
    } else {
      setModalShow(true)
      showModal(
        '지금 나가면 저장되지 않아요!',
        '변경하고있던 링크 모으기를 중단하면 지금까지 변경한 내용이 사라져요!',
        '네, 나갈래요',
        '수정할래요'
      )
        .then(accept => {
          if (accept) {
            navigation.goBack()
          }
        })
        .catch()
        .finally(() => setModalShow(false))
    }
  }

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        exitBehavior()
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
      return () => subscription.remove()
    }, [modalShow])
  )

  return (
    <RemindingGatherView>
      <Header onBackPress={exitBehavior}>링크 모으기</Header>
      <GatherFolderList
        onChange={setFolderId}
        selectedArticles={selectedArticles}
      />
      <GatherArticleList
        folderId={folderId}
        selectedArticles={selectedArticles}
        onSelectedChange={onArticlePress}
      />
      <BottomButton>
        <Button onPress={onFinishPress}>링크 알림 받기</Button>
      </BottomButton>
    </RemindingGatherView>
  )
}

export default RemindingGather
