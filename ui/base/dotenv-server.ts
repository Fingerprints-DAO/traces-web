import env from 'env-var'

export const ENV = env.get('NODE_ENV').default('development').asString()
export const ETHERSCAN_URL = env.get('ETHERSCAN_URL').required().asUrlString()
export const OPENSEA_URL = env.get('OPENSEA_URL').required().asUrlString()
export const TWITTER_URL = env.get('TWITTER_URL').required().asUrlString()
export const DISCORD_URL = env.get('DISCORD_URL').required().asUrlString()
