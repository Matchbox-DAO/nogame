import { useMemo, useState } from 'react'
import styled from 'styled-components'
import { InjectedConnector, useStarknet } from '@starknet-react/core'
import WalletHeader from '~/components/SideBar/WallerHeader'
import LogoAndRankContainer from '~/components/SideBar/LogoAndRankContainer'

import ResourcesContainer from '~/components/SideBar/Resources'
import { ButtonPrimary } from '~/components/Button'
import plus from '~/assets/icons/Plus.svg'
import Image from 'next/image'
import useCollectResources from '~/hooks/calls/useCollectResources'

const BodyContainer = styled.div`
  flex: 1;
  height: 100%;
  background-color: #192125;
`
const ButtonWrapper = styled.div`
  margin-top: 20px;
`

const SideBar = () => {
  const [called, setCalled] = useState(false)
  // const injected = useMemo(() => new InjectedConnector({ showModal: false }), [])
  const { account, disconnect } = useStarknet()
  const collectResources = useCollectResources()

  return (
    <BodyContainer>
      <WalletHeader account={account} disconnect={() => disconnect()} />
      <LogoAndRankContainer />
      <ResourcesContainer />
      <ButtonWrapper>
        <ButtonPrimary
          disabled={called}
          onClick={() => collectResources().then(() => setCalled(true))}
          // customColor={isValidButton ? undefined : '#402F2C'}
        >
          <div style={{ display: 'flex', flex: 1, justifyContent: 'center', flexDirection: 'row' }}>
            <div style={{ width: 20, height: 20 }}>
              <Image src={plus} alt="plus" />
            </div>
            <div>Collect Resources</div>
          </div>
        </ButtonPrimary>
      </ButtonWrapper>
    </BodyContainer>
  )
}

export default SideBar
