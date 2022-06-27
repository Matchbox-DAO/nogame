import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x05899384efed742ca37a8d17727f1501bcbe99f185001911351e5f86798bdc28',
  })
}
