import reservoirAPI from 'pages/api/helpers/_api'
import { WNFTMetadata } from 'pages/api/helpers/_types'

const getRandomData = (address: string, tokenId: string) => {
  return {
    name: `${tokenId} ${Math.random() * 100}`,
    description: "FP members can hold and enjoy usage permissions from FP's NFTs through a staking system",
    image: `https://storage.googleapis.com/opensea-prod.appspot.com/puffs/${Math.floor(Math.random() * 10)}.png?w=500&auto=format`,
    externalUrl: `https://fingerprintsdao.xyz/traces/${tokenId}`,
    openseaUrl: `https://testnets.opensea.io/assets/${address}/${tokenId}`,
    attributes: [],
  }
}

export const getWNFTMetadata = async (address: string, tokenId: string, stakedAmount: number, stakedDate: number): Promise<WNFTMetadata> => {
  // return random data if network is local
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') {
    return {
      ...getRandomData(address, tokenId),
      name: `Mock erc721 NFT #${tokenId}`,
      attributes: [
        {
          trait_type: 'Collection Address',
          value: address,
        },
        {
          trait_type: 'Collection Name',
          value: 'ERC721 Mock',
        },
        {
          trait_type: 'NFT ID',
          value: tokenId,
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
      tokens: `${address}%3A${tokenId}`,
    })
    // cache tokens[0].token for 24 hours and returns the cached version or fetch a new version

    // return tokens[0].token contract, id, name, description and image if it exists if not return random data
    if (tokens[0]?.token) {
      return {
        name: tokens[0].token.name,
        image: tokens[0].token.image,
        description: `FP members can hold and enjoy usage permissions from FP's NFTs through a staking system`,
        externalUrl: `https://fingerprintsdao.xyz/traces/${tokens[0].token.contract}/${tokens[0].token.id}`,
        openseaUrl: `https://testnets.opensea.io/assets/${tokens[0].token.contract}/${tokens[0].token.id}`,
        attributes: [
          {
            trait_type: 'Collection Address',
            value: tokens[0].token.contract,
          },
          {
            trait_type: 'Collection Name',
            value: tokens[0].token.collectionName,
          },
          {
            trait_type: 'NFT ID',
            value: tokens[0].token.id,
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
            trait_type: 'Stake Date',
            value: stakedDate, // timestamp
          },
        ],
      }
    }
    return getRandomData(address, tokenId)
  } catch (error) {
    console.error(error)
    // return random data if there is an error
    return getRandomData(address, tokenId)
  }
}
