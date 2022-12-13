import { BigNumber } from 'ethers'

type Attribute = { trait_type: string; value: string | number; display_type?: string }
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
  ogTokenAddress: string
  ogTokenId: BigNumber
  tokenId: BigNumber
  stakedAmount: BigNumber
  lastOutbidTimestamp: BigNumber
}

export type CollectionMetadata = {
  id: string
  name: string
  description: string
  image: string
  openseaUrl: string
  externalUrl: string
  sampleImages: string[]
}
