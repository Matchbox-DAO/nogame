import styled from 'styled-components'
import React, { FC } from 'react'
import { ConnectWalletButton } from '~/components/ConnectWalletButton'

import Image from 'next/image'
import NoGameLogo from 'src/assets/NoGameLogo.png'
import ufoLogo from 'src/assets/icons/UFO.svg'
import { ButtonPrimary } from '~/components/Button'
import { ColumnCenter } from '~/components/Column'
import { RowCentered } from '~/components/Row'
import SideBar from '~/components/SideBar'

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

const GeneratePlanetWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  height: 100vh;
`

interface AuthScreenProps {
  generatePlanet: () => void
  address?: string
  loading: boolean
  walletConnectLoading: boolean
  hasGeneratedPlanets: boolean | undefined
}

type ConnectWalletViewProps = Omit<AuthScreenProps, 'generatePlanet' | 'hasGeneratedPlanets'>

type GeneratePlanetViewProps = Omit<AuthScreenProps, 'walletConnectLoading' | 'hasGeneratedPlanets'>

const AuthScreen = ({
  address,
  generatePlanet,
  loading = true,
  walletConnectLoading,
  hasGeneratedPlanets = false,
}: AuthScreenProps) => {
  if (address && !hasGeneratedPlanets) {
    return <GeneratePlanetView address={address} loading={loading} generatePlanet={generatePlanet} />
  }

  return <ConnectWalletView address={address} loading={loading} walletConnectLoading={walletConnectLoading} />
}

const ConnectWalletView: FC<ConnectWalletViewProps> = ({ address, loading, walletConnectLoading }) => {
  return (
    <MainWrapper>
      <RowCentered style={{ width: '300px' }}>
        <Image src={NoGameLogo} alt="logo" objectFit="contain" />
      </RowCentered>

      <SubText>Manage your resources, discover new worlds and conquer the galaxy!</SubText>

      <div>
        {!address ? (
          walletConnectLoading ? (
            <ButtonPrimary disabled>Loading...</ButtonPrimary>
          ) : (
            <ConnectWalletButton />
          )
        ) : null}
      </div>
    </MainWrapper>
  )
}

const GeneratePlanetView: FC<GeneratePlanetViewProps> = ({ address, generatePlanet, loading }) => {
  return (
    <GeneratePlanetWrapper>
      <SideBar />
      <MainWrapper>
        <RowCentered style={{ width: '300px' }}>
          <Image src={ufoLogo} alt="ufo" objectFit="contain" width={48} height={48} />
        </RowCentered>

        <SubText>Ready for lift off!</SubText>

        <div>
          {loading ? (
            <ButtonPrimary disabled>Loading...</ButtonPrimary>
          ) : (
            <ButtonPrimary onClick={() => generatePlanet()}>GENERATE PLANET</ButtonPrimary>
          )}
        </div>
      </MainWrapper>
    </GeneratePlanetWrapper>
  )
}

export default AuthScreen
