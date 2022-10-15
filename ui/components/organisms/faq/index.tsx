import React from 'react'

// Dependencies
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
} from '@chakra-ui/react'

const arr = Array.from(Array(8))

const FAQ = () => {
  return (
    <Box as="section">
      <Container maxWidth="7xl">
        <Heading as="h2" size="lg" marginBottom={9}>
          F.A.Q
        </Heading>
        <Accordion>
          <Grid
            gap={4}
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
          >
            {arr.map((_, index) => {
              return (
                <GridItem key={index}>
                  <AccordionItem>
                    <h2>
                      <AccordionButton>
                        <Box flex="1" textAlign="left">
                          Question number 0{index + 1}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                      sed do eiusmod tempor incididunt ut labore et dolore magna
                      aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                </GridItem>
              )
            })}
          </Grid>
        </Accordion>
      </Container>
    </Box>
  )
}

export default FAQ
