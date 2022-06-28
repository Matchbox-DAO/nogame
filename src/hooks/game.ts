import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x035401b96dc690eda2716068d3b03732d7c18af7c0327787660179108789d84f',
  })
}
