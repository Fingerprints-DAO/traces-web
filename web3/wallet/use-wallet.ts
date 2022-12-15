import { Address, useAccount, useBalance } from 'wagmi'

const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ''

const useWallet = () => {
  const { address, isConnected } = useAccount()

  const { data: printsBalance } = useBalance({
    address,
    enabled: Boolean(address) && Boolean(printContractAddress),
    token: printContractAddress as Address,
  })

  return {
    address,
    isConnected,
    printsBalance,
  }
}

export default useWallet
