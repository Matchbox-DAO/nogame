import styled from 'styled-components'
import Image from 'next/image'
import astronaut from '~/assets/icons/Astronaut.svg'
import { LogoutIcon } from '~/components/Icons/Logout'

const LogoutContainer = styled.div`
  margin: 8px 16px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
  cursor: pointer;
`

const AstronautContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  border-left: 2px solid #151a1e;
  font-weight: bold;
`
const HeaderWalletContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 44px;
  border-bottom: 2px solid #151a1e;
`

interface WallerHeaderProps {
  account?: string
  disconnect?: () => void
}

const WalletHeader = ({ account, disconnect }: WallerHeaderProps) => {
  const shortenedAddress = account ? `${account.substring(0, 6)}...${account.substring(59)}` : 'null'
  return (
    <HeaderWalletContainer>
      <LogoutContainer>
        <div onClick={disconnect}>
          <LogoutIcon />
        </div>
      </LogoutContainer>
      <AstronautContainer>
        <Image src={astronaut} alt="astronaut" objectFit="contain" />
        {shortenedAddress}
      </AstronautContainer>
    </HeaderWalletContainer>
  )
}

export default WalletHeader
