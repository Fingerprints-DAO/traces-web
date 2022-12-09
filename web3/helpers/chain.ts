import { chain } from 'wagmi'

// return chain id based on NEXT_PUBLIC_WEB3_NETWORK
export const getChainId = () => {
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'goerli') return chain.goerli.id
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') return chain.hardhat.id
  return chain.mainnet.id
}

// return chain based on NEXT_PUBLIC_WEB3_NETWORK
export const getChain = () => {
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'goerli') return chain.goerli
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') return chain.hardhat
  return chain.mainnet
}
