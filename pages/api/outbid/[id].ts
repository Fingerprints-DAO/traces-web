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
  console.log('outbid - requesting getToken', req.query.id)
  const token = handleToken(
    (await readContract({
      address: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '0x0000') as Address,
      abi: TracesContract,
      functionName: 'getToken',
      chainId: getChainId(),
      args: [BigNumber.from(req.query.id)],
    })) as Token
  )
  console.log('outbid - token returned', token)

  if (token.lastOutbidTimestamp === 0) {
    console.log('outbid - token is on minting state', token.tokenId.toString())
    wnftState = WNFTState.minting
  } else {
    console.log('outbid - trying to get wnftPrice', req.query.id)
    try {
      const wnftPrice = await readContract({
        address: (process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '0x0000') as Address,
        abi: TracesContract,
        functionName: 'getWNFTPrice',
        chainId: getChainId(),
        args: [BigNumber.from(req.query.id)],
      })
      price = Number(formatUnits(wnftPrice.toString() ?? '', 18))
      console.log('outbid - is on outbid state', req.query.id, price)
    } catch (error) {
      console.log('outbid - returned error', req.query.id, error)
      const revertError = error as RevertError
      if (revertError.errorName === 'HoldPeriod') {
        console.log('outbid - token is on holding period', req.query.id)
        wnftState = WNFTState.holding
      }
    }
  }

  if (price === 0) {
    price = token.firstStakePrice
    console.log('outbid - price is 0, setting to firstStakePrice', req.query.id)
  }

  try {
    // check if token has ogTokenAddress and ogTokenId
    console.log('outbid - checking if token has ogTokenAddress and ogTokenId and getting metadata', req.query.id)
    if (token && token.tokenId) {
      const metadata = await getWNFTMetadata(
        token.ogTokenAddress,
        token.ogTokenId.toString(),
        req.query.id as string,
        token.stakedAmount,
        token.lastOutbidTimestamp
      )
      console.log('outbid - metadata returned', req.query.id, metadata)
      res.status(200).json({
        ...metadata,
        ...token,
        state: wnftState,
        price,
      })
      return
    }
  } catch (error) {
    console.log('outbid error', req.query.id, error)
    res.status(500).json({ error: 'Error getting WNFT Metadata' })
    return
  }

  res.status(400).json({ error: 'Token does not exist' })
}
