import styled from 'styled-components'
import React from 'react'
import { ConnectWalletButton } from '~/components/ConnectWalletButton'

import Image from 'next/image'
import NoGameLogo from 'src/assets/NoGameLogo.png'
import ufoLogo from 'src/assets/icons/UFO.svg'
import { ButtonPrimary } from '~/components/Button'
import { ColumnCenter } from '~/components/Column'
import { RowCentered } from '~/components/Row'

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
  hasGeneratedPlanets: boolean | undefined
}

const AuthScreen = ({
  address,
  generatePlanet,
  loading = true,
  walletConnectLoading,
  hasGeneratedPlanets = false,
}: AuthScreenProps) => {
  return (
    <MainWrapper>
      <RowCentered style={{ width: '300px' }}>
        {address && !hasGeneratedPlanets && !loading ? (
          <Image src={ufoLogo} alt="ufo" objectFit="contain" width={48} height={48} />
        ) : (
          <Image src={NoGameLogo} alt="logo" objectFit="contain" />
        )}
      </RowCentered>

      <SubText>
        {address && !hasGeneratedPlanets && !loading
          ? 'Ready for lift off!'
          : 'Manage your resources, discover new worlds and conquer the galaxy!'}
      </SubText>

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
