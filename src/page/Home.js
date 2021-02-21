import React, { Component } from 'react'
import styled from 'styled-components'

import Hero from '../layouts/Hero'
import NowShowing from '../layouts/NowShowing'
import Upcoming from '../layouts/UpComming'
import SubcribeMoviegoers from '../layouts/SubcribeMovieGowers'
import Footer from '../layouts/Footer'

class Home extends Component {
  render () {
    return (
      <ContainerPage>
        <Hero />
        <NowShowing />
        <Upcoming />
        <SubcribeMoviegoers />
        <Footer />
      </ContainerPage>
    )
  }
}

const ContainerPage = styled.ScrollView`
  background-color: #fff
`
export default Home
