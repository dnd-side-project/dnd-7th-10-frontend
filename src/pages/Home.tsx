import styled from '@emotion/native'
import React from 'react'
import { useRecoilValue } from 'recoil'
import FolderList from '../components/Home/FolderList'
import HomeTop from '../components/Home/HomeTop'
import QuickLink from '../components/Home/QuickLink'
import SearchBar from '../components/Home/SearchBar'
import { quicklinkAtom } from '../recoil/global'

const HomeView = styled.View`
  padding: 0 24px;
  background: white;
  flex: 1;
`

const Home = () => {
  const quickLink = useRecoilValue(quicklinkAtom)
  return (
    <HomeView>
      <HomeTop />
      <SearchBar />
      <FolderList />
      {quickLink.folderId && quickLink.linkUrl && <QuickLink />}
    </HomeView>
  )
}

export default Home
