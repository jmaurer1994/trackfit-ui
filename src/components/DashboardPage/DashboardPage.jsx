import {
    Box,
    Link,
    Container,
    Heading,
    Flex,
    Stack,
    Text,
    Button,
    useBreakpointValue,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiDownloadCloud } from 'react-icons/fi'
import { GoogleContext, UserContext } from '../Providers'
import { Cws } from '../SettingsPage/Cws'




export const DashboardPage = () => {
    const user = React.useContext(UserContext)
   

    

    return(
        < Container >
        <Stack spacing={{ base: '8', lg: '6', }}>
            <Stack spacing="4" direction={{ base: 'column', lg: 'row', }} justify="space-between" >
                <Stack spacing="1">
                    <Heading size={useBreakpointValue({ base: 'md', lg: 'xl', })} fontWeight="medium">
                        Dashboard
                    </Heading>
                    <Text color="muted">Welcome, {user.given_name}</Text>
                    <Text color="muted">Your day, at a glance</Text>
                </Stack>

            </Stack>
        </Stack>

        <Flex
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                px={8}
                py={4}
                rounded="lg"
                shadow="lg"
                bg={useColorModeValue("white", "gray.800")}
                maxW="2xl"
            >
                <Flex justifyContent="space-between" alignItems="center">
                    <span
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                    >
                        Apr 22, 2022
                    </span>
                    <Link
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        _hover={{ bg: "gray.500" }}
                    >
                        New meal
                    </Link>
                </Flex>

                <Box mt={2}>
                    <Link
                        fontSize="2xl"
                        color={useColorModeValue("gray.700", "white")}
                        fontWeight="700"
                        _hover={{
                            color: useColorModeValue("gray.600", "gray.200"),
                            textDecor: "underline",
                        }}
                    >
                        Food journal
                    </Link>
                    <p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                        enim reprehenderit nisi, accusamus delectus nihil quis facere in
                        modi ratione libero!
                    </p>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Link
                        color={useColorModeValue("brand.600", "brand.400")}
                        _hover={{ textDecor: "underline" }}
                    >
                        
                    </Link>
                </Flex>
            </Box>

        </Flex>
        <Flex
            p={50}
            w="full"
            alignItems="center"
            justifyContent="center"
        >
            <Box
                mx="auto"
                px={8}
                py={4}
                rounded="lg"
                shadow="lg"
                bg={useColorModeValue("white", "gray.800")}
                maxW="2xl"
            >
                <Flex justifyContent="space-between" alignItems="center">
                    <span
                        fontSize="sm"
                        color={useColorModeValue("gray.600", "gray.400")}
                    >
                        Apr 22, 2022
                    </span>
                    <Link
                        px={3}
                        py={1}
                        bg="gray.600"
                        color="gray.100"
                        fontSize="sm"
                        fontWeight="700"
                        rounded="md"
                        _hover={{ bg: "gray.500" }}
                    >
                        New activity
                    </Link>
                </Flex>

                <Box mt={2}>
                    <Link
                        fontSize="2xl"
                        color={useColorModeValue("gray.700", "white")}
                        fontWeight="700"
                        _hover={{
                            color: useColorModeValue("gray.600", "gray.200"),
                            textDecor: "underline",
                        }}
                    >
                        Daily activity
                    </Link>
                    <p mt={2} color={useColorModeValue("gray.600", "gray.300")}>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
                        expedita dicta totam aspernatur doloremque. Excepturi iste iusto eos
                        enim reprehenderit nisi, accusamus delectus nihil quis facere in
                        modi ratione libero!
                    </p>
                </Box>

                <Flex justifyContent="space-between" alignItems="center" mt={4}>
                    <Link
                        color={useColorModeValue("brand.600", "brand.400")}
                        _hover={{ textDecor: "underline" }}
                    >
                    
                    </Link>

                </Flex>
            </Box>

        </Flex>
    </Container >
)

}
    

