import { useContract } from '@starknet-react/core'
import { Abi } from 'starknet'
import abi from './abi/Ogame.json'

export function useGameContract() {
  return useContract({
    abi: abi as Abi,
    address: '0x05e76124e414d2784c9968fb8547f88655ac9653df7f2aa82e73e06c571dd3aa',
  })
}
