import React, { useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Heading,
  Box,
} from '@chakra-ui/react'
import Wallet from '@ui/components/molecules/wallet'
import useTracesRead from '@web3/contracts/traces/use-traces-read'
import { ModalElement } from '@ui/contexts/Modal'
import useWallet from '@web3/wallet/use-wallet'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  onOpenModal: (element: ModalElement) => void
}

const Drawer = ({ isOpen, onClose, onOpenModal }: DrawerProps) => {
  const router = useRouter()
  const { isConnected } = useWallet()
  const { isAdmin, isEditor } = useTracesRead()

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

  const handleOpenModal = (element: ModalElement) => () => onOpenModal(element)

  const items = useMemo(() => {
    const arr = [
      { path: '/', label: 'Homepage' },
      { path: '/collections', label: 'Collections' },
    ]

    if (isConnected) {
      arr.push({ path: '/profile', label: 'Profile' })
    }

    return arr
  }, [isConnected])

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
            {items.map((item) => {
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
              <Box
                as="button"
                display="block"
                lineHeight={9}
                fontSize={[18, 18, 18, 18, 24]}
                mb={[4, 4, 4, 4, 10]}
                onClick={handleOpenModal(ModalElement.AddNFT)}
              >
                Add NFT
              </Box>
            )}
            {isAdmin && (
              <>
                <Box
                  as="button"
                  display="block"
                  lineHeight={9}
                  fontSize={[18, 18, 18, 18, 24]}
                  mb={[4, 4, 4, 4, 10]}
                  onClick={handleOpenModal(ModalElement.UpdateConfigs)}
                >
                  Update configs
                </Box>
                <Box
                  as="button"
                  display="block"
                  lineHeight={9}
                  fontSize={[18, 18, 18, 18, 24]}
                  mb={[4, 4, 4, 4, 10]}
                  onClick={handleOpenModal(ModalElement.AddRole)}
                >
                  Manage roles
                </Box>
                <Box
                  as="button"
                  display="block"
                  lineHeight={9}
                  fontSize={[18, 18, 18, 18, 24]}
                  onClick={handleOpenModal(ModalElement.Administrators)}
                >
                  Admins and editors
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
