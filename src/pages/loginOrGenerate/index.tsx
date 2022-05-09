import styled from 'styled-components'
import React from 'react'
import { ConnectWalletButton } from '~/components/ConnectWalletButton'

import Image from 'next/image'
import logo from 'src/assets/logo.png'
import OBox from '~/components/OBox'
import ClassicButton from '~/components/UIComponents/Buttons/ClassicButton'

const ImgWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: end;
  position: relative;
  padding-right: 100px;
  bottom: 30px;
`

const ButtonWrapper = styled.div`
  width: 100%;
  height: 30vh;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`

interface Props {
  generatePlanet: () => void
  address?: string
}

const ConnectArgentx = ({ address, generatePlanet }: Props) => {
  return (
    <OBox title={'WELCOME'}>
      <ImgWrapper>
        <div style={{ width: 250 }}>
          <Image src={logo} alt="logo" objectFit="contain" />
        </div>
      </ImgWrapper>
      <ButtonWrapper>
        <div style={{ minWidth: 300 }}>
          {!address && <ConnectWalletButton />}
          {address && generatePlanet && <ClassicButton onClick={() => generatePlanet()}>GENERATE PLANET</ClassicButton>}
        </div>
      </ButtonWrapper>
    </OBox>
  )
}

export default ConnectArgentx
