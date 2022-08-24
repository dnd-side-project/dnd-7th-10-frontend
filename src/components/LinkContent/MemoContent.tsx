import React from 'react'
import styled from '@emotion/native'
import MemoTop from './MemoTop'
import Memo from './Memo'
import { backgroundWithColor } from '../../styles/backgrounds'
import { IMemo } from '../../recoil/folders'

const MemoContentView = styled.View`
  ${backgroundWithColor('White')}
  padding: 24px;
`

const MemoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
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
        <></>
      )}
    </MemoContentView>
  )
}

export default MemoContent
