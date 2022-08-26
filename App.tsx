import styled from '@emotion/native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import React, { useEffect } from 'react'
import { RecoilRoot, useSetRecoilState } from 'recoil'
import Router, { INoticeData, RouterNavigationProps } from './src/pages/Router'
import messaging from '@react-native-firebase/messaging'
import { AppRegistry } from 'react-native'
import ToastContainer from './src/components/Common/ToastContainer'
import { fcmTokenAtom, noticeAtom } from './src/recoil/global'

const SafeArea = styled.SafeAreaView`
  background: white;
  flex: 1;
`

messaging().setBackgroundMessageHandler(async remoteMessage => {
  // console.log('Message handled in background', remoteMessage)
  console.log(JSON.stringify(remoteMessage, null, 2))
})

const App = () => {
  const navigation = useNavigation<RouterNavigationProps>()

  const setNotice = useSetRecoilState(noticeAtom)
  const setToken = useSetRecoilState(fcmTokenAtom)
  useEffect(() => {
    const messagingInstance = messaging()
    messagingInstance
      .getToken()
      .then(token => {
        setToken(token)
      })
      .catch(e => {
        console.error(e)
      })
    messagingInstance.onNotificationOpenedApp(remoteMessage => {
      const noticeData: INoticeData = {
        articleId: '',
        remindId: '',
        ...(remoteMessage.data as Partial<INoticeData>)
      }
      setNotice(noticeData)
    })
    messagingInstance.getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        const noticeData: INoticeData = {
          articleId: '',
          remindId: '',
          ...(remoteMessage.data as Partial<INoticeData>)
        }
        setNotice(noticeData)
      }
    })
    const unsubscribe = messagingInstance.onMessage(async remoteMessage => {
      const noticeData: INoticeData = {
        articleId: '',
        remindId: '',
        ...(remoteMessage.data as Partial<INoticeData>)
      }
      navigation.navigate('RemindingNotice', noticeData)
    })

    return unsubscribe
  }, [])

  return <Router />
}

const RecoilApp = () => (
  <RecoilRoot>
    <SafeArea>
      <NavigationContainer>
        <App />
      </NavigationContainer>
      <ToastContainer />
    </SafeArea>
  </RecoilRoot>
)

AppRegistry.registerComponent('app', () => RecoilApp)

export default RecoilApp
