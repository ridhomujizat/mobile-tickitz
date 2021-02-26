import React, { useEffect, Component } from 'react'
import styled from 'styled-components'
import { Animated, BackHandler } from 'react-native'
import Spinner from 'react-native-spinkit'

function WhiteLoading (props) {
  useEffect(() => {
    const backAction = () => {
      return true
    }

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    )
    return () => backHandler.remove()
  }, [])
  return (
    <>
      <Container colorLoading={props.colorLoading}>
        <Spinner isVisible={true} size={50} type='Wave' color={props.colorLoading || '#5F2EEA'} bgColor={props.bgColor} />
      </Container>
    </>
  )
}

const Container = styled(Animated.View)`
  position: absolute
  left: 0
  right: 0
  top: 0
  bottom: 0
  align-items: center
  justify-content: center
  background-color: ${props => props.colorLoading !== '#fff' ? 'rgba(255, 255, 255,0.5)' : 'rgba(58, 48, 84,0.8)'}
  z-index: 1
`

export default class DimmedLoading extends Component {
  componentDidMount () {
    console.log(this.props.isloading)
  }
  render () {
    if (this.props.isLoading) {
      return <WhiteLoading {...this.props} />
    } else {
      return <React.Fragment />
    }
  }
}
