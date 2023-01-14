import { TracesContext } from '@ui/contexts/Traces'
import { useContext } from 'react'
import { Address, useAccount, useBalance } from 'wagmi'

const useWallet = () => {
  const { address, isConnected } = useAccount()
  const { printContractAddress } = useContext(TracesContext)

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
