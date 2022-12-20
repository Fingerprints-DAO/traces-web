import dayjs from 'dayjs'
import reservoirAPI from 'pages/api/helpers/_api'
import { WNFTMetadata } from 'pages/api/helpers/_types'

const getRandomData = (address: string, tokenId: string) => {
  return {
    name: `${tokenId} ${Math.random() * 100}`,
    description: "FP members can hold and enjoy usage permissions from FP's NFTs through a staking system",
    image: `https://picsum.photos/id/${tokenId}/200/300`,
    externalUrl: `https://fingerprintsdao.xyz/traces/${tokenId}`,
    ogOpenseaUrl: `https://testnets.opensea.io/assets/${address}/${tokenId}`,
    openseaUrl: `https://testnets.opensea.io/assets/${address}/${tokenId}`,
    attributes: [],
  }
}

export const getWNFTMetadata = async (
  ogTokenAddress: string,
  ogTokenId: string,
  tokenId: string,
  stakedAmount: number,
  stakedDate: number
): Promise<WNFTMetadata> => {
  // return random data if network is local
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') {
    return {
      ...getRandomData(ogTokenAddress, ogTokenId),
      name: `Mock erc721 NFT #${ogTokenId}`,
      attributes: [
        {
          trait_type: 'Collection Address',
          value: ogTokenAddress,
        },
        {
          trait_type: 'Collection Name',
          value: 'ERC721 Mock',
        },
        {
          trait_type: 'NFT ID',
          value: ogTokenId,
        },
        {
          trait_type: 'Staked $PRINTS',
          value: stakedAmount,
        },
        // {
        //   display_type: 'date',
        //   trait_type: 'Created',
        //   value: 1667597019624, // timestamp
        // },
        {
          trait_type: 'Last Outbid',
          value: stakedDate, // timestamp
        },
      ],
    }
  }
  try {
    const {
      data: { tokens },
    } = await reservoirAPI.getTokensV5({
      tokens: `${ogTokenAddress}%3A${ogTokenId}`,
    })
    // cache tokens[0].token for 24 hours and returns the cached version or fetch a new version

    // return tokens[0].token contract, id, name, description and image if it exists if not return random data
    if (tokens[0]?.token) {
      return {
        name: tokens[0].token.name,
        image: tokens[0].token.image,
        description: `FP members can hold and enjoy usage permissions from FP's NFTs through a staking system`,
        externalUrl: `https://fingerprintsdao.xyz/traces/${tokens[0].token.contract}/${tokens[0].token.tokenId}`,
        ogOpenseaUrl: `https://testnets.opensea.io/assets/${tokens[0].token.contract}/${tokens[0].token.tokenId}`,
        openseaUrl: `https://testnets.opensea.io/assets/${process.env.NEXT_PUBLIC_TRACES_CONTRACT_ADDRESS}/${tokenId}`,
        attributes: [
          {
            trait_type: 'Collection Address',
            value: tokens[0].token.contract,
          },
          {
            trait_type: 'Collection Name',
            value: tokens[0].token.collection.name,
          },
          {
            trait_type: 'NFT ID',
            value: tokens[0].token.tokenId,
          },
          {
            display_type: 'number',
            trait_type: 'Staked $PRINTS',
            value: stakedAmount,
          },
          // {
          //   display_type: 'date',
          //   trait_type: 'Created',
          //   value: 1667597019624, // timestamp
          // },
          {
            trait_type: 'Stake Date',
            display_type: 'date',
            value: dayjs.unix(stakedDate).toString(), // timestamp
          },
        ],
      }
    }
    return getRandomData(ogTokenAddress, ogTokenId)
  } catch (error) {
    console.error(error)
    // return random data if there is an error
    return getRandomData(ogTokenAddress, ogTokenId)
  }
}
