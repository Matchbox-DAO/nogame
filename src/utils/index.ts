import { BigNumber } from 'bignumber.js'

export const dataToNumber = (value: any) => new BigNumber(value).toNumber()

export const calculEnoughResources = (
  res: { metal: number; crystal: number; deuterium: number },
  points: { metal: number; crystal: number; deuterium: number }
) => {
  if (!points) {
    return false
  }

  return points.metal - res.metal >= 0 && points.crystal - res.crystal >= 0 && points.deuterium - res.deuterium >= 0
}
