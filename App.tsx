import styled from '@emotion/native'
import { NavigationContainer } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import Router from './src/pages/Router'
import messaging from '@react-native-firebase/messaging'
import { Alert, AppRegistry } from 'react-native'
import ToastContainer from './src/components/Common/ToastContainer'
import Browser from './src/pages/Browser'
import { fcmTokenAtom } from './src/recoil/global'

const SafeArea = styled.SafeAreaView`
  background: white;
  flex: 1;
`

messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('Message handled in background', remoteMessage)
})

const App = () => {
  const setToken = useSetRecoilState(fcmTokenAtom)
  useEffect(() => {
    const messagingInstance = messaging()
    messagingInstance
      .getToken()
      .then(token => {
        setToken(token)
        console.log('token, ' + token)
      })
      .catch(e => {
        console.error(e)
      })
    const unsubscribe = messagingInstance.onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage))
      console.warn('warn')
      console.log(remoteMessage)
    })

    return unsubscribe
  }, [])

  return (
    <SafeArea>
      <NavigationContainer>
        {true ? <Browser /> : <Router />}
      </NavigationContainer>
      <ToastContainer />
    </SafeArea>
  )
}

const RecoilApp = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
)

AppRegistry.registerComponent('app', () => RecoilApp)

export default RecoilApp
