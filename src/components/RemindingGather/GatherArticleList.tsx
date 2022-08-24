import React, { useMemo } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import { flexWithAlign } from '../../styles/flexbox'
import GatherArticleItem from './GatherArticleItem'
import Empty from '../Common/Empty'
import { useRecoilValue } from 'recoil'
import { foldersDetailFamily, IArticle } from '../../recoil/folders'
import { ISelectedFromFolder } from '../../pages/RemindingGather'
import { useCallback } from 'react'

const GatherArticleListView = styled.ScrollView`
  ${backgroundWithColor('background_1')}
`

const GatherArticleView = styled.View`
  ${flexWithAlign('flex-start', 'space-between', 'row')}
  align-content: flex-start;
  flex-wrap: wrap;
  padding: 16px;
`

const GatherItemTouchable = styled.TouchableOpacity`
  flex: 1;
  min-width: 130px;
`

const EmptyItem = styled.View`
  flex: 1;
  min-width: 130px;
`

const containerStyle = { flexGrow: 1 }

export interface IArticleSelected {
  articleId: string
  folderName: string
  articleImage: string
  articleName: string
}

interface Props {
  folderId: string
  selectedArticles: ISelectedFromFolder
  onSelectedChange?: (value: IArticleSelected) => void
}
const GatherArticleList = ({
  folderId,
  selectedArticles,
  onSelectedChange
}: Props) => {
  const folder = useRecoilValue(foldersDetailFamily(folderId))

  const articles = useMemo(() => {
    if (folder && folder.articles) {
      return folder.articles.filter(({ bookmark }) => bookmark)
    }
    return []
  }, [folder])

  const onCardPress = useCallback(
    (article: IArticle) => {
      const payload = {
        articleId: article.id,
        articleImage: article.openGraph.linkImage,
        folderName: folder.folderTitle,
        articleName: article.openGraph.linkTitle
      }
      if (onSelectedChange) {
        onSelectedChange(payload)
      }
    },
    [folder]
  )

  const isSelected = useCallback(
    (articleId: string) => {
      const finded = Object.values(selectedArticles || {})
        .flat()
        .find(article => article.articleId === articleId)

      return !!finded
    },
    [selectedArticles, folderId]
  )

  return (
    <>
      {articles.length === 0 ? (
        <Empty
          icon
          source={require('../../assets/images/alert-circle-normal.png')}
          button
          text={'북마크한 링크들이 없어요!\n리마인딩할 링크들을 모아볼까요?'}
        />
      ) : (
        <GatherArticleListView contentContainerStyle={containerStyle}>
          <GatherArticleView>
            {articles.map(article => (
              <GatherItemTouchable
                key={article.id}
                activeOpacity={0.85}
                onPress={() => onCardPress(article)}
              >
                <GatherArticleItem
                  source={article.openGraph.linkImage}
                  articleName={article.openGraph.linkTitle}
                  folderName={folder.folderTitle}
                  tags={article.tags.map(({ tagName }) => tagName)}
                  selected={isSelected(article.id)}
                />
              </GatherItemTouchable>
            ))}
            {articles.length % 2 === 1 && <EmptyItem />}
          </GatherArticleView>
        </GatherArticleListView>
      )}
    </>
  )
}

export default GatherArticleList
