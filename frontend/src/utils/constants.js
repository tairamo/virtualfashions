import BigNumber from 'bignumber.js'

export const DEFAULT_DECIMALS = 18

export function toUnitAmount(baseAmount, tokenContract = null) {
    const decimals = tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS
  
    const amountBN = new BigNumber(baseAmount.toString())
    return amountBN.div(new BigNumber(10).pow(decimals))
  }
  
  export function toBaseUnitAmount(unitAmount, tokenContract = null) {
    const decimals = tokenContract && tokenContract.decimals != null
      ? tokenContract.decimals
      : DEFAULT_DECIMALS
  
    const amountBN = new BigNumber(unitAmount.toString())
    return amountBN.times(new BigNumber(10).pow(decimals))
  }
  