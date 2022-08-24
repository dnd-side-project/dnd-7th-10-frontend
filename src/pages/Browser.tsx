import React, { useEffect, useMemo, useRef, useState } from 'react'
import styled from '@emotion/native'
import WebView from 'react-native-webview'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StyleSheet,
  View,
  BackHandler
} from 'react-native'
import BrowserHeader from '../components/Common/BrowserHeader'
import {
  WebViewNavigation,
  WebViewNavigationEvent,
  WebViewProgressEvent
} from 'react-native-webview/lib/WebViewTypes'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RouterParamList } from './Router'
import SVG from '../assets/images/svg'
import { ColorPalette, Typo } from '../styles/variable'
import { flexWithAlign } from '../styles/flexbox'
import { fontWithColor } from '../styles/fonts'
import useToast, { createCheckToast, ToastOffset } from '../hooks/useToast'

const BrowserMenuView = styled.View`
  ${flexWithAlign('center', 'center', 'row')}
  height: 40px;
  bottom: 40px;
  left: 0;
  right: 0;
  position: absolute;
`

const MemoButton = styled.TouchableOpacity`
  ${flexWithAlign('center', 'center')}
  width: 60px;
  height: 40px;
  border-radius: 40px;
  background: rgba(94, 114, 148, 0.85);
  margin: 0 4px;
`

const TextButton = styled.TouchableOpacity<{ disabled?: boolean }>`
  ${flexWithAlign('center', 'center')}
  padding: 0 16px;
  height: 40px;
  border-radius: 40px;
  background: ${props =>
    props.disabled ? 'rgba(214, 225, 237, 0.85)' : 'rgba(255, 82, 22, 0.85)'};
  margin: 0 4px;
`

const TextButtonText = styled.Text`
  ${fontWithColor('White')}
  ${Typo.Button_600}
`

const Browser = ({
  route,
  navigation
}: NativeStackScreenProps<RouterParamList, 'Browser'>) => {
  const { readable } = (route || {}).params || {}

  const [url, setUrl] = useState<string>('')
  const [initUrl, setInitUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [navState, setNavState] = useState<WebViewNavigation>()
  const webView = useRef<WebView>(null)
  const [readed, setReaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const showToast = useToast()

  const backward = useMemo(() => {
    return navState?.canGoBack
  }, [navState?.canGoBack])

  const forward = useMemo(() => {
    return navState?.canGoForward
  }, [navState?.canGoForward])

  const onBackPress = () => {
    if (navState?.canGoBack) {
      webView.current?.goBack()
    }
  }

  const onForwardPress = () => {
    if (navState?.canGoForward) {
      webView.current?.goForward()
    }
  }

  const onExitPress = () => {
    navigation.goBack()
  }

  useEffect(() => {
    const backAction = () => true

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => subscription.remove()
  }, [])

  const isOriginUrl = useMemo(() => {
    return url === initUrl
  }, [url, initUrl])

  const onLoadChange = (event: WebViewProgressEvent) => {
    const roundProgress = Math.round(event.nativeEvent.progress * 100)
    setProgress(roundProgress)
  }

  const onLoadEnd = () => {
    setProgress(0)
    setLoading(false)
  }

  const onLoadStart = (event: WebViewNavigationEvent) => {
    setLoading(true)
    const newUrl = event.nativeEvent.url
    if (initUrl === '') {
      setInitUrl(newUrl)
    }
    setUrl(newUrl)
  }

  const onRefreshPress = () => {
    webView.current?.reload()
  }

  const onReadedPress = () => {
    if (!readed) {
      setReaded(true)
      showToast(
        createCheckToast('이 시간의 링크 읽기 완료!', ToastOffset.TagInput)
      )
    }
  }

  return (
    <SafeAreaView style={styles.backgroundstyle}>
      <BrowserHeader
        loading={loading}
        progress={progress}
        backward={backward}
        forward={forward}
        onBackwardPress={onBackPress}
        onForwardPress={onForwardPress}
        onRefreshPress={onRefreshPress}
        onExitPress={onExitPress}
        url={navState?.url}
      />
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
          <WebView
            ref={webView}
            onLoadProgress={onLoadChange}
            onLoadEnd={onLoadEnd}
            onLoadStart={onLoadStart}
            originWhitelist={['*']}
            onNavigationStateChange={setNavState}
            source={{ uri: 'https://www.naver.com' }}
            style={styles.webview}
          />
        </View>
        <BrowserMenuView>
          {!loading &&
            (isOriginUrl ? (
              <>
                <MemoButton>
                  <SVG.Memo stroke={ColorPalette.White} width={24} />
                </MemoButton>
                {readable && (
                  <TextButton onPress={onReadedPress} disabled={readed}>
                    <TextButtonText>읽었어요</TextButtonText>
                  </TextButton>
                )}
              </>
            ) : (
              <TextButton>
                <TextButtonText>링크 바로저장</TextButtonText>
              </TextButton>
            ))}
        </BrowserMenuView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundstyle: {
    flex: 1
  },
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    minHeight: 200
  },
  webview: {
    flex: 1
  }
})

export default Browser
