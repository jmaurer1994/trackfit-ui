import { Icon } from '@chakra-ui/icons'
import { Divider, Flex, Image, Input, InputGroup, InputLeftElement, Stack, useColorModeValue } from '@chakra-ui/react'
import React, {useContext} from 'react'
import {
    FiBarChart2,
    FiHelpCircle,
    FiSearch,
    FiSettings,
} from 'react-icons/fi'
import { Logo } from './Logo'
import { NavButton } from './NavButton'
import { UserProfile } from './UserProfile'
import { GiMeal, GiWeightLiftingUp } from "react-icons/gi";
import { NavLink } from 'react-router-dom'
import { UserContext } from './Providers'

const searchColorScheme = {

}

export const Sidebar = () => {
    const user = useContext(UserContext)
    console.log(user)
    return (
        <Flex as="section" minH="100vh" bgColor={useColorModeValue("brand.300", "brand.100")}>
            <Flex
                flex="1"
                bg="bg-accent"
                color="on-accent"
                maxW={{
                    base: 'full',
                    sm: 'xs',
                }}
                py={{
                    base: '6',
                    sm: '8',
                }}
                px={{
                    base: '4',
                    sm: '6',
                }}
            >
                <Stack justify="space-between" spacing="1">
                    <Stack
                        spacing={{
                            base: '5',
                            sm: '6',
                        }}
                        shouldWrapChildren
                    >
                        <Image maxW='150px' src="../img/logo.png" marginBottom={-1} />
                        <InputGroup color={useColorModeValue("brand.100", "brand.500")}>
                            <InputLeftElement pointerEvents="none">
                                <Icon as={FiSearch} color="on-accent" boxSize="5" />
                            </InputLeftElement>
                            <Input colorScheme='brand' color={useColorModeValue("brand.100", "brand.500")} placeholder="Search" variant="filled" />
                        </InputGroup>
                        <Stack color={useColorModeValue("brand.500", "brand.300")} spacing="1">
                            <NavLink to="/"><NavButton label="Dashboard" icon={FiBarChart2} aria-current="page" /></NavLink>
                            <NavLink to="/fitness"><NavButton label="Fitness" icon={GiWeightLiftingUp} /></NavLink>
                            <NavLink to="/nutrition"><NavButton label="Nutrition" icon={GiMeal} /></NavLink>
                        </Stack>
                    </Stack>
                    <Stack color={useColorModeValue("brand.500", "brand.300")} spacing={{ base: '5', sm: '6', }}>
                        <Stack spacing="1">
                            <NavButton label="Help" icon={FiHelpCircle} />
                            <NavLink to="/settings"><NavButton label="Settings" icon={FiSettings} /></NavLink>
                        </Stack>
                        <Divider />
                        <UserProfile
                            name={user.given_name}
                            image={user.picture}
                            email={user.email}
                        />
                    </Stack>
                </Stack>
            </Flex>
        </Flex>
    )
}