import { BigNumber } from 'ethers'
import { Address } from 'wagmi'

type Attribute = { trait_type: string; value: string | number; display_type?: string }

export enum WNFTState {
  idle = 'idle',
  loading = 'loading',
  holding = 'holding',
  minting = 'minting',
  outbidding = 'outbidding',
}

export type WNFTMetadata = {
  name: string
  description: string
  image: string
  externalUrl: string
  ogOpenseaUrl: string
  openseaUrl: string
  attributes: Attribute[]
}

export type Token = {
  ogTokenAddress: Address
  ogTokenId: BigNumber
  tokenId: BigNumber
  stakedAmount: BigNumber
  lastOutbidTimestamp: BigNumber
  collectionId: BigNumber
  firstStakePrice: BigNumber
  minHoldPeriod: BigNumber
  dutchAuctionDuration: BigNumber
  dutchMultiplier: BigNumber
} & WNFTMetadata

export type CollectionMetadata = {
  id: string
  name: string
  description: string
  image: string
  openseaUrl: string
  externalUrl: string
  sampleImages: string[]
}
