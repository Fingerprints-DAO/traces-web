import { Address } from 'wagmi'
import { Token, WNFTMetadata } from './_types'

export type HandledToken = {
  ogTokenAddress: Address
  ogTokenId: number
  tokenId: number
  stakedAmount: number
  lastOutbidTimestamp: number
  collectionId: number
  firstStakePrice: number
  minHoldPeriod: number
  dutchAuctionDuration: number
  dutchMultiplier: number
} & WNFTMetadata

// create an adapter to normalize Token big numbers to numbers
export const handleToken = (token: Token) => ({
  ogTokenAddress: token.ogTokenAddress as Address,
  ogTokenId: token.ogTokenId.toNumber(),
  tokenId: token.tokenId.toNumber(),
  stakedAmount: token.stakedAmount.toNumber(),
  lastOutbidTimestamp: token.lastOutbidTimestamp.toNumber(),
  collectionId: token.collectionId.toNumber(),
  firstStakePrice: token.firstStakePrice.toNumber(),
  minHoldPeriod: token.minHoldPeriod.toNumber(),
  dutchAuctionDuration: token.dutchAuctionDuration.toNumber(),
  dutchMultiplier: token.dutchMultiplier.toNumber(),
})
