import React from 'react'

// Dependencies
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Drawer as ChakraDrawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Heading, Box, Text } from '@chakra-ui/react'

// Components
import Wallet from '@ui/components/molecules/wallet'

// Helpers
import useTracesRead from '@web3/contracts/traces/use-traces-read'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  onOpenAddNftModal: () => void
  onOpenUpdateConfigsModal: () => void
  onOpenAdministratorsModal: () => void
}

const links = [
  { path: '/', label: 'Homepage' },
  { path: '/profile', label: 'Profile' },
  { path: '/collections', label: 'Collections' },
]

const Drawer = ({ isOpen, onClose, onOpenAddNftModal, onOpenUpdateConfigsModal, onOpenAdministratorsModal }: DrawerProps) => {
  const router = useRouter()
  const { isEditor } = useTracesRead()

  const activeStyles = (path: string) => {
    if (router.pathname === path) {
      return {
        fontSize: 24,
        fontWeight: 700,
      }
    }

    return {
      fontSize: 18,
    }
  }

  return (
    <ChakraDrawer isOpen={isOpen} placement="left" onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent backgroundColor="gray.900" maxWidth={400}>
        <DrawerHeader alignItems="center" display="flex" justifyContent="space-between" padding={8} mb={4}>
          <Heading as="h1" color="gray.50" size="xl" flex={1}>
            Traces
          </Heading>
          <DrawerCloseButton position="static" />
        </DrawerHeader>
        <DrawerBody px={8}>
          <Box as="nav">
            {links.map((item) => {
              return (
                <Link key={item.path} href={item.path} legacyBehavior={true}>
                  <Box as="a" href={item.path} display="block" lineHeight={9} {...activeStyles(item.path)} mb={[4, 4, 4, 4, 10]}>
                    {item.label}
                  </Box>
                </Link>
              )
            })}
          </Box>
        </DrawerBody>
        <DrawerFooter alignItems="flex-start" flexDirection="column" p={8}>
          <Box as="nav" mb={[10, 20]}>
            {isEditor && (
              <>
                <Box as="button" display="block" lineHeight={9} fontSize={[18, 18, 18, 18, 24]} mb={[4, 4, 4, 4, 10]} onClick={onOpenAddNftModal}>
                  Add NFT
                </Box>
                <Box as="button" display="block" lineHeight={9} fontSize={[18, 18, 18, 18, 24]} mb={[4, 4, 4, 4, 10]} onClick={onOpenUpdateConfigsModal}>
                  Update configs
                </Box>
                <Box as="button" display="block" lineHeight={9} fontSize={[18, 18, 18, 18, 24]} onClick={onOpenAdministratorsModal}>
                  Administrators
                </Box>
              </>
            )}
          </Box>
          <Wallet variant="drawer" />
        </DrawerFooter>
      </DrawerContent>
    </ChakraDrawer>
  )
}

export default Drawer
