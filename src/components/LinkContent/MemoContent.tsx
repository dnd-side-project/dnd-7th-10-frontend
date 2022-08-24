import React from 'react'
import styled from '@emotion/native'
import MemoTop from './MemoTop'
import Memo from './Memo'
import { backgroundWithColor } from '../../styles/backgrounds'
import { IMemo } from '../../recoil/folders'
import Empty from '../Common/Empty'

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
}

const MemoContent = ({ memos }: Props) => {
  return (
    <MemoContentView>
      <MemoTop />
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
          />
        </MemoEmpty>
      )}
    </MemoContentView>
  )
}

export default MemoContent
