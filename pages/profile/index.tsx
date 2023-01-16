import React, { useCallback, useEffect, useMemo } from 'react'
import { Box, Button, Container, Grid, Text } from '@chakra-ui/react'
import PageHeader from '@ui/components/organisms/page-header'
import WNFT from '@ui/components/molecules/wnft'
import useWallet from '@web3/wallet/use-wallet'
import { useBalance, useEnsName } from 'wagmi'
import useTracesGetWNFTs from '@web3/contracts/traces/use-traces-get-wnfts'
import { useIsBrowser } from '@ui/hooks/use-is-browser'
import { useWeb3Modal } from '@web3modal/react'
import useTracesGetOutbidsByOwner from '@web3/contracts/traces/use-traces-get-outbids-by-owner'
import { parseAmountToDisplay } from '@web3/helpers/handleAmount'

const printContractAddress = process.env.NEXT_PUBLIC_PRINTS_CONTRACT_ADDRESS || ('' as any)

const ProfilePage = () => {
  const { open } = useWeb3Modal()
  const isBrowser = useIsBrowser()
  const { address, isConnected } = useWallet()

  const { data: ensName } = useEnsName({ address, enabled: Boolean(address) })

  const { data: balance } = useBalance({
    address,
    enabled: Boolean(address) && Boolean(printContractAddress),
    token: printContractAddress,
  })

  const { data: wnfts, isLoading: isLoadingWNFTs } = useTracesGetWNFTs(address)
  const stakedAmount = useMemo(() => {
    if (!wnfts) return 0
    return wnfts.reduce((acc, item) => acc + parseAmountToDisplay(item.lastPrice), 0)
  }, [wnfts])

  const handleOpenModal = () => open()

  return (
    <Container maxWidth="7xl" paddingTop={14} paddingBottom={28}>
      <PageHeader containerProps={{ marginBottom: 12 }} title="Profile" withBackButton={true} />
      {isBrowser && (
        <>
          {isConnected ? (
            <>
              <Box mb="124px">
                <Text mb={6} color="gray.200" fontSize="xl">
                  Current balance{' '}
                  <Text ml={[0, 6]} as="strong" display={['block', 'unset']}>
                    {parseFloat(balance?.formatted || '0').toLocaleString()} PRINTS
                  </Text>
                </Text>
                <Text mb={6} color="gray.200" fontSize="xl">
                  Staked balance{' '}
                  {!isLoadingWNFTs && (
                    <Text ml={[0, 6]} as="strong" display={['block', 'unset']}>
                      {stakedAmount?.toLocaleString() || 0} PRINTS
                    </Text>
                  )}
                </Text>
                <Text color="gray.200" fontSize="xl">
                  Wallet address{' '}
                  <Text ml={[0, 6]} as="strong" display={['block', 'unset']}>
                    {address} {ensName ? `(${ensName})` : ''}
                  </Text>
                </Text>
              </Box>
              <Box>
                <Text color="gray.50" fontSize="4xl" fontWeight="bold" as="h3" mb={12}>
                  My WNFTs
                </Text>
                {!isLoadingWNFTs && wnfts?.length === 0 && <p>No WNFTs found</p>}
                {!isLoadingWNFTs && (
                  <Grid
                    templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
                    gap={8}
                    rowGap={12}
                  >
                    {wnfts?.map((item) => (
                      <WNFT key={item.id} item={item} />
                    ))}
                  </Grid>
                )}
              </Box>
            </>
          ) : (
            <Button color="gray.900" colorScheme="primary" size="lg" mt={8} onClick={handleOpenModal}>
              {!isConnected ? 'Connect' : 'Disconnect'} wallet
            </Button>
          )}
        </>
      )}
    </Container>
  )
}

export default ProfilePage
