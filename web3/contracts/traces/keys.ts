import { Address } from 'wagmi'

export const getTracesWNFTSKey = (address?: Address) => ['wnfts', address]
export const getTracesAdministratorsKey = ['administrators', 'all']
