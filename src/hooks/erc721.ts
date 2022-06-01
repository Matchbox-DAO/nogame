import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/erc721.json'

export function useErc721Contract(address: string) {
  return useContract({
    abi: abi as Abi,
    address,
  })
}
