import React from 'react'
import styled from '@emotion/native'
import LinkCard from './LinkCard'
import { ILink } from './LinkCard'
import { Typo, ColorPalette } from '../../styles/variable'

const RemindingListView = styled.View`
  padding: 28px 24px 26px 24px;
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
      <CardView>
        {list.map((link, idx) => (
          <LinkCard link={link} key={idx} />
        ))}
      </CardView>
    </RemindingListView>
  )
}

export default RemindingList
