import React, { useMemo } from 'react'

// Dependencies
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, Container, Grid, GridItem, Heading, useToken } from '@chakra-ui/react'

const arr = Array.from(Array(8), (item, index) => index + 1)

const odd = arr.filter((_, i) => i % 2 === 1)
const even = arr.filter((_, i) => i % 2 === 0)

const FAQ = () => {
  const [gray100, gray300] = useToken('colors', ['gray.100', 'gray.300'])

  return (
    <Box as="section" paddingBottom={12}>
      <Container maxWidth="7xl">
        <Heading as="h2" size="lg" color="gray.100" marginBottom={9}>
          F.A.Q
        </Heading>
        <Accordion defaultIndex={[0]} allowToggle={true}>
          <Grid gap={8} templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)']}>
            <GridItem>
              {even.map((item, index) => {
                const isLastItem = odd.length - 1 === index

                return (
                  <AccordionItem key={item} border={`1px solid ${gray300}`} borderRadius={8} marginBottom={!isLastItem ? 6 : 0}>
                    <AccordionButton paddingY={3}>
                      <Heading size="md" flex="1" textAlign="left" color={gray100}>
                        Question number {item}
                      </Heading>
                      <AccordionIcon boxSize={6} />
                    </AccordionButton>
                    <AccordionPanel pb={4} color={gray300}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </GridItem>
            <GridItem>
              {odd.map((item, index) => {
                const isLastItem = odd.length - 1 === index

                return (
                  <AccordionItem key={item} border={`1px solid ${gray300}`} borderRadius={8} marginBottom={!isLastItem ? 6 : 0}>
                    <AccordionButton paddingY={3}>
                      <Heading size="md" flex="1" textAlign="left" color={gray100}>
                        Question number {item}
                      </Heading>
                      <AccordionIcon boxSize={6} />
                    </AccordionButton>
                    <AccordionPanel pb={4} color={gray300}>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                      ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </GridItem>
          </Grid>
        </Accordion>
      </Container>
    </Box>
  )
}

export default FAQ
