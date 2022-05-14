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
import { Cwab } from './Meal/Cwab'

export const NutritionMainPage = () => (
    <Container >
        <Stack spacing={{ base: '8', lg: '6', }}>
            <Stack spacing="4" direction={{ base: 'column', lg: 'row', }} justify="space-between" >
                <Stack spacing="1">
                    <Heading size={useBreakpointValue({ base: 'md', lg: 'xl', })} fontWeight="medium">
                        Nutrition
                    </Heading>
                    <Text color="muted">Track your daily nutritional consumption</Text>
                </Stack>
               
            </Stack>
            <Cwab />
        </Stack>
    </Container>
)