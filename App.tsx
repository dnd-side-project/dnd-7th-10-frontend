import styled from '@emotion/native'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import Router from './src/pages/Router'
import messaging from '@react-native-firebase/messaging'
import { Alert, AppRegistry } from 'react-native'
import ToastContainer from './src/components/Common/ToastContainer'

const SafeArea = styled.SafeAreaView`
  background: white;
  flex: 1;
`

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in background', remoteMessage)
})

const App = () => {
  useEffect(() => {
    const messagingInstance = messaging()
    const unsubscribe = messagingInstance.onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
      console.warn('warn')
      console.log(remoteMessage)
    })

    return unsubscribe
  }, [])

  return (
    <SafeArea>
      <RecoilRoot>
        <NavigationContainer>
          <Router />
        </NavigationContainer>
        <ToastContainer />
      </RecoilRoot>
    </SafeArea>
  )
}

AppRegistry.registerComponent('app', () => App)

export default App
