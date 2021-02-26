import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { Animated } from 'react-native'
import Spinner from 'react-native-spinkit'

function Loading (props) {
  const fadeAnim = useRef(new Animated.Value(1)).current
  const [delay, setDelay] = useState(true)

  useEffect(() => {
    if (!props.isLoading) {
      const loading = setTimeout(() => {
        setDelay(false)
      }, 300)
      const animated = setTimeout(() => {
        return Animated.timing(
          fadeAnim,
          {
            toValue: 0,
            duration: 270,
            useNativeDriver: true
          }
        ).start()
      }, 100)
      return () => {
        clearTimeout(loading)
        clearTimeout(animated)
      }
    }
  }, [props.isLoading][delay])

  return (
    <>
      {delay && (
        <Container style={[
          {
            opacity: fadeAnim
          }
        ]}>
          <Spinner isVisible={true} size={50} type='Wave' color='#fff' />
        </Container>
      )}
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
  background-color: rgba(58, 48, 84,0.8)
  z-index: 1
`
export default Loading
