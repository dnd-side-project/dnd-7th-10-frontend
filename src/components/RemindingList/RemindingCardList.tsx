import React, { useState } from 'react'
import styled from '@emotion/native'
import { backgroundWithColor } from '../../styles/backgrounds'
import Empty from '../Common/Empty'
import { IArticle } from '../../recoil/folders'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'
import FolderCard from '../FolderContent/FolderCard'
import api from '../../lib/api'
import RemindFolderList from '../Remind/RemindFolderList'

const FolderCardScrollView = styled.ScrollView`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const FolderCardView = styled.View`
  flex: 1;
  padding: 24px;
`

const FolderCardTouchable = styled.TouchableOpacity`
  margin-bottom: 16px;
`

const RemindingCardList = () => {
  const [articles, setArticles] = useState<IArticle[]>([])
  const navigation = useNavigation<RouterNavigationProps>()

  useFocusEffect(() => {
    api.get('/articles/mark').then(response => {
      if (response.status === 200) {
        setArticles(response.data)
      }
    })
  })

  const onCardPress = (articleId: string) => {
    navigation.navigate('LinkContents', { articleId })
  }

  return (
    <>
      {articles.length > 0 ? (
        <FolderCardScrollView>
          <FolderCardView>
            {articles.map(article => (
              <FolderCardTouchable
                key={article.id}
                activeOpacity={0.9}
                onPress={() => onCardPress(article.id)}
              >
                <FolderCard article={article} />
              </FolderCardTouchable>
            ))}
          </FolderCardView>
        </FolderCardScrollView>
      ) : (
        <>
          <Empty
            icon
            text={'북마크한 링크들이 없어요!\n리마인딩할 링크들을 모아볼까요?'}
          />
          <RemindFolderList />
        </>
      )}
    </>
  )
}

export default RemindingCardList
