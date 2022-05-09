import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x01997e7ec8cd47b05b5f21c39d4bd64f467f3d8fc69c93664d066a005e6f40d0',
  })
}
