import type { AppProps } from 'next/app'
import NextHead from 'next/head'
import { FixedGlobalStyle, ThemedGlobalStyle } from '../theme'
import { StarknetProvider } from '@starknet-react/core'
import { BigNumber } from 'bignumber.js'
import React from 'react'
import {S2MTransactionManagerProvider} from "../providers/transaction";

function MyApp({ Component, pageProps }: AppProps) {
  BigNumber.config({ EXPONENTIAL_AT: 76 })

  return (
    <StarknetProvider>
      <S2MTransactionManagerProvider>
        <NextHead>
          <title>Solve2Mint</title>
        </NextHead>
        <FixedGlobalStyle />
        <ThemedGlobalStyle />
        <Component {...pageProps} />
      </S2MTransactionManagerProvider>
    </StarknetProvider>
  )
}

export default MyApp
