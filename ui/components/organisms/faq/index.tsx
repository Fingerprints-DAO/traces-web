import React, { useMemo } from 'react'

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
  useToken,
} from '@chakra-ui/react'
import { useQuestions } from './useQuestions'

const FAQ = () => {
  const questions = useQuestions()
  const [gray100, gray300] = useToken('colors', ['gray.100', 'gray.300'])
  const [odd, even] = useMemo(() => [questions.filter((_, i) => i % 2 === 1), questions.filter((_, i) => i % 2 === 0)], [questions])

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
                const isLastItem = even.length - 1 === index

                return (
                  <AccordionItem key={item.question} border={`1px solid ${gray300}`} borderRadius={8} marginBottom={!isLastItem ? 6 : 0}>
                    <AccordionButton paddingY={3}>
                      <Heading size="md" flex="1" textAlign="left" color={gray100}>
                        {item.question}
                      </Heading>
                      <AccordionIcon boxSize={6} />
                    </AccordionButton>
                    <AccordionPanel pb={4} color={gray300}>
                      {item.answer}
                    </AccordionPanel>
                  </AccordionItem>
                )
              })}
            </GridItem>
            <GridItem>
              {odd.map((item, index) => {
                const isLastItem = odd.length - 1 === index

                return (
                  <AccordionItem key={item.question} border={`1px solid ${gray300}`} borderRadius={8} marginBottom={!isLastItem ? 6 : 0}>
                    <AccordionButton paddingY={3}>
                      <Heading size="md" flex="1" textAlign="left" color={gray100}>
                        {item.question}
                      </Heading>
                      <AccordionIcon boxSize={6} />
                    </AccordionButton>
                    <AccordionPanel pb={4} color={gray300}>
                      {item.answer}
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
