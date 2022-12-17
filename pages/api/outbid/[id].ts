import type { NextApiRequest, NextApiResponse } from 'next'
import { getWNFTMetadata } from '@web3/services/getWNFTMetadata'
import { readContract } from '@wagmi/core'
import { HandledToken, handleToken } from '../helpers/_web3'
import { Token } from '../helpers/_types'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { BigNumber } from 'ethers/lib/ethers'
import { getChainId } from '@web3/helpers/chain'

export default async function handler(req: NextApiRequest, res: NextApiResponse<HandledToken | { error: string }>) {
  const token = handleToken(
    (await readContract({
      address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '',
      abi: TracesContract,
      functionName: 'getToken',
      chainId: getChainId(),
      args: [BigNumber.from(req.query.id)],
    })) as Token
  )

  // check if token has ogTokenAddress and ogTokenId
  if (token && token.tokenId) {
    const metadata = await getWNFTMetadata(
      token.ogTokenAddress,
      token.ogTokenId.toString(),
      req.query.id as string,
      token.stakedAmount,
      token.lastOutbidTimestamp
    )
    res.status(200).json({
      ...metadata,
      ...token,
    })
    return
  }

  res.status(400).json({ error: 'Token does not exist' })
}
