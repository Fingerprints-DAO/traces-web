import React, { PropsWithChildren } from 'react'

// Components
import Footer from '@ui/components/organisms/footer'
import Header from '@ui/components/organisms/header'

// Assets
import { Box } from '@chakra-ui/react'

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Box as="main">
        <Header />
        {children}
        <Footer />
      </Box>
    </>
  )
}

export default Layout
