import styled from 'styled-components'
import Image from 'next/image'
import logout from '~/assets/icons/Log Out.svg'
import astronaut from '~/assets/icons/Astronaut.svg'

const LogoutContainer = styled.div`
  margin: 8px 16px;
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
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
}

const WalletHeader = ({ account }: WallerHeaderProps) => {
  const shortenedAddress = account ? `${account.substring(0, 6)}...${account.substring(59)}` : 'null'
  return (
    <HeaderWalletContainer>
      <LogoutContainer>
        <Image width={24} height={24} src={logout} alt="logout" objectFit="fill" />
      </LogoutContainer>
      <AstronautContainer>
        <Image src={astronaut} alt="astronaut" objectFit="contain" />
        {shortenedAddress}
      </AstronautContainer>
    </HeaderWalletContainer>
  )
}

export default WalletHeader
