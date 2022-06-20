import { useMemo } from 'react'
import styled from 'styled-components'
import { InjectedConnector, useStarknet } from '@starknet-react/core'
import WalletHeader from '~/components/SideBar/WallerHeader'
import LogoAndRankContainer from '~/components/SideBar/LogoAndRankContainer'

import ResourcesContainer from '~/components/SideBar/Resources'

const BodyContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #192125;
`

const SideBar = () => {
  const injected = useMemo(() => new InjectedConnector(), [])
  const { account, disconnect } = useStarknet()

  return (
    <BodyContainer>
      <WalletHeader account={account} disconnect={() => disconnect()} />
      <LogoAndRankContainer />
      <ResourcesContainer />
    </BodyContainer>
  )
}

export default SideBar
