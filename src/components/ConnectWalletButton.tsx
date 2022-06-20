import { useStarknet } from '@starknet-react/core'
import { InjectedConnector } from '@starknet-react/core'
import { useEffect, useMemo } from 'react'
import ClassicButton from '~/components/UIComponents/Buttons/ClassicButton'
import { ButtonPrimary } from './Button'

export function ConnectWalletButton() {
  const { account, connect } = useStarknet()

  const injected = useMemo(() => new InjectedConnector(), [])

  // useEffect(() => {
  //   setTimeout(() => {
  //     connect(injected)
  //   }, 1500)
  // }, [connect, injected])

  useEffect(() => {
    if (window.starknet) {
      window.starknet.on('accountsChanged', () => {
        connect(injected)
      })
    }
  }, [connect, injected])

  if (account) {
    const shortenedAddress = `${account.substring(0, 6)}...${account.substring(59)}`
    return <ButtonPrimary>{shortenedAddress}</ButtonPrimary>
  }

  return (
    <ButtonPrimary letterSpacing={'0.02em'} onClick={() => connect(injected)}>
      CONNECT WALLET
    </ButtonPrimary>
  )
}
