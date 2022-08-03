import styled from '@emotion/native'
import React from 'react'
import FolderList from '../components/FolderList'
import Search from '../components/Search'
import Top from '../components/Top'

const HomeContainer = styled.View`
  padding: 0 30px;
  background-color: white;
`

const Home = () => {
  return (
    <HomeContainer>
      <Top />
      <Search />
      <FolderList />
    </HomeContainer>
  )
}

export default Home
