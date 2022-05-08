import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { StarknetProvider, useStarknet, useStarknetCall } from '@starknet-react/core'
import { BigNumber } from 'bignumber.js'
import React from 'react'
import { S2MTransactionManagerProvider } from '~/providers/transaction'
import { useGameContract } from '~/hooks/game'
import Popups from '~/components/Popups'
import { AppWrapper } from '~/components/Core/AppWrapper'
import ConnectArgentx from '~/pages/loginOrGenerate'
import useGeneratePlanet from '~/hooks/calls/useGeneratePlanet'

const AuthController = ({ Component, pageProps }: AppProps) => {
  const { account } = useStarknet()
  const { contract: gameContract } = useGameContract()
  // Not sure about the returned result of this call, if 0 then no planet?
  const { data, error } = useStarknetCall({
    contract: gameContract,
    method: 'owner_of',
    args: [account],
  })
  const generatePlanet = useGeneratePlanet()

  // useMemo(() => {
  //   if (data) {
  //     const bgNumber = new BigNumber('0x12', 16)
  //     console.log('data', data, data['planet_id'], bgNumber)
  //   }
  // }, [data])

  if (data || error) {
    return <ConnectArgentx address={account} generatePlanet={() => generatePlanet()} />
  }

  // @ts-ignore
  return <Component {...pageProps} />
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
