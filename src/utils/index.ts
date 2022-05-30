import { BigNumber } from 'bignumber.js'

export const dataToNumber = (value: any) => new BigNumber(value).toNumber()
