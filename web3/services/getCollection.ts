import reservoirAPI from 'pages/api/helpers/_api'
import { getExternalOpenseaUrl, getCollectionWebsiteUrl } from 'pages/api/helpers/_getLink'
import { CollectionMetadata } from 'pages/api/helpers/_types'
import { fetchWithCache } from './getWithCache'

const getRandomData = (address: string) => {
  return {
    id: address,
    name: `${address.slice(0, 5)} ${Math.random() * 100}`,
    description: "FP members can hold and enjoy usage permissions from FP's NFTs through a staking system",
    image: `https://picsum.photos/id/${address.slice(-2)}/200/300`,
    externalUrl: getCollectionWebsiteUrl(address),
    openseaUrl: getExternalOpenseaUrl(address),
    sampleImages: [`https://storage.googleapis.com/opensea-prod.appspot.com/puffs/${Math.floor(Math.random() * 10)}.png?w=500&auto=format`],
  }
}

// get the contract asset using opensea api from testnet and return name, description, and image
// write defensive programming to handle errors
export const getCollectionInfo = async (address: string): Promise<CollectionMetadata> => {
  // if response is not ok or network is local then return ramdom valid data different each time
  if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'local') {
    return {
      ...getRandomData(address),
    }
  }
  try {
    const {
      data: { collections },
    } = await fetchWithCache(address, () =>
      reservoirAPI.getCollectionsV5({
        id: address,
        includeTopBid: 'false',
        normalizeRoyalties: 'false',
        sortBy: 'allTimeVolume',
        limit: '20',
        accept: '*/*',
      })
    )

    const { id, name, description, image, externalUrl, sampleImages } = collections[0]
    return {
      id,
      name,
      description,
      image,
      externalUrl,
      sampleImages,
      openseaUrl: getExternalOpenseaUrl(address),
    }
  } catch (error) {
    console.error(error)
    return {
      ...getRandomData(address),
    }
  }
}
