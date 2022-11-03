import React, { useCallback, useMemo, useRef, useState } from 'react'
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
import useToast, {
  createCheckToast,
  createWarnToast,
  ToastOffset
} from '../hooks/useToast'
import MemoEditor from '../components/Browser/MemoEditor'
import api from '../lib/api'
import { useFocusEffect } from '@react-navigation/native'

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
  const { url: linkUrl, articleId, readable } = (route || {}).params || {}

  const [url, setUrl] = useState<string>(linkUrl || '')
  const [initUrl, setInitUrl] = useState<string>('')
  const [progress, setProgress] = useState<number>(0)
  const [navState, setNavState] = useState<WebViewNavigation>()
  const webView = useRef<WebView>(null)
  const [readed, setReaded] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)
  const [writing, setWriting] = useState<boolean>(false)
  const [memo, setMemo] = useState<string>('')

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
      return true
    }
    return false
  }

  const onForwardPress = () => {
    if (navState?.canGoForward) {
      webView.current?.goForward()
    }
  }

  const onExitPress = () => {
    navigation.goBack()
  }

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        if (backward) {
          onBackPress()
        } else {
          onExitPress()
        }
        return true
      }

      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction
      )
      return () => subscription.remove()
    }, [backward])
  )

  const onLoadChange = (event: WebViewProgressEvent) => {
    const roundProgress = Math.round(event.nativeEvent.progress * 100)
    setProgress(roundProgress)
  }

  const onLoadEnd = () => {
    setProgress(0)
    setLoading(false)
  }

  const onLoadStart = (event: WebViewNavigationEvent) => {
    const newUrl = event.nativeEvent.url
    if (initUrl === '') {
      setInitUrl(newUrl)
    }
    setLoading(true)
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

  const onCancelPress = () => {
    setWriting(false)
    // reset memo
  }

  const onSavePress = () => {
    const content = memo
    setMemo('')
    api
      .post('/memo', { articleId, content })
      .then(response => {
        if (response.status === 200) {
          showToast(
            createCheckToast('메모가 저장되었습니다.', ToastOffset.TagInput)
          )
          setWriting(false)
        } else {
          showToast(
            createWarnToast('메모 저장에 실패하였습니다.', ToastOffset.TagInput)
          )
        }
      })
      .catch(e => {
        console.error(JSON.stringify(e.response.data, null, 2))
        showToast(
          createWarnToast('메모 저장에 실패하였습니다.', ToastOffset.TagInput)
        )
      })
  }

  const onLinkAddPress = () => {
    navigation.navigate('LinkAdd', { linkUrl: url })
  }

  const onEnterPress = (newUrl: string) => {
    setUrl(newUrl)
  }

  const onNavChange = (event: WebViewNavigation) => {
    setUrl(event.url)
    setNavState(event)
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
        onEnterPress={onEnterPress}
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
            onNavigationStateChange={onNavChange}
            source={{ uri: url }}
            setSupportMultipleWindows={false}
            style={styles.webview}
          />
        </View>
        {writing ? (
          <MemoEditor
            onCancelPress={onCancelPress}
            onSavePress={onSavePress}
            memo={memo}
            setMemo={setMemo}
          />
        ) : (
          <BrowserMenuView>
            {!loading &&
              (initUrl === url ? (
                <>
                  <MemoButton onPress={() => setWriting(true)}>
                    <SVG.Memo stroke={ColorPalette.White} width={24} />
                  </MemoButton>
                  {readable && (
                    <TextButton onPress={onReadedPress} disabled={readed}>
                      <TextButtonText>읽었어요</TextButtonText>
                    </TextButton>
                  )}
                </>
              ) : (
                <TextButton onPress={onLinkAddPress}>
                  <TextButtonText>링크 바로저장</TextButtonText>
                </TextButton>
              ))}
          </BrowserMenuView>
        )}
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
