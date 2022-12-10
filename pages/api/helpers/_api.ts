export const reservoirAPI = require('api')('@reservoirprotocol/v1.0#x71flbbaftnl')

// set goerli server url if network is goerli
if (process.env.NEXT_PUBLIC_WEB3_NETWORK === 'goerli') {
  reservoirAPI.server('https://api-goerli.reservoir.tools')
}
reservoirAPI.auth('demo-api-key')

export default reservoirAPI
