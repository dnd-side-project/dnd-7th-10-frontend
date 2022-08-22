import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { ScrollView } from 'react-native'
import { IIconButton } from '../components/Common/Header'
import { ColorPalette, Typo } from '../styles/variable'
import SVG from '../assets/images/svg'

const MemoMainView = styled.View`
  background-color: #f5f5f5;
`

const MemoCardsView = styled.View`
  display: flex;
  align-items: flex-start;
  padding-top: 24px;

  width: 414px;

  background: #ffffff;

  flex: none;
  order: 0;
  flex-grow: 0;
`

const MemoContent = styled.Text`
  color: ${ColorPalette.BlueGray_5};
  font-family: ${Typo.Body2_600};
  font-size: 16px;
  line-height: 24px;
  letter-spacing: -0.6px;
`

const MemoCardView = styled.View`
  box-sizing: border-box;
  padding: 16px;
  margin-left: 12px;
  width: 366px;
  height: 320px;
  background-color: ${ColorPalette.Background_1};
  border: 1px solid #d6e1ed;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
`
const UrlView = styled.View`
  height: 98px;
  width: 414px;
  border-radius: 0px;
  background: #ffffff;
  margin-top: 4px;
`

const UrlImg = styled.Image`
  position: absolute;
  left: 5.8%;
  right: 78.26%;
  top: 16.33%;
  bottom: 16.33%;

  border: 1px solid ${ColorPalette.BlueGray_2}
  border-radius: 38px;
`
const UrlFolder = styled.Text`
  position: absolute;
  left: 25.6%;
  right: 67.15%;
  top: 16.33%;
  bottom: 65.31%;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;

  color: ${ColorPalette.BlueGray_4};
`

const UrlTitleComponent = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;

  position: absolute;
  width: 236px;
  height: 27px;
  left: 106px;
  top: 34px;
`
const UrlTitle = styled.Text`
  width: 65px;
  height: 27px;
  font-family: ${Typo.Heading3_600}
  font-size: 18px;
  line-height: 27px;

  display: flex;
  align-items: flex-end;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_4}
`
const UrlDate = styled.Text`
  position: absolute;
  left: 25.6%;
  right: 61.59%;
  top: 70.41%;
  bottom: 11.22%;

  font-family: ${Typo.Detail2_400}
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.6px;
  color: ${ColorPalette.BlueGray_3}
`

const iconButtons: IIconButton[] = [
  {
    name: 'trash',
    source: require('../assets/images/trash.png')
  },
  {
    name: 'edit',
    source: require('../assets/images/icon_edit.png')
  }
]

// interface MemoList extends Array<IMemo> {}
const memo1 = {
  id: '62c8f540-5dea-484b-969e-2ec47f7271be',
  content: 'string',
  registerDate: '2022-08-21T17:15:00.506413',
  modifiedDate: '2022-08-21T17:15:00.506413',
  openGraph: {
    linkTitle: 'Google',
    linkDescription: '',
    linkImage: ''
  },
  folderTitle: '기본 폴더'
}

const MemoPage = () => {
  // const [memos, setMemos] = useState<MemoList>()

  // const getMemos = () => {
  //   api
  //     .get<MemoList>('/memos')
  //     .then(response => {
  //       if (response.status === 200) {
  //         console.log(response.data)
  //         let resArr = Array.from(response.data)
  //         // setMemos(resArr)
  //       }
  //     })
  //     .catch(error => {
  //       console.error(error)
  //     })
  // }

  // useEffect(() => {
  //   if (route.name === 'MemoMain') {
  //     // getMemos()
  //   }
  // }, [route.name])

  return (
    <MemoMainView>
      <ScrollView scrollEnabled={true}>
        <Header iconButtons={iconButtons}>메모</Header>
        <MemoCardsView>
          <MemoCardView>
            <MemoContent>{memo1.content}</MemoContent>
          </MemoCardView>
          <UrlView>
            <UrlImg
              source={{
                uri: 'https://via.placeholder.com/16x16'
              }}
            />
            <UrlFolder>폴더명</UrlFolder>
            <UrlTitleComponent>
              <UrlTitle>링크제목</UrlTitle>
              <SVG.ChevronLeft />
            </UrlTitleComponent>
            <UrlDate>2022.07.01</UrlDate>
          </UrlView>
        </MemoCardsView>
      </ScrollView>
    </MemoMainView>
  )
}

export default MemoPage
