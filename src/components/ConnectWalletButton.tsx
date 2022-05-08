import { useStarknet } from '@starknet-react/core'
import { InjectedConnector } from '@starknet-react/core'
import { useEffect, useMemo } from 'react'
import ClassicButton from '~/components/UIComponents/Buttons/ClassicButton'

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
    return <ClassicButton>{shortenedAddress}</ClassicButton>
  }

  if (error) {
    const argentXUrl =
      'https://chrome.google.com/webstore/detail/argent-x-starknet-wallet/dlcobpjiigpikoobohmabehhmhfoodbb'

    const downloadArgentX = () => window.open(argentXUrl, '_blank')
    return (
      <ClassicButton isError={!!error} onClick={downloadArgentX}>
        Download ArgentX Wallet
      </ClassicButton>
    )
  }

  return <ClassicButton onClick={() => connect(injected)}>Connect Wallet</ClassicButton>
}
