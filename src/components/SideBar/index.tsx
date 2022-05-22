import { useMemo } from 'react'
import styled from 'styled-components'
import { InjectedConnector, useStarknet } from '@starknet-react/core'
import WalletHeader from '~/components/SideBar/WallerHeader'
import LogoAndRankContainer from '~/components/SideBar/LogoAndRankContainer'

import ResourcesContainer from '~/components/SideBar/Resources'

const BodyContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #192125;
`

const SideBar = () => {
  const injected = useMemo(() => new InjectedConnector({ showModal: false }), [])
  const { account, disconnect } = useStarknet()

  return (
    <BodyContainer>
      <WalletHeader account={account} disconnect={() => disconnect(injected)} />
      <LogoAndRankContainer />
      <ResourcesContainer />
    </BodyContainer>
  )
}

export default SideBar