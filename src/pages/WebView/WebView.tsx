/**

 *
 * @format
 */

import React, { useState } from 'react'
import styled from '@emotion/native'
import WebView from 'react-native-webview'
import config from '../../config'
import {
  KeyboardAvoidingView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  View
} from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'

const uri = 'https://naver.com'

const MemoContainer = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  padding: 10px;
`

const Memo = styled.TouchableOpacity`
  width: 60px;
  padding: 5px;
  background-color: gray;
  border-radius: 10px;
`

const MemoBtn = styled.TouchableOpacity`
  min-width: 300px;
  height: 50px;
  background-color: gray;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const WebViewPage = () => {
  const [click, setClick] = useState(false)

  return (
    <SafeAreaView style={styles.backgroundstyle}>
      <StatusBar />
      <KeyboardAvoidingView style={styles.container}>
        <View style={styles.view}>
          <WebView
            originWhitelist={['*']}
            source={{ uri: uri }}
            style={styles.webview}
          />
        </View>

        {click ? (
          <View style={{ flexDirection: 'column', alignItems: 'center' }}>
            <TextInput
              style={styles.textInput}
              multiline
              editable
              placeholder="메모를 입력해 주세요."
              onChangeText={e => setText(e)}
            />
            <MemoBtn onPress={() => setClick(!click)}>
              <Text
                style={{ color: 'white', fontSize: 15, fontWeight: 'bold' }}
              >
                메모 추가하기
              </Text>
            </MemoBtn>
          </View>
        ) : (
          <MemoContainer>
            <Memo onPress={() => setClick(!click)}>
              <FontAwesomeIcon icon={faNoteSticky} size={50} color={'white'} />
            </Memo>
          </MemoContainer>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  backgroundstyle: {
    flex: 1,
    padding: config.deviceWidth * 0.1
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
  },
  textInput: {
    minHeight: 200,
    width: config.deviceWidth,
    padding: 10
  }
})

export default WebViewPage
