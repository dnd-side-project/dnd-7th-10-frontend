import React from 'react'
import { TouchableOpacity } from 'react-native'
import styled from '@emotion/native'
import MemoTop from './MemoTop'
import Memo from './Memo'
import { backgroundWithColor } from '../../styles/backgrounds'
import { foldersAtom, IArticle, IMemo } from '../../recoil/folders'
import Empty from '../Common/Empty'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'
import { useRecoilValue } from 'recoil'

const MemoContentView = styled.View`
  ${backgroundWithColor('White')}
  padding: 24px;
`

const MemoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`

const MemoEmpty = styled.View`
  padding: 24px 0 32px;
`

interface Props {
  memos?: IMemo[]
  article: IArticle
}

const MemoContent = ({ memos, article }: Props) => {
  const navigation = useNavigation<RouterNavigationProps>()
  const folders = useRecoilValue(foldersAtom)

  return (
    <MemoContentView>
      <MemoTop article={article} />
      {memos && memos.length > 0 ? (
        <MemoContainer>
          {memos.map(memo => (
            <TouchableOpacity
              key={memo.id}
              onPress={() => {
                const folderTitle = folders.find(
                  ({ folderId }) => folderId === article.folderId
                )?.folderTitle
                const newMemo = {
                  ...memo,
                  openGraph: {
                    ...article.openGraph
                  },
                  articleId: article.id,
                  folderTitle
                }

                navigation.navigate('MemoPage', {
                  memo: newMemo
                })
              }}
            >
              <Memo memo={memo} />
            </TouchableOpacity>
          ))}
        </MemoContainer>
      ) : (
        <MemoEmpty>
          <Empty
            icon
            source={require('../../assets/images/memo.png')}
            background={'White'}
            button
            onButtonPress={() =>
              navigation.navigate('AddMemoPage', { article })
            }
            buttonText="메모 작성하기"
            text={'링크를 읽고 기억하고 싶은 내용을\n메모를 통해 기록해보세요.'}
          />
        </MemoEmpty>
      )}
    </MemoContentView>
  )
}

export default MemoContent
