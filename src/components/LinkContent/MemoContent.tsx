import React from 'react'
import styled from '@emotion/native'
import MemoTop from './MemoTop'
import Memo from './Memo'

const MemoContentView = styled.View`
  padding: 24px;
`

const MemoContainer = styled.View`
  flex-direction: column;
  justify-content: center;
`

const MemoContent = () => {
  return (
    <MemoContentView>
      <MemoTop />
      <MemoContainer>
        <Memo content=" Read the docs to discover what to do next:e" />
        <Memo content=" Read the docs to discover what to do next:e" />
        <Memo content=" Read the docs to discover what to do next:e" />
      </MemoContainer>
    </MemoContentView>
  )
}

export default MemoContent
