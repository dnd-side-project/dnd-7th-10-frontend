/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TextInput,
  useColorScheme,
  View
} from 'react-native'
import WebView from 'react-native-webview'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const App = () => {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.view}>
          <WebView
            originWhitelist={['*']}
            source={{ uri: 'https://naver.com' }}
            style={styles.webview}
          />
        </View>
        <TextInput style={styles.textInput} multiline editable />
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  view: {
    flex: 1,
    minHeight: 300
  },
  webview: {
    flex: 1
  },
  textInput: {
    minHeight: 100
  }
})

export default App
