import env from 'env-var'

const getEnv = (
  name: string,
  envVarFn: (envGet: env.IOptionalVariable<{}>) => string
) => {
  const publicName = `NEXT_PUBLIC_${name}`

  if (typeof window === 'object') {
    return process.env[publicName]
  }
  return envVarFn(env.get(publicName))
}

export const PUBLIC_URL = getEnv('PUBLIC_URL', (envGet) =>
  envGet.default('').asString()
)
export const PROVIDER_KEY = getEnv('PROVIDER_KEY', (envGet) =>
  envGet.required().asString()
)
export const WEB3_NETWORK = getEnv('WEB3_NETWORK', (envGet) =>
  envGet.default('local').asString()
)

// Web3 Contracts
export const CONTRACT_ADDRESS =
  getEnv('CONTRACT_ADDRESS', (envGet) => envGet.required().asString()) || ''
