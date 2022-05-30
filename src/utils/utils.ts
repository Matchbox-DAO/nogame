import { BigNumber } from 'bignumber.js'
import { uint256 } from 'starknet'

export const dataToNumber = (value: any) => new BigNumber(uint256.uint256ToBN(uint256.bnToUint256(value))).toNumber()
