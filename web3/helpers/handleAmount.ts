import { BigNumberish } from 'ethers'
import { formatUnits, parseUnits } from 'ethers/lib/utils.js'

const decimals = 18

export const parseAmountToDisplay = (amount: BigNumberish) => {
  return Number(formatUnits(amount, decimals))
}
export const parseAmountToContract = (amount: number | string) => {
  return parseUnits(typeof amount === 'number' ? amount.toString() : amount, decimals)
}
