import React from 'react'
import styled from '@emotion/native'
import MemoTop from './MemoTop'
import Memo from './Memo'
import { backgroundWithColor } from '../../styles/backgrounds'
import { IArticle, IMemo } from '../../recoil/folders'
import Empty from '../Common/Empty'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'

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
  return (
    <MemoContentView>
      <MemoTop article={article} />
      {memos && memos.length > 0 ? (
        <MemoContainer>
          {memos.map(memo => (
            <Memo key={memo.id} memo={memo} />
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
            text="콘텐츠가 아무것도 없을 때의 경우
메시지는 2줄을 작성해 주세요."
          />
        </MemoEmpty>
      )}
    </MemoContentView>
  )
}

export default MemoContent
