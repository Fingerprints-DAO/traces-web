import { useToast } from '@chakra-ui/react'
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { Provider, ProviderType } from 'web3/provider'
import { ContractExample } from 'web3/contracts/ContractExample'
import { formatEther, formatUnits } from 'ethers/lib/utils'

const tokenContractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''

const providerClass = new Provider()
const exampleContract = new ContractExample(providerClass.get())

const DEFAULT_CONTEXT = {
  provider: providerClass.get(),
  /** @dev: only minter must be signed.
   * The only feature we need be connected to client wallet is the mint.
   * We need only get information on core and project data contracts, by now.
   **/
  exampleContractRead: exampleContract.get(),
  walletIsConnected: false,
  userAddress: '',
  handleConnectWallet: () => {},
  connectWalletHandler: () => {},
  disconnectWallet: () => {},
}

const Web3Context = createContext(DEFAULT_CONTEXT)

export const Web3Provider: React.FC<PropsWithChildren> = ({
  children,
  ...rest
}) => {
  const toast = useToast()

  const [provider, setProvider] = useState<ProviderType>(
    DEFAULT_CONTEXT.provider
  )
  const [userAddress, setUserAddress] = useState(DEFAULT_CONTEXT.userAddress)
  const [walletIsConnected, setWalletIsConnected] = useState(
    DEFAULT_CONTEXT.walletIsConnected
  )
  const [tradableContractSigned, setTradableContractSigned] = useState(
    DEFAULT_CONTEXT.exampleContractRead
  )

  console.log('tradableContractSigned', tradableContractSigned)

  const connectWalletHandler = useCallback(async () => {
    if (walletIsConnected) return

    await providerClass.connectWallet()

    const connectedWallet = providerClass.getConnectedWallet()

    if (!connectedWallet) return

    const signer = connectedWallet.getSigner()

    if (!signer) return

    const address = await signer.getAddress()

    if (!address) return

    setProvider(connectedWallet)
    setUserAddress(address)
    setWalletIsConnected(true)

    // const avatar = provider.getAvatar(address);
    // const avatar = await connectedWallet.getAvatar()
    // console.log('avatar', avatar)

    // const balance = await signer.getBalance(
    //   process.env.NEXT_PUBLIC_CONTRACT_ADDRESS || ''
    // )

    const contract = await tradableContractSigned.balanceOf(address)
    console.log('contract', contract)
    // const balance = await tradableContractSigned.balanceOf(address)
    // console.log('balance', balance)

    const balance2 = await provider.getBalance(tokenContractAddress)
    // console.log('balance', formatEther(balance))
    // console.log('balance', formatUnits(balance, 6))
    console.log('balance2', formatUnits(balance2, 6))
  }, [walletIsConnected, provider, tradableContractSigned])

  const handleConnectWallet = useCallback(async () => {
    try {
      await connectWalletHandler()

      toast({
        title: 'Connect a wallet',
        description: 'Wallet connected successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      console.log('Error onConnectWallet', error)

      toast({
        title: 'Connect a wallet',
        description: 'Error while connecting your wallet. Try again late.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
  }, [connectWalletHandler, toast])

  const disconnectWallet = async () => {
    setWalletIsConnected(false)
    setProvider(DEFAULT_CONTEXT.provider)
    setUserAddress(DEFAULT_CONTEXT.userAddress)

    providerClass.disconnectWallet()
  }

  const checkWalletConnection = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      const addressList = await window.ethereum?.request({
        method: 'eth_accounts',
      })

      if (addressList.length > 0) {
        connectWalletHandler()
      }
    }
  }, [connectWalletHandler])

  useEffect(() => {
    checkWalletConnection()
  }, [checkWalletConnection])

  return (
    <Web3Context.Provider
      value={{
        ...DEFAULT_CONTEXT,
        provider,
        disconnectWallet,
        walletIsConnected,
        handleConnectWallet,
        userAddress,
        connectWalletHandler,
      }}
    >
      {provider ? children : ''}
    </Web3Context.Provider>
  )
}

export default Web3Context
