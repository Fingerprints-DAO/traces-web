import { fetcher } from '@ui/utils/fetcher'
import { CollectionMetadata } from 'pages/api/helpers/_types'
import { useQuery } from 'react-query'
import { getTracesCollectionMetadataKey } from './keys'

const useTracesGetCollectionMetadata = (id: string) => {
  const request = async () => fetcher<CollectionMetadata>(`/api/collection/${id}`)

  return useQuery(getTracesCollectionMetadataKey(id), request, { enabled: !!id })
}

export default useTracesGetCollectionMetadata
