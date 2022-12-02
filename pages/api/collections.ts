import type { NextApiRequest, NextApiResponse } from 'next'

// get the contract asset using opensea api from testnet and return name, description, and image
// write defensive programming to handle errors
const getCollectionInfo = async (address: string) => {
  const response = await fetch(`https://testnets-api.opensea.io/api/v1/asset_contract/${address}`)
  const { name, description, image_url } = await response.json()
  // if response is not ok or network is local then return ramdom valid data different each time
  if (!response.ok || process.env.NEXT_PUBLIC_NETWORK === 'local' || image_url === null) {
    return {
      name: `${address} ${Math.random() * 100}`,
      description: `This is the description for ${address} ${Math.random() * 100} \nhttps://www.youtube.com/watch?v=dMUUbpEHjKo`,
      image: `https://storage.googleapis.com/opensea-prod.appspot.com/puffs/${Math.floor(Math.random() * 10)}.png?w=500&auto=format`,
    }
  }
  return { name, description, image: image_url }
}

type Data = {
  name: string
  description: string
  image: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await getCollectionInfo(req.query.address as string)

  res.status(200).json(data)
}
