// Dependencies
import jazzicon from '@metamask/jazzicon'
import { useToast } from '@chakra-ui/react'
import { Contract } from 'ethers/lib/ethers'
import { formatEther } from 'ethers/lib/utils'
import { createContext, PropsWithChildren, useCallback, useEffect, useState } from 'react'

// Helpers
import { Provider, ProviderType } from 'web3/provider'
import PrintsContract from '@web3/contracts/PrintsContract'

const providerInstance = new Provider()
const printsContract = new PrintsContract(providerInstance.get())

const DEFAULT_CONTEXT = {
    avatar: undefined as HTMLDivElement | undefined,
    provider: providerInstance.get(),
    printsBalance: '0',
    /** @dev: only minter must be signed.
     * The only feature we need be connected to client wallet is the mint.
     * We need only get information on core and project data contracts, by now.
     **/
    contractRead: printsContract.get(),
    walletIsConnected: false,
    userAddress: '',
    handleConnectWallet: () => {},
    connectWalletHandler: () => {},
    disconnectWallet: () => {},
}

const Web3Context = createContext(DEFAULT_CONTEXT)

export const Web3Provider: React.FC<PropsWithChildren> = ({ children }) => {
    const toast = useToast()

    const [avatar, setAvatar] = useState<HTMLDivElement>()
    const [userAddress, setUserAddress] = useState(DEFAULT_CONTEXT.userAddress)
    const [provider, setProvider] = useState<ProviderType>(DEFAULT_CONTEXT.provider)
    const [printsBalance, setPrintsBalance] = useState(DEFAULT_CONTEXT.printsBalance)
    const [walletIsConnected, setWalletIsConnected] = useState(DEFAULT_CONTEXT.walletIsConnected)

    const checkBalance = useCallback(async (address: string, printsSigned: Contract) => {
        const balance = await printsSigned.balanceOf(address)
        const balanceStr = formatEther(balance)

        setPrintsBalance(parseFloat(balanceStr).toFixed(2))
    }, [])

    const getAvatar = useCallback((address: string) => {
        const icon = jazzicon(40, parseInt(address, 16))

        setAvatar(icon as HTMLDivElement)
        console.log('address', address)
    }, [])

    const connectWalletHandler = useCallback(async () => {
        if (walletIsConnected) return

        const connectedWallet = await providerInstance.connectWallet()

        if (!connectedWallet) return

        const signer = connectedWallet.getSigner()

        if (!signer) return

        const address = await signer.getAddress()

        if (!address) return

        const printsSigned = new PrintsContract(signer).get()

        setProvider(connectedWallet)
        setUserAddress(address)
        setWalletIsConnected(true)

        await checkBalance(address, printsSigned)
        getAvatar(address)
    }, [walletIsConnected, checkBalance, getAvatar])

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
        setWalletIsConnected(DEFAULT_CONTEXT.walletIsConnected)
        setProvider(DEFAULT_CONTEXT.provider)
        setUserAddress(DEFAULT_CONTEXT.userAddress)

        providerInstance.disconnectWallet()
    }

    const checkWalletConnection = useCallback(async () => {
        if (typeof window.ethereum !== 'undefined') {
            const addressList = await window.ethereum?.request({
                method: 'eth_accounts',
            })

            if (addressList.length > 0 && !walletIsConnected) {
                connectWalletHandler()
            }
        }
    }, [connectWalletHandler, walletIsConnected])

    useEffect(() => {
        checkWalletConnection()
    }, [checkWalletConnection])

    return (
        <Web3Context.Provider
            value={{
                ...DEFAULT_CONTEXT,
                avatar,
                provider,
                printsBalance,
                disconnectWallet,
                walletIsConnected,
                handleConnectWallet,
                userAddress,
                connectWalletHandler,
            }}
        >
            {children}
        </Web3Context.Provider>
    )
}

export default Web3Context
