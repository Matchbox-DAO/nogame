import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x0193b22090a2e09676719b0708101e4f6890f17c430303495f58c83cc5b6b0b4',
  })
}
