import React, { useMemo } from 'react'
import styled from '@emotion/native'
import FolderCard from './FolderCard'
import { backgroundWithColor } from '../../styles/backgrounds'
import Empty from '../Common/Empty'
import { useRecoilValue } from 'recoil'
import { foldersDetailFamily } from '../../recoil/folders'

const FolderCardScrollView = styled.ScrollView`
  ${backgroundWithColor('background_1')}
  flex: 1;
`

const FolderCardView = styled.View`
  flex: 1;
  padding: 24px;
`

interface Props {
  folderId: string
}

const FolderCardList = ({ folderId }: Props) => {
  const folderDetail = useRecoilValue(foldersDetailFamily(folderId))

  const articles = useMemo(() => {
    if (folderDetail && folderDetail.articles) {
      return folderDetail.articles
    }
    return []
  }, [folderDetail])

  return (
    <>
      {articles.length > 0 ? (
        <FolderCardScrollView>
          <FolderCardView>
            {articles.map(article => (
              <FolderCard key={article.id} article={article} />
            ))}
          </FolderCardView>
        </FolderCardScrollView>
      ) : (
        <Empty button />
      )}
    </>
  )
}

export default FolderCardList
