import { chain } from 'wagmi'
import { Token } from './_types'

// return chain id based on NEXT_PUBLIC_WEB3_NETWORK
export const getChainId = () => {
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'goerli') return chain.goerli.id
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') return chain.hardhat.id
  return chain.mainnet.id
}

// create an adapter to normalize Token big numbers to numbers
export const handleToken = (token: Token) => ({
  ...token,
  ogTokenId: token.ogTokenId.toNumber(),
  tokenId: token.ogTokenId.toNumber(),
  stakedAmount: token.stakedAmount.toNumber(),
  lastOutbidTimestamp: token.lastOutbidTimestamp.toNumber(),
})
