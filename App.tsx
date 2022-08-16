import styled from '@emotion/native'
import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import { ToastProvider } from 'react-native-toast-notifications'
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
        <ToastProvider>
          <NavigationContainer>
            <Router />
          </NavigationContainer>
        </ToastProvider>
      </RecoilRoot>
    </SafeArea>
  )
}

export default App
