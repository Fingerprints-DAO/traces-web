import { fetcher } from '@ui/utils/fetcher'
import dayjs from 'dayjs'
import { HandledToken } from 'pages/api/helpers/_web3'
import { useQuery } from 'react-query'
import { getTracesOutbidKey } from './keys'

const refreshIntervalTime = dayjs.duration(5, 'minute').asMilliseconds()

const useTracesGetOutbid = (id: string) => {
  const request = async () => fetcher<HandledToken>(`/api/outbid/${id}`)

  return useQuery(getTracesOutbidKey(id), request, {
    enabled: !!id,
    refetchInterval: refreshIntervalTime,
  })
}

export default useTracesGetOutbid
