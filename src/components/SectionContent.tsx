import React, { PropsWithChildren } from 'react'
import styled from '@emotion/native'

const SectionContentView = styled.View`
  margin-bottom: 16px;
`

const SectionContent = ({ children }: PropsWithChildren) => {
  return <SectionContentView>{children}</SectionContentView>
}

export default SectionContent
