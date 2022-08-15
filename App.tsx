import styled from '@emotion/native'
import React from 'react'
import FolderAdd from './src/pages/FolderAdd'

const SafeArea = styled.SafeAreaView`
  flex: 1;
`

const App = () => {
  return (
    <SafeArea>
      <FolderAdd />
    </SafeArea>
  )
}

export default App
