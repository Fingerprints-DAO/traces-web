import { Address } from 'wagmi'

export const getTracesWNFTSKey = (address?: Address) => ['wnfts', address]
export const getTracesGetOutbidPricesKey = (address?: Address) => ['outbids', address, 'prices']
export const getTracesAdministratorsKey = ['administrators', 'all']
