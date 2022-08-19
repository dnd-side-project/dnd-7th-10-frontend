import React from 'react'
import styled from '@emotion/native'
import Header from '../components/Common/Header'
import { IIconButton } from '../components/Common/Header'
import RemindingList from '../components/Remind/RemindingList'
// import Notice from '../components/Remind/Notice'
// import MemoCollection from '../components/Remind/MemoCollection'
// import { article as list } from '../assets/data/article'
import { ILink } from '../components/Remind/LinkCard'
const RemindingView = styled.View``

const iconButtons: IIconButton[] = [
  {
    name: 'alarm',
    source: require('../assets/images/bell.png'),
    onPress: () => console.log('bell')
  }
]

const list: ILink[] = [
  {
    id: '3e8cafdd-8d09-4093-9db0-55d10693d1d6',
    remindId: null,
    linkUrl: 'www.daum.net',
    openGraph: {
      linkTitle: 'Daum',
      linkDescription: '나의 관심 콘텐츠를 가장 즐겁게 볼 수 있는 Daum',
      linkImage:
        'https://i1.daumcdn.net/svc/image/U03/common_icon/5587C4E4012FCD0001'
    },
    memos: [
      {
        registerDate: '2022-08-18T15:44:58.814622',
        modifiedDate: '2022-08-18T15:44:58.814622',
        id: '9286012c-acec-44c2-bd32-9627e9679ec2',
        content: 'dummyMemo5'
      },
      {
        registerDate: '2022-08-18T15:44:50.902259',
        modifiedDate: '2022-08-18T15:44:50.902259',
        id: 'ec657ff5-9fef-4658-8e34-bbea001ff259',
        content: 'dummyMemo'
      },
      {
        registerDate: '2022-08-18T15:44:57.583064',
        modifiedDate: '2022-08-18T15:44:57.583064',
        id: 'fdeb5884-e60b-4629-8673-55bdb7fbd964',
        content: 'dummyMemo3'
      },
      {
        registerDate: '2022-08-18T15:44:58.168391',
        modifiedDate: '2022-08-18T15:44:58.168391',
        id: '533e25aa-0496-4824-97a8-f02205e9cb7c',
        content: 'dummyMemo4'
      },
      {
        registerDate: '2022-08-18T15:44:56.793462',
        modifiedDate: '2022-08-18T15:44:56.793462',
        id: 'f3185821-afc0-4e20-8f7f-92030a4c82bb',
        content: 'dummyMemo2'
      }
    ],
    tags: [
      {
        tagId: '8101cc15-41a4-4ce9-a480-db3fc32a4b3d',
        tagName: 'dummyTag1'
      },
      {
        tagId: 'e2cdeab6-5332-4fd1-8031-23f37b52acba',
        tagName: 'dummyTag2'
      },
      {
        tagId: '076bdc5a-d9a2-48ed-b9a2-5f4d5b81540d',
        tagName: 'dummyTag3'
      }
    ],
    registerDate: '2022-08-18T09:31:44.27536',
    modifiedDate: '2022-08-18T09:31:44.27536',
    bookmark: false
  }
]

const RemindMain = () => {
  return (
    <RemindingView>
      <Header iconButtons={iconButtons}>리마인딩</Header>
      <RemindingList list={list} />
      {/* <Notice />
      <MemoCollection /> */}
    </RemindingView>
  )
}

export default RemindMain
