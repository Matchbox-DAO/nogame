import styled from 'styled-components'
import React from 'react'
import { ConnectWalletButton } from '~/components/ConnectWalletButton'

import Image from 'next/image'
import logo from 'src/assets/logo.png'
import { ButtonPrimary } from '~/components/Button'
import { ColumnCenter } from '~/components/Column'

const MainWrapper = styled(ColumnCenter)`
  height: 80vh;
  justify-content: center;
  gap: 16px;
`

const SubText = styled.div`
  color: #ffffff;
  font-weight: 300;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  letter-spacing: 0.02em;
  padding: 0 15px 16px;
  width: 20%;

  color: #ffffff;

  opacity: 0.5;
`

interface AuthScreenProps {
  generatePlanet: () => void
  address?: string
  loading: boolean
  walletConnectLoading: boolean
}

const AuthScreen = ({ address, generatePlanet, loading = true, walletConnectLoading }: AuthScreenProps) => {
  return (
    <MainWrapper>
      <div style={{ width: '300px' }}>
        <Image src={logo} alt="logo" objectFit="contain" />
      </div>

      <SubText>Manage your resources, discover new worlds and conquer the galaxy!</SubText>

      <div>
        {!address ? (
          walletConnectLoading ? (
            <ButtonPrimary disabled>Loading...</ButtonPrimary>
          ) : (
            <ConnectWalletButton />
          )
        ) : null}

        {address ? (
          loading ? (
            <ButtonPrimary disabled>Loading...</ButtonPrimary>
          ) : (
            <ButtonPrimary onClick={() => generatePlanet()}>GENERATE PLANET</ButtonPrimary>
          )
        ) : null}
      </div>
    </MainWrapper>
  )
}

export default AuthScreen
