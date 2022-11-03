import React from 'react'
import styled from '@emotion/native'
import MemoCard from './MemoCard'
import { ColorPalette, Typo } from '../../styles/variable'
import { useNavigation } from '@react-navigation/native'
import { RouterNavigationProps } from '../../pages/Router'
import Empty from '../Common/Empty'
import { IMemo } from '../../recoil/folders'

const MemoCollectionView = styled.View`
  background-color: #ffffff;
  height: 450px;
  flex: none;
  flex-grow: 0;
  align-items: center;
  justify-content: center;
`
const TopText = styled.Text`
  position: absolute;
  left: 24px;
  top: 22px;
  width: 113px;
  height: 27px;
  font-family: ${Typo.Heading3_600};
  font-size: 18px;
  line-height: 27px;
  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4};
`

const MemoCardsView = styled.ScrollView`
  height: 400px;
  padding: 10px 0px;
`
const MemoCardBtn = styled.TouchableOpacity`
  height: 330px;
`
const MemoView = styled.View`
  position: absolute;
  width: 632px;
  height: 300px;
  left: 24px;
  top: 72px;

  display: flex;
  flex-direction: row;
  align-items: flex-start;
`

const MemoBtn = styled.TouchableOpacity`
  position: absolute;
  width: 24px;
  height: 24px;
  right: 24px;
  top: 24px;
`

const RightArrow = styled.Image`
  width: 24px;
  height: 24px;
`

interface MemoList extends Array<IMemo> {}

interface Props {
  onPress: () => void
  memos: MemoList
}

const MemoCollection = ({ onPress, memos }: Props) => {
  const navigation = useNavigation<RouterNavigationProps>()
  const onCardPress = (memo: IMemo) => {
    navigation.navigate('MemoPage', { memo })
  }

  return (
    <MemoCollectionView>
      <TopText>메모 모음</TopText>
      <MemoBtn onPress={onPress}>
        <RightArrow source={require('../../assets/images/icon_more.png')} />
      </MemoBtn>
      {memos.length === 0 ? (
        <Empty
          text={`아직 작성된 메모가 없어요!${'\n'}링크를 읽고 간단히 정리해 볼까요?`}
          button
          buttonText="바로가기"
          background="White"
          onButtonPress={() => navigation.navigate('Home')}
        />
      ) : (
        <MemoView>
          <MemoCardsView horizontal={true}>
            {memos.map((memo, idx) => (
              <MemoCardBtn onPress={() => onCardPress(memo)} key={idx}>
                <MemoCard memo={memo} key={idx} main={false} />
              </MemoCardBtn>
            ))}
          </MemoCardsView>
        </MemoView>
      )}
    </MemoCollectionView>
  )
}

export default MemoCollection
