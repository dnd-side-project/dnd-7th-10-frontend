/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import styled from '@emotion/native'
import React from 'react'

import Home from './src/pages/Home'

const SafeArea = styled.SafeAreaView`
  background: white;
  flex: 1;
`

const ScrollArea = styled.ScrollView`
  background: white;
`

const App = () => {
  return (
    <SafeArea>
      <ScrollArea contentInsetAdjustmentBehavior="automatic">
        <Home />
      </ScrollArea>
    </SafeArea>
  )
}

export default App
