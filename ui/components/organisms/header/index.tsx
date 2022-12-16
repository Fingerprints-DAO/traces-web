import React, { useContext, useEffect, useState } from 'react'

// Dependencies
import { useRouter } from 'next/router'
import { HamburgerIcon } from '@chakra-ui/icons'
import { Box, Button, Container, useDisclosure } from '@chakra-ui/react'

// Components
import Drawer from '../drawer'
import Logo from '@ui/components/atoms/logo'
import { ModalContext, ModalContextValue, ModalElement } from '@ui/contexts/Modal'
import Wallet from '@ui/components/molecules/wallet'
import { useIsBrowser } from '@ui/hooks/use-is-browser'

const Header = () => {
  const router = useRouter()
  const { handleOpenModal } = useContext(ModalContext)
  const { isOpen: isDrawerOpen, onClose: onCloseDrawer, onOpen: onOpenDrawer } = useDisclosure()
  const isBrowser = useIsBrowser()

  useEffect(() => {
    onCloseDrawer()
  }, [router.route, onCloseDrawer])

  const handleModal = (element: ModalContextValue['element']) => () => {
    onCloseDrawer()

    handleOpenModal(element)()
  }

  return (
    <>
      <Box as="header" paddingY="3" background="gray.900" position="sticky" left={0} top={0} zIndex="sticky" suppressHydrationWarning={true}>
        <Container maxWidth="7xl" display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" alignItems="center">
            <Button variant="unstyled" display="block" minWidth="unset" height="unset" padding="3px" marginRight={[2, 4]} onClick={onOpenDrawer}>
              <HamburgerIcon boxSize={18} display="block" />
            </Button>
            <Logo />
          </Box>
          {isBrowser && <Wallet variant="header" />}
        </Container>
      </Box>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={onCloseDrawer}
        onOpenAddNftModal={handleModal(ModalElement.AddNFT)}
        onOpenUpdateConfigsModal={handleModal(ModalElement.UpdateConfigs)}
        onOpenAdministratorsModal={handleModal(ModalElement.Administrators)}
      />
    </>
  )
}

export default Header
