import React, { useState, useCallback, useEffect } from 'react'
import styled from '@emotion/native'
import { BackHandler } from 'react-native'
import Header from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupPicker from '../components/RemindingSetup/SetupPicker'
import SetupContent from '../components/RemindingSetup/SetupContent'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { IArticleSelected } from '../components/RemindingGather/GatherArticleList'
import api from '../lib/api'
import { useRecoilCallback, useRecoilValue, useResetRecoilState } from 'recoil'
import { fcmTokenAtom, modalStateAtom } from '../recoil/global'
import useToast, {
  createCheckToast,
  createWarnToast,
  ToastOffset
} from '../hooks/useToast'
import { RouterParamList } from './Router'
import useModal from '../hooks/useModal'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { foldersDetailFamily, IArticle } from '../recoil/folders'
import { IRemind } from '../components/Remind/Notice'

const RemindingEditView = styled.View`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const RemindingEditScrollView = styled.ScrollView`
  flex: 1;
`

const RemindingEditContent = styled.View`
  flex: 1;
`

let isLoading = false

const containerStyle = { flexGrow: 1 }

const RemindingEdit = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'RemindingEdit'>) => {
  const remind = route.params?.remind!

  const targetToken = useRecoilValue(fcmTokenAtom)
  const [scrollLock, setScrollLock] = useState<boolean>(false)
  const [isRemindOn, setIsRemindOff] = useState<boolean>(true)
  const [cron] = useState<string>(remind.cron || '')
  const [modifiedCron, setModifiedCron] = useState<string>(remind.cron || '')
  const [modalShow, setModalShow] = useState<boolean>(false)
  const [articles, setArticles] = useState<IArticleSelected[]>([])
  const resetModal = useResetRecoilState(modalStateAtom)
  const showToast = useToast()
  const { showModal } = useModal()

  useEffect(() => {
    fetchArticles()
  }, [])

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

  const onFocus = async () => {
    const gathers = await AsyncStorage.getItem('gather-selects')
    await AsyncStorage.setItem('gather-selects', '')
    if (gathers && gathers.length > 0) {
      const selectedArticles: IArticleSelected[] = JSON.parse(gathers)
      setArticles(() => selectedArticles)
    }
  }

  useFocusEffect(
    useCallback(() => {
      onFocus()
      const backAction = () => {
        if (modalShow) {
          resetModal()
          setModalShow(false)
        } else {
          handleBackPress()
        }
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
      return () => {
        subscription.remove()
      }
    }, [modalShow])
  )

  useEffect(() => {
    console.log(cron)
  }, [cron])

  const handleBackPress = () => {
    setModalShow(true)
    showModal(
      '지금 나가면 저장되지 않아요!',
      '작성하고 있던 편집을 중단하면\n지금까지 편집한 내용이 사라져요!',
      '네, 나갈래요',
      '다시 돌아갈래요'
    )
      .then(exit => {
        if (exit) {
          navigation.goBack()
        }
        setModalShow(false)
      })
      .catch(() => {
        console.error('error occured while process modal')
      })
      .finally(() => {
        setModalShow(false)
      })
  }

  useEffect(() => {
    console.log(modifiedCron)
  }, [modifiedCron])

  function moveToRemind() {
    api
      .get<IRemind[]>('/remind')
      .then(response => {
        if (response.status === 200) {
          const newRemind = response.data[response.data.length - 1]
          navigation.goBack()
          navigation.goBack()
          console.log('new one ', newRemind)
          if (newRemind) {
            navigation.navigate('RemindingDetail', {
              remind: newRemind
            })
          }
        }
      })
      .catch(() => {
        showToast(createWarnToast('리마인드로 이동할 수 없습니다.'))
      })
  }

  const onSavePress = () => {
    const articleIds = articles.map(({ articleId }) => articleId)
    if (isLoading) {
      return
    }
    if (!targetToken) {
      showToast(createWarnToast('푸시 토큰을 발급 받을 수 없습니다.'))
      return
    }
    if (cron.split(' ')[5] === '*') {
      showToast(createWarnToast('알림을 받을 요일을 선택해주세요.'))
      return
    }
    if (articleIds.length === 0) {
      showToast(createWarnToast('알림을 받을 링크를 모아주세요.'))
      return
    }
    isLoading = true
    api
      .post('/quartz', {
        articleIds,
        cron,
        modifiedCron,
        mode: 'modify',
        targetToken
      })
      .then(response => {
        if (response.status === 200) {
          showToast(
            createCheckToast(
              '리마인드 알림을 수정했습니다.',
              ToastOffset.BottomTab
            )
          )
          moveToRemind()
        } else {
          showToast(
            createWarnToast(
              '리마인드 알림을 생성할 수 없습니다.',
              ToastOffset.BottomTab
            )
          )
        }
      })
      .catch(() => {
        showToast(
          createWarnToast(
            '리마인드 알림을 생성할 수 없습니다.',
            ToastOffset.BottomTab
          )
        )
      })
      .finally(() => (isLoading = false))
  }

  return (
    <RemindingEditView>
      <Header save onSavePress={onSavePress} onBackPress={handleBackPress}>
        알림 설정
      </Header>
      <RemindingEditScrollView
        scrollEnabled={!scrollLock}
        contentContainerStyle={containerStyle}
      >
        <RemindingEditContent>
          <SetupTop isRemindOn={isRemindOn} setIsRemindOn={setIsRemindOff} />
          <SetupPicker
            defaultCron={cron}
            onScrollChange={setScrollLock}
            onCronChange={setModifiedCron}
          />
          <SetupContent articles={articles} />
        </RemindingEditContent>
      </RemindingEditScrollView>
    </RemindingEditView>
  )
}

export default RemindingEdit
