import React, { Component } from 'react'
import styled from 'styled-components'

import Hero from '../layouts/Hero'
import NowShowing from '../layouts/NowShowing'
import Upcoming from '../layouts/UpComming'
import SubcribeMoviegoers from '../layouts/SubcribeMovieGowers'
import Footer from '../component/Footer'

class Home extends Component {
  render () {
    return (
      <ContainerPage showsVerticalScrollIndicator={false}>
        <Hero />
        <NowShowing />
        <Upcoming />
        <SubcribeMoviegoers />
        <Footer withPadding />
      </ContainerPage>
    )
  }
}

const ContainerPage = styled.ScrollView`
  background-color: #fff
`
export default Home
