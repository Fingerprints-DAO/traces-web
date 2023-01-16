import type { NextApiRequest, NextApiResponse } from 'next'
import { getWNFTMetadata } from '@web3/services/getWNFTMetadata'
import { readContract } from '@wagmi/core'
import { HandledToken, handleToken } from '../helpers/_web3'
import { Token, WNFTState } from '../helpers/_types'
import TracesContract from '@web3/contracts/traces/traces-abi'
import { BigNumber } from 'ethers/lib/ethers'
import { getChainId } from '@web3/helpers/chain'
import { formatUnits } from 'ethers/lib/utils.js'
import { Address } from 'wagmi'

export default async function handler(req: NextApiRequest, res: NextApiResponse<HandledToken | { error: string }>) {
  let wnftState = WNFTState.outbidding
  let price = 0

  const token = handleToken(
    (await readContract({
      address: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '0x0000') as Address,
      abi: TracesContract,
      functionName: 'getToken',
      chainId: getChainId(),
      args: [BigNumber.from(req.query.id)],
    })) as Token
  )

  if (token.lastOutbidTimestamp === 0) {
    wnftState = WNFTState.minting
  } else {
    try {
      const wnftPrice = await readContract({
        address: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '0x0000') as Address,
        abi: TracesContract,
        functionName: 'getWNFTPrice',
        chainId: getChainId(),
        args: [BigNumber.from(req.query.id)],
      })
      price = Number(formatUnits(wnftPrice.toString() ?? '', 18))
    } catch (error) {
      const revertError = error as RevertError
      if (revertError.errorName === 'HoldPeriod') {
        wnftState = WNFTState.holding
      }
    }
  }

  if (price === 0) {
    price = token.firstStakePrice
  }

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
      state: wnftState,
      price,
    })
    return
  }

  res.status(400).json({ error: 'Token does not exist' })
}
