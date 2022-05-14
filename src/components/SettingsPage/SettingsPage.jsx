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
import { Cws } from './Cws'

export const SettingsPage = () => (
<Container>
    <Stack spacing={{ base: '8' , lg: '6' , }}>
        <Stack spacing="4" direction={{ base: 'column' , lg: 'row' , }} justify="space-between">
            <Stack spacing="1">
                <Heading size={useBreakpointValue({ base: 'md' , lg: 'xl' , })} fontWeight="medium">
                    Settings
                </Heading>
                <Text color="muted">Personalize your experience.</Text>
            </Stack>
          
        </Stack>
        <Cws />
    </Stack>
</Container>
)