import cacheData from 'memory-cache'

export async function fetchWithCache(key: string, fetcher: () => Promise<any>, hours: number = 24) {
  const value = cacheData.get(key)
  if (value) {
    console.log('cache hit', key)
    return value
  } else {
    console.log('cache miss', key)
    const res = await fetcher()
    cacheData.put(key, res, hours * 1000 * 60 * 60)
    return res
  }
}
