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
      return `https:${article.openGraph.linkImage}`
    }
    return article.openGraph.linkImage || 'https://via.placeholder.com/1200x630'
  }, [article])

  const getFaviconUrl = useCallback(() => {
    const [protocol, url] = article.linkUrl.split('://')
    const [host] = url.split('/')
    return `${protocol}://${host}/favicon.ico`
  }, [article.linkUrl])

  useEffect(() => {
    const uri = getFaviconUrl()
    fetch(uri).then(({ status }) => {
      if (status === 200) {
        setFavicon({
          uri: uri
        })
      }
    })
  }, [getFaviconUrl])

  const tags = useMemo(() => {
    console.log(article.bookmark)
    return article.tags.map(({ tagName }) => tagName)
  }, [article])

  const onBookmarkPress = () => {
    api.patch(`/article/mark/${article.id}`).then(response => {
      console.log(response.status)
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
      title={article.openGraph.linkTitle}
      description={article.openGraph.linkDescription}
      favicon={favicon}
      source={{
        uri: linkImage
      }}
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
