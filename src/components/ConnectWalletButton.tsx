import { useStarknet } from '@starknet-react/core'
import { InjectedConnector } from '@starknet-react/core'
import { useEffect, useMemo } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button<{ error?: boolean }>`
  box-shadow: none;
  padding: 5px 20px;
  border-width: 1px;
  border-style: solid;
  border-color: ${({ error }) => (error ? 'rgb(255, 7, 58)' : 'white')};
  border-radius: 6px;
  background: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.2s ease 0s;
  color: white;
  font-size: 20px;
  font-weight: 300;
  cursor: pointer;
`

export function ConnectWalletButton() {
  const { account, connect, error } = useStarknet()

  const injected = useMemo(() => new InjectedConnector({ showModal: false }), [])

  useEffect(() => {
    setTimeout(() => {
      connect(injected)
    }, 1500)
  }, [connect, injected])

  useEffect(() => {
    if (window.starknet) {
      window.starknet.on('accountsChanged', () => {
        connect(injected)
      })
    }
  }, [connect, injected])

  if (account) {
    const shortenedAddress = `${account.substring(0, 6)}...${account.substring(59)}`
    return <StyledButton>{shortenedAddress}</StyledButton>
  }

  if (error) {
    const argentXUrl =
      'https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb'

    const downloadArgentX = () => window.open(argentXUrl, '_blank')
    return (
      <StyledButton error={!!error} onClick={downloadArgentX}>
        Download ArgentX Wallet
      </StyledButton>
    )
  }

  return <StyledButton onClick={() => connect(injected)}>Connect Wallet</StyledButton>
}
