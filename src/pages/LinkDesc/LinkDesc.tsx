/**

 *
 * @format
 */

import React, { useState } from 'react'
import styled from '@emotion/native'

import Memo from '../../components/Memo'
import TagBar from '../../components/TagBar'
import LinkContent from '../../components/LinkContent'

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faNoteSticky } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faThumbTack } from '@fortawesome/free-solid-svg-icons'

import config from '../../config'

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput
} from 'react-native'

const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding-top: 5px;
  padding-bottom: 5px;
`

const MemoBar = styled.View`
  width: ${config.deviceWidth * 0.8};
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

const MemoContainer = styled.View`
  flex-direction: column;
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

const LinkDesc = () => {
  const [click, setClick] = useState(false)

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar />

      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={styles.scrollView}
        scrollEnabled={true}
      >
        <NavBar>
          <FontAwesomeIcon icon={faArrowLeft} />
          <FontAwesomeIcon icon={faThumbTack} />
        </NavBar>

        <LinkContent />
        <TagBar />

        <MemoBar>
          <Text>메모</Text>
          <TouchableOpacity onPress={() => setClick(!click)}>
            <FontAwesomeIcon icon={faNoteSticky} size={20} />
          </TouchableOpacity>
        </MemoBar>

        {click ? (
          <View style={styles.textInputWrap}>
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
            <Memo content=" Read the docs to discover what to do next:e" />
            <Memo content=" Read the docs to discover what to do next:e" />
            <Memo content=" Read the docs to discover what to do next:e" />
          </MemoContainer>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  textInputWrap: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'lightgray',
    padding: 10
  },

  safeAreaView: {
    flex: 1,
    //flex:1로 촤면을 채울 수 있다
    padding: config.deviceWidth * 0.1
  },
  scrollView: {
    padding: config.deviceWidth * 0.1
  },

  textInput: {
    minHeight: 150,
    width: config.deviceWidth * 0.8,
    padding: 10,
    backgroundColor: 'lightgray'
  }
})

export default LinkDesc
