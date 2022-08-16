import styled from '@emotion/native'
import React from 'react'
import FolderList from '../components/Home/FolderList'
import HomeTop from '../components/Home/HomeTop'
import SearchBar from '../components/Home/SearchBar'

const HomeView = styled.View`
  padding: 0 24px;
  background: white;
  flex: 1;
`

const Home = () => {
  return (
    <HomeView>
      <HomeTop />
      <SearchBar />
      <FolderList />
    </HomeView>
  )
}

export default Home
