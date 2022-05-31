import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x00b4d739220008dc9ef01001c90310f88456dc98ee4de6c5032c1ff6f99d3641',
  })
}
