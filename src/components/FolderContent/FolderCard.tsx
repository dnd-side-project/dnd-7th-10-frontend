import { useNavigation } from '@react-navigation/native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ImageSourcePropType } from 'react-native'
import api from '../../lib/api'
import { IArticle } from '../../recoil/folders'
import Card from '../Common/Card'
import { RouterNavigationProps } from '../../pages/Router'

interface Props {
  article: IArticle
  refresh?: () => void
}

const FolderCard = ({ article, refresh }: Props) => {
  const navigation = useNavigation<RouterNavigationProps>()

  const [favicon, setFavicon] = useState<ImageSourcePropType | undefined>(
    undefined
  )

  const linkImage = useMemo(() => {
    if (article.openGraph.linkImage.startsWith('//')) {
      return { uri: `https:${article.openGraph.linkImage}` }
    }
    if (article.openGraph.linkImage) {
      return {
        uri: article.openGraph.linkImage
      }
    }
    return require('../../assets/images/cover.png')
  }, [article])

  const getFaviconUrl = useCallback(() => {
    const [protocol, url] = article.linkUrl.split('://')
    const [host] = (url || protocol).split('/')
    return `${protocol}://${host}/favicon.ico`
  }, [article.linkUrl])

  useEffect(() => {
    const uri = getFaviconUrl()
    fetch(uri)
      .then(({ status }) => {
        if (status === 200) {
          setFavicon({
            uri: uri
          })
        }
      })
      .catch(() => {
        //favicon not exists
      })
  }, [getFaviconUrl])

  const tags = useMemo(() => {
    return article.tags.map(({ tagName }) => tagName)
  }, [article])

  const onBookmarkPress = () => {
    api.patch(`/article/mark/${article.id}`).then(() => {
      if (refresh) {
        refresh()
      }
    })
  }

  const onInstantPress = () => {
    navigation.navigate('Browser', {
      url: article.linkUrl,
      articleId: article.id
    })
  }

  return (
    <Card
      title={article.openGraph.linkTitle || '제목 없음'}
      description={article.openGraph.linkDescription}
      favicon={favicon}
      source={linkImage}
      tags={tags}
      bookmark
      bookmarked={article.bookmark}
      memo={article.memos && article.memos.length > 0}
      onBookmarkPress={onBookmarkPress}
      instant
      onInstantPress={onInstantPress}
    />
  )
}

export default FolderCard
