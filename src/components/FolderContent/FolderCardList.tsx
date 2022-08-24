import React, { useMemo } from 'react'
import styled from '@emotion/native'
import FolderCard from './FolderCard'
import { backgroundWithColor } from '../../styles/backgrounds'
import Empty from '../Common/Empty'
import { useRecoilValue } from 'recoil'
import { foldersDetailFamily } from '../../recoil/folders'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'

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

interface Props {
  folderId: string
}

const FolderCardList = ({ folderId }: Props) => {
  const folderDetail = useRecoilValue(foldersDetailFamily(folderId))
  const navigation = useNavigation<RouterNavigationProps>()

  const articles = useMemo(() => {
    if (folderDetail && folderDetail.articles) {
      return folderDetail.articles
    }
    return []
  }, [folderDetail])

  const onButtonPress = () => {
    navigation.navigate('LinkAdd', { folderId })
  }

  return (
    <>
      {articles.length > 0 ? (
        <FolderCardScrollView>
          <FolderCardView>
            {articles.map(article => (
              <FolderCardTouchable key={article.id} activeOpacity={0.9}>
                <FolderCard article={article} />
              </FolderCardTouchable>
            ))}
          </FolderCardView>
        </FolderCardScrollView>
      ) : (
        <Empty icon button onButtonPress={onButtonPress} />
      )}
    </>
  )
}

export default FolderCardList
