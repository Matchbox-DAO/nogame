import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { InjectedConnector, StarknetProvider, useStarknet, useStarknetCall } from '@starknet-react/core'
import { BigNumber } from 'bignumber.js'
import React, { useEffect, useMemo, useState } from 'react'
import { S2MTransactionManagerProvider } from '~/providers/transaction'
import { useGameContract } from '~/hooks/game'
import Popups from '~/components/Popups'
import { AppWrapper } from '~/components/Core/AppWrapper'
import useGeneratePlanet from '~/hooks/calls/useGeneratePlanet'
import AuthScreen from '~/pages/loginOrGenerate'
import { uint256 } from 'starknet'
import Dashboard from './dashboard'
import 'react-tabs/style/react-tabs.css'

const AuthController = ({ Component, pageProps }: AppProps) => {
  const { account, connect } = useStarknet()

  const [walletConnectLoading, setWalletConnectLoading] = useState<boolean>(true)

  const injected = useMemo(() => new InjectedConnector({ showModal: false }), [])

  useEffect(() => {
    setTimeout(() => {
      connect(injected)
    }, 1500)
  }, [connect, injected])

  useEffect(() => {
    setTimeout(() => {
      setWalletConnectLoading(false)
    }, 2500)
  }, [walletConnectLoading])

  const { contract: gameContract } = useGameContract()
  // Not sure about the returned result of this call, if 0 then no planet?
  const { data, error, loading } = useStarknetCall({
    contract: gameContract,
    method: 'owner_of',
    args: [account],
  })
  const generatePlanet = useGeneratePlanet()

  const hasGeneratedPlanets = useMemo(() => {
    if (data) {
      const planetIdBN = new BigNumber(uint256.uint256ToBN(data['planet_id'])).toNumber()

      return planetIdBN > 0
    }
  }, [data])

  if (!account || !hasGeneratedPlanets || loading || walletConnectLoading) {
    return (
      <AuthScreen
        address={account}
        generatePlanet={() => generatePlanet()}
        walletConnectLoading={walletConnectLoading}
        loading={loading || !data}
        hasGeneratedPlanets={hasGeneratedPlanets}
      />
    )
  }

  // return <Component {...pageProps} />
  return <Dashboard />
}

function MyApp(props: AppProps) {
  BigNumber.config({ EXPONENTIAL_AT: 76 })

  return (
    <StarknetProvider>
      <S2MTransactionManagerProvider>
        <NextHead>
          <title>NoGame</title>
        </NextHead>
        <FixedGlobalStyle />
        <ThemedGlobalStyle />
        <Popups />
        <AppWrapper>
          <AuthController {...props} />
        </AppWrapper>
      </S2MTransactionManagerProvider>
    </StarknetProvider>
  )
}

export default MyApp
