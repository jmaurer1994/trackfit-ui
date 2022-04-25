import {
    Box,
    Button,
    Container,
    Heading,
    SimpleGrid,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiDownloadCloud } from 'react-icons/fi'
import { Cwab } from './Cwab'

export const FoodLogPage = () => (
    <Container >
        <Stack spacing={{ base: '8', lg: '6', }}>
            <Stack spacing="4" direction={{ base: 'column', lg: 'row', }} justify="space-between" >
                <Stack spacing="1">
                    <Heading size={useBreakpointValue({ base: 'md', lg: 'xl', })} fontWeight="medium">
                        Food Log
                    </Heading>
                    <Text color="muted">Mutritional journal</Text>
                </Stack>
                <Stack direction="row" spacing="3">
                    <Button variant="secondary" leftIcon={<FiDownloadCloud fontSize="1.25rem" />}>
                        Download
                    </Button>
                    <Button variant="primary">Create</Button>
                </Stack>
            </Stack>
            <Cwab />
        </Stack>
    </Container>
)