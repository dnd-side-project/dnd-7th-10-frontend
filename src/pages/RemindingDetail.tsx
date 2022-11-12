import React, { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/native'
import Header, { IIconButton } from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupContent from '../components/RemindingSetup/SetupContent'
import { useFocusEffect } from '@react-navigation/native'
import { BackHandler } from 'react-native'
import { RouterParamList } from './Router'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import api from '../lib/api'
import { IRemind } from '../components/Remind/Notice'
import RemindingDetailInfo from '../components/RemindingDetail/RemindingDetailInfo'
import { IArticleSelected } from '../components/RemindingGather/GatherArticleList'
import { foldersDetailFamily, IArticle } from '../recoil/folders'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import useFolderList from '../components/Home/FolderList.hook'
import useModal from '../hooks/useModal'
import useHeaderEvent from '../hooks/useHeaderEvent'
import { fcmTokenAtom, modalStateAtom } from '../recoil/global'
import useToast, { createCheckToast, createWarnToast } from '../hooks/useToast'

const RemindingDetailView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingDetailScrollView = styled.ScrollView`
  flex: 1;
`

const RemindingDetailContent = styled.View`
  flex: 1;
`

const containerStyle = { flexGrow: 1 }

const iconButtons: IIconButton[] = [
  {
    name: 'remind-detail-trash',
    source: require('../assets/images/trash.png')
  },
  {
    name: 'remind-detail-edit',
    source: require('../assets/images/edit.png')
  }
]

const RemindingDetail = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'RemindingDetail'>) => {
  const [remind] = useState<IRemind>(route.params.remind)
  const targetToken = useRecoilValue(fcmTokenAtom)
  const [articles, setArticles] = useState<IArticleSelected[]>([])
  const [, fetchFolders] = useFolderList()
  const { showModal } = useModal()
  const showToast = useToast()
  const [modalShow, setModalShow] = useState<boolean>(false)
  const resetModal = useResetRecoilState(modalStateAtom)

  function fetchRemind() {
    api.get('/remind')
  }

  function handleDeletePress() {
    setModalShow(true)
    showModal(
      '해당 알림을 삭제하시겠어요?',
      '작성하신 알림을 삭제하면\n다신 이 알림을 확인해 볼 수 없어요!',
      '삭제할래요',
      '수정할래요'
    )
      .then(value => {
        if (value) {
          deleteRemind()
        } else {
          moveToEdit()
        }
      })
      .catch()
      .finally(() => setModalShow(false))
  }

  function deleteRemind() {
    console.log(remind.cron)
    api
      .post('/quartz', {
        cron: remind.cron,
        mode: 'delete',
        modifiedCron: '',
        targetToken,
        articleIds: []
      })
      .then(response => {
        if (response.status === 200) {
          showToast(createCheckToast('해당 알림을 삭제했어요!'))
          navigation.goBack()
        }
      })
      .catch(e => {
        console.error(e)
        showToast(createWarnToast('해당 알림을 삭제하지 못했어요.'))
      })
  }

  const fetchArticles = useRecoilCallback(
    ({ snapshot }) =>
      () => {
        setArticles([])
        if (remind) {
          api
            .get('/articles')
            .then(async response => {
              if (response.status === 200) {
                const articleList = response.data as IArticle[]
                const refinedArticles = await Promise.all(
                  remind.articleList.map(async remindArticle => {
                    const articleId = remindArticle.id
                    const article = articleList.find(
                      ({ id }) => articleId === id
                    )
                    if (article) {
                      const folder = await snapshot.getPromise(
                        foldersDetailFamily(article.folderId)
                      )
                      if (folder) {
                        return {
                          articleName:
                            article?.openGraph?.linkTitle || '제목 없음',
                          articleImage: article?.openGraph?.linkImage,
                          articleId,
                          folderName: folder.folderTitle
                        }
                      }
                    }
                    return {
                      articleId,
                      articleName:
                        remindArticle?.openGraph?.linkTitle || '제목 없음',
                      folderName: '기본 폴더',
                      articleImage: remindArticle?.openGraph?.linkImage
                    }
                  })
                )
                setArticles(refinedArticles)
              }
            })
            .catch(e => {
              console.error('failed to fetch articles')
              console.error(e.message)
            })
        }
      },
    [remind]
  )

  function onClick(name: string) {
    if (name === 'remind-detail-trash') {
      handleDeletePress()
    } else if (name === 'remind-detail-edit') {
      moveToEdit()
    }
  }

  function moveToEdit() {
    if (!fcmTokenAtom) {
      showToast(createWarnToast('푸시 토큰을 발급 받을 수 없습니다.'))
      return
    }

    navigation.navigate('RemindingEdit', {
      remind
    })
  }

  const { addEventListener, removeEventListener } = useHeaderEvent()

  useEffect(() => {
    addEventListener(onClick)
    return () => {
      removeEventListener(onClick)
    }
  }, [addEventListener, onClick, removeEventListener])

  const exitBehavior = () => {
    if (modalShow) {
      setModalShow(false)
      resetModal()
    } else {
      navigation.goBack()
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchFolders()
      fetchRemind()
      fetchArticles()

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
    <RemindingDetailView>
      <Header iconButtons={iconButtons}>알림 설정</Header>
      <RemindingDetailScrollView contentContainerStyle={containerStyle}>
        <RemindingDetailContent>
          <SetupTop isRemindOn setIsRemindOn={() => {}} />
          <RemindingDetailInfo cron={remind.cron} />
          <SetupContent articles={articles} />
        </RemindingDetailContent>
      </RemindingDetailScrollView>
    </RemindingDetailView>
  )
}

export default RemindingDetail
