import type { NextApiRequest, NextApiResponse } from 'next'
import { getWNFTMetadata } from '@web3/services/getWNFTMetadata'
import { BigNumber } from 'ethers/lib/ethers'
import { readContract } from '@wagmi/core'
import { handleToken } from '../helpers/_web3'
import { Token, WNFTMetadata, WNFTState } from '../helpers/_types'
import TracesContract from '@web3/contracts/traces/traces-abi'

// bitchcoin
// address 0x5e86f887ff9676a58f25a6e057b7a6b8d65e1874
// id 14145

// autoglyph 0xd4e4078ca3495de5b1d4db434bebc5a986197782/233
export default async function handler(req: NextApiRequest, res: NextApiResponse<WNFTMetadata | { error: string }>) {
  const token = handleToken(
    (await readContract({
      address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '',
      abi: TracesContract,
      functionName: 'getToken',
      args: [BigNumber.from(req.query.id)],
    })) as Token
  )

  // check if token has ogTokenAddress and ogTokenId
  if (token && token.tokenId) {
    const data = await getWNFTMetadata(
      token.ogTokenAddress,
      token.ogTokenId.toString(),
      req.query.id as string,
      token.stakedAmount,
      token.lastOutbidTimestamp
    )
    res.status(200).json(data)
    return
  }

  res.status(400).json({ error: 'Token does not exist' })
}
