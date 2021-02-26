import React from 'react'
import styled from 'styled-components/native'
import { LogoPurple } from '../Logo'
import cineOne21 from '../../assets/images/cinemas/cineOne21.png'
import ebvid from '../../assets/images/cinemas/ebv.id.png'
import hiflix from '../../assets/images/cinemas/hiflix.png'
import ig from '../../assets/images/logo/fa-ig.png'
import fb from '../../assets/images/logo/fa-fb.png'
import yt from '../../assets/images/logo/fa-yt.png'
import tw from '../../assets/images/logo/fa-tw.png'
import { TouchableOpacity } from 'react-native'

function Footer (props) {
  return (
    <Row withPadding={props.withPadding}>
      <BrandLogo>
        <LogoPurple height={'50px'} width={'80px'} />
        <Text>
          Stop waiting in line. Buy tickets
          conveniently, watch movies quietly.
        </Text>
        <MenuLabel>
          Explore
        </MenuLabel>
        <RowMenu>
          <TouchableOpacity>
            <TextMenu>Cinemas</TextMenu>
          </TouchableOpacity>
          <TouchableOpacity>
            <TextMenu>Movie List</TextMenu>
          </TouchableOpacity>
          <TouchableOpacity>
            <TextMenu>Notivication</TextMenu>
          </TouchableOpacity>
          <TouchableOpacity>
            <TextMenu>My Ticket</TextMenu>
          </TouchableOpacity>
        </RowMenu>
        <MenuLabel>
          Our Sponsor
        </MenuLabel>
        <RowMenu>
          <TouchableOpacity >
            <Image source={cineOne21} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={ebvid} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={hiflix} />
          </TouchableOpacity>
        </RowMenu>
        <MenuLabel>
          Follow Us
        </MenuLabel>
        <RowMenu>
          <TouchableOpacity>
            <ImageSocial source={fb} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageSocial source={ig} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageSocial source={tw} />
          </TouchableOpacity>
          <TouchableOpacity>
            <ImageSocial source={yt} />
          </TouchableOpacity>
        </RowMenu>
        <Reserved>© 2020 Tickitz. All Rights Reserved.</Reserved>
      </BrandLogo>
    </Row>
  )
}

const Row = styled.Text`
  margin-top: 50px
  background-color: #fff
  padding: 30px
`
const Text = styled.Text`
  font-family: Mulish-Medium
  font-size: 14px
  color: #6E7191
`

const BrandLogo = styled.View`
  flex-direction: column
  width: 250px 
`
const MenuLabel = styled.Text`
  margin-top: 20px
  font-family: Mulish-SemiBold
  font-Size: 14px
`
const RowMenu = styled.View`
  flex-direction: row
  flex-wrap: wrap
`
const Image = styled.Image`
  width: 70px
  height: 30px
  margin-top: 10px
  margin-right: 10px
  resizeMode: contain;
`
const TextMenu = styled(Text)`
  margin-left: 10px
  margin-top: 10px
`
const Reserved = styled(Text)`
  margin-top: 20px
`
const ImageSocial = styled(Image)`
  width: 25px
  height: 25px
`

export default Footer
