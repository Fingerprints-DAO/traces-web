export const getBaseURL = () => {
  const base = process.env.NEXT_PUBLIC_VERCEL_URL
  let protocol = 'https://'
  if (process.env.NODE_ENV === 'development') protocol = 'http://'
  return `${protocol}${base}`
}
export const getCollectionWebsiteUrl = (address: string, id?: string) => {
  const base = process.env.NEXT_PUBLIC_VERCEL_URL
  return `${base}/collection/${address}${id ? `/${id}` : ''}`
}
export const getExternalOpenseaUrl = (address: string, id?: string) => {
  const base = process.env.NEXT_PUBLIC_OPENSEA_URL
  return `${base}/${address}${id ? `/${id}` : ''}`
}
