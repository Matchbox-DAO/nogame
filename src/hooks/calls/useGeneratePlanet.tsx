import { useStarknet } from '@starknet-react/core'
import { useCallback } from 'react'
import { AddTransactionResponse } from 'starknet'
import { useS2MTransactionManager } from '~/providers/transaction'
import { useGameContract } from '../game'

export default function useGeneratePlanet() {
  const { account } = useStarknet()
  const { contract } = useGameContract()

  const { addTransaction } = useS2MTransactionManager()

  return useCallback(async () => {
    if (!contract || !account) {
      throw new Error('Missing Dependencies')
    }

    return contract
      .invoke('generate_planet', [])
      .then((tx: AddTransactionResponse) => {
        console.log('Transaction hash: ', tx.transaction_hash)

        addTransaction({
          status: tx.code,
          transactionHash: tx.transaction_hash,
          address: account,
          summary: 'Generate planet',
        })

        return tx.transaction_hash
      })
      .catch((e) => {
        console.error(e)
      })
  }, [account, addTransaction, contract])
}
