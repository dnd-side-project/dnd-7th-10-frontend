import React, { useState, useCallback } from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import SetupTop from '../components/RemindingSetup/SetupTop'
import { backgroundWithColor } from '../styles/backgrounds'
import SetupContent from '../components/RemindingSetup/SetupContent'
import { useFocusEffect } from '@react-navigation/native'

import { RouterParamList } from './Router'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import api from '../lib/api'
import { IRemind } from '../components/Remind/Notice'
import RemindingDetailInfo from '../components/RemindingDetail/RemindingDetailInfo'
import { IArticleSelected } from '../components/RemindingGather/GatherArticleList'
import { foldersDetailFamily, IArticle } from '../recoil/folders'
import { useRecoilCallback } from 'recoil'
import useFolderList from '../components/Home/FolderList.hook'

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

const RemindingDetail = ({
  route
}: NativeStackScreenProps<RouterParamList, 'RemindingDetail'>) => {
  const [remind] = useState<IRemind>(route.params.remind)
  const [articles, setArticles] = useState<IArticleSelected[]>([])
  const [, fetchFolders] = useFolderList()

  function fetchRemind() {
    api.get('/remind')
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

  useFocusEffect(
    useCallback(() => {
      fetchFolders()
      fetchRemind()
      fetchArticles()
    }, [])
  )

  return (
    <RemindingDetailView>
      <Header>알림 설정</Header>
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
