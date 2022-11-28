// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { readContract } from '@wagmi/core'
import type { NextApiRequest, NextApiResponse } from 'next'
// import Moralis from 'moralis'
// import { EvmChain } from '@moralisweb3/evm-utils'
import Traces from '@web3/contracts/abi/Traces.json'
import { Provider } from './_provider'
import { BigNumber, ethers } from 'ethers'

const provider = new Provider()

const tracesContract = new ethers.Contract(process?.env?.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS ?? '', Traces, provider.get())

type Data = {
  // description: string
  // external_url: string
  // image: string
  // name: string
}

// bitchcoin
// address 0x5e86f887ff9676a58f25a6e057b7a6b8d65e1874
// id 14145

// autoglyph 0xd4e4078ca3495de5b1d4db434bebc5a986197782/233
export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  // const data = await readContract({
  //   address: process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS,
  //   abi: Traces,
  //   functionName: 'vaultAddress',
  // })
  const filter = tracesContract.filters.CollectionAdded(null, null)
  const collectionAdded = await tracesContract.queryFilter(filter, 0 - 7600)
  console.log(collectionAdded)
  console.log(collectionAdded.map((evt) => BigNumber.from(evt?.args?.collectionId).toNumber()))
  const data = await tracesContract.collectionCounter()
  console.log(data)

  // await Moralis.start({
  //   apiKey: 'VXRGbUWhtcl1KN0WSaBOhJUH19rJbFEJH9xZZ8aEQVKMmLlf2jBUYYYmPaJQAgGr',
  //   // ...and any other configuration
  // })

  // const address = '0xbC49de68bCBD164574847A7ced47e7475179C76B'
  // const chain = EvmChain.ETHEREUM
  // // // const tokenId = '233'

  // const response = await Moralis.EvmApi.nft.getWalletNFTs({
  //   address,
  //   chain,
  //   // tokenId,
  //   normalizeMetadata: true,
  //   tokenAddresses: ['0x5e86f887ff9676a58f25a6e057b7a6b8d65e1874', '0xd4e4078ca3495de5b1d4db434bebc5a986197782'],
  // })

  res.status(200).json({
    // ...response,
    description: "FP members can hold and enjoy usage permissions from FP's NFTs through a staking system",
    external_url: 'https://fingerprintsdao.xyz/traces/133413',
    image: 'https://storage.googleapis.com/opensea-prod.appspot.com/puffs/3.png',
    name: 'Wrapped Autoglyph#333',
    attributes: [
      {
        trait_type: 'Collection Address',
        value: '0x01122',
      },
      {
        trait_type: 'Collection Name',
        value: 'Autoglyphs',
      },
      {
        trait_type: 'NFT ID',
        value: 123,
      },
      {
        trait_type: 'Staked $PRINTS',
        value: 1000,
      },
      {
        display_type: 'date',
        trait_type: 'Created',
        value: 1667597019624, // timestamp
      },
      {
        trait_type: 'Stake Date',
        value: 1667597019624, // timestamp
      },
    ],
  })
}
