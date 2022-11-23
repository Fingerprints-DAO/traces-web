import env from 'env-var'

export const ENV = env.get('NODE_ENV').default('development').asString()
