import styled from '@emotion/native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { RecoilRoot } from 'recoil'
import Router from './src/pages/Router'

const SafeArea = styled.SafeAreaView`
  background: white;
  flex: 1;
`

const App = () => {
  return (
    <SafeArea>
      <RecoilRoot>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
      </RecoilRoot>
    </SafeArea>
  )
}

export default App
