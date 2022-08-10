import styled from '@emotion/native'
import React from 'react'
import FolderList from '../components/FolderList'
import HomeTop from '../components/HomeTop'
import SearchBar from '../components/SearchBar'

const HomeView = styled.View`
  padding: 0 24px;
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
