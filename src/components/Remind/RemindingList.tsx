import React from 'react'
import styled from '@emotion/native'
import LinkCard from './LinkCard'
import { ILink } from './LinkCard'
import { Typo, ColorPalette } from '../../styles/variable'

const RemindingListView = styled.View`
  width: 414px;
  height: 376px;
  flex: none;
  order: 0;
  flex-grow: 0
  padding:24px;
  background-color: #ffffff;
  margin-bottom: 4px;
`
const TopView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
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

const LinkBtn = styled.TouchableOpacity`
  position: absolute;
  width: 120px;
  height: 40px;
  left: 147px;
  top: 228px;
  border-radius: 4px;
  background-color: #26344a;
  padding: 11px 31px;
`

const BlankText = styled.Text`
position: absolute;
width: 226px;
height: 44px;
left: 94px;
top: 160px;
text-align: center;
letter-spacing: -0.6px;
color: ${ColorPalette.BlueGray_4}
font-family: ${Typo.Body1_600}
font-weight: 400;
font-size: 18px;
line-height: 22px;
`
const BtnText = styled.Text`
  color : #FFFFFF;
  font-family: ${Typo.Body3_600}
  font-style: normal;
  font-size: 15px;
  line-height: 18px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: -0.6px;
`
interface LinkList extends Array<ILink> {}
interface Props {
  list: LinkList
}

const CardView = styled.View`
  flex-direction: row;
`

const RemindingList = ({ list }: Props) => {
  return (
    <RemindingListView>
      <TopView>
        <TopText>
          꼭 읽어야하는 링크{'\n'}
          <BoldText>{list.length}개</BoldText>가 있어요!
        </TopText>
        <RightArrow>
          <RightArrowImage
            source={require('../../assets/images/icon_more.png')}
          />
        </RightArrow>
      </TopView>
      {list.length !== 0 ? (
        <CardView>
          {list.map((link, idx) => (
            <LinkCard link={link} key={idx} />
          ))}
        </CardView>
      ) : (
        <>
          <BlankText>
            북마크한 링크들이 없어요!{'\n'}
            리마인딩할 링크들을 모아볼까요?
          </BlankText>
          <LinkBtn>
            <BtnText>바로가기</BtnText>
          </LinkBtn>
        </>
      )}
    </RemindingListView>
  )
}

export default RemindingList
