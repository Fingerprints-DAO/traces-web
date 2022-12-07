import type { NextApiRequest, NextApiResponse } from 'next'
import { getCollectionInfo } from '@web3/services/getCollection'
import { CollectionMetadata } from '../helpers/_types'

export default async function handler(req: NextApiRequest, res: NextApiResponse<CollectionMetadata>) {
  const data = await getCollectionInfo(req.query.id as string)

  res.status(200).json(data)
}
