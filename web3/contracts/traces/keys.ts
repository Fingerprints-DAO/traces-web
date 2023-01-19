import { Address } from 'wagmi'

export const getTracesWNFTSKey = (address?: Address) => ['wnfts', address]
export const getTracesGetOutbidPricesKey = (address?: Address) => ['outbids', address, 'prices']
export const getTracesAdministratorsKey = ['administrators', 'all']
export const getTracesCollectionKey = (id: string) => ['collection', id]
export const getTracesCollectionMetadataKey = (id: string) => ['collection', id, 'metadata']
export const getTracesOutbidKey = (id: string) => ['outbid', id]
