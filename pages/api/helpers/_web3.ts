import { Token } from './_types'

// create an adapter to normalize Token big numbers to numbers
export const handleToken = (token: Token) => ({
  ...token,
  ogTokenId: token.ogTokenId.toNumber(),
  tokenId: token.ogTokenId.toNumber(),
  stakedAmount: token.stakedAmount.toNumber(),
  lastOutbidTimestamp: token.lastOutbidTimestamp.toNumber(),
})
