import React from 'react'
import styled from '@emotion/native'
import LinkCard from './LinkCard'
import { ILink } from './LinkCard'
import { Typo, ColorPalette } from '../../styles/variable'
import Empty from '../Common/Empty'
import { TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'

const RemindingListView = styled.View`
  width: 414px;
  height: 376px;
  flex: none;
  flex-grow: 0
  padding:24px;
  background-color: #ffffff;
  margin-bottom: 4px;
`
const TopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`
const TopText = styled.Text`
  color: ${ColorPalette.BlueGray_3};
  font-family: ${Typo.Heading1_600};
`
const BoldText = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Heading1_600};
`

const RightArrow = styled.TouchableOpacity``
const RightArrowImage = styled.Image`
  width: 24px;
  height: 24px;
`

interface LinkList extends Array<ILink> {}
interface Props {
  list: LinkList
  onPress: () => void
}

const CardView = styled.ScrollView`
  flex-direction: row;
  height: 250px;
`

const RemindingList = ({ onPress, list }: Props) => {
  const navigation = useNavigation()
  return (
    <RemindingListView>
      <TopView>
        <TopText>
          꼭 읽어야하는 링크{'\n'}
          <BoldText>{list.length}개</BoldText>가 있어요!
        </TopText>
        <RightArrow onPress={onPress}>
          <RightArrowImage
            source={require('../../assets/images/icon_more.png')}
          />
        </RightArrow>
      </TopView>
      {list.length !== 0 ? (
        <CardView horizontal={true}>
          {list.map((link, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() =>
                navigation.navigate('LinkContents', { articleId: link.id })
              }
            >
              <LinkCard link={link} key={idx} />
            </TouchableOpacity>
          ))}
        </CardView>
      ) : (
        <Empty
          text={`북마크한 링크들이 없어요!${'\n'}리마인딩할 링크들을 모아볼까요?`}
          button
          buttonText="바로가기"
          background="white"
          onButtonPress={onPress}
        />
      )}
    </RemindingListView>
  )
}

export default RemindingList
