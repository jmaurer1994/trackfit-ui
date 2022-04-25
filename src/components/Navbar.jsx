import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Container,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Image,
    useBreakpointValue,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiHelpCircle, FiSearch, FiSettings } from 'react-icons/fi'
import { Sidebar } from './Sidebar'
import { ToggleButton } from './ToggleButton'

import { GiBrandyBottle, GiMeal, GiWeightLiftingUp } from "react-icons/gi";
import { ColorModeSwitcher } from './ColorModeSwitcher'
import { NavLink } from 'react-router-dom'
export const Navbar = () => {
    
    const isDesktop = useBreakpointValue({
        base: false,
        lg: true,
    })

    const { isOpen, onToggle, onClose } = useDisclosure()
    return (
        <Box as="nav"  >


            <Box size='container.lg' bgColor={useColorModeValue("brand.200", "brand.200")}
                px={{
                    base: '2',

                }}
                py={{
                    base: '3',
                    lg: '4',
                }}
            >
                <Flex justify="space-between">
                    <HStack spacing="4">
                        <Image width="9rem" src="../img/logo.png" />
                        {isDesktop && (
                            <ButtonGroup variant="ghost-on-accent" color="brand.500" spacing="1">
                                <NavLink to="/"><Button aria-current="page">Dashboard</Button></NavLink>
                                <NavLink to="/exercise-log"><Button>Exercise Log</Button></NavLink>
                                    <NavLink to="/food-log"><Button>Food Log</Button></NavLink>
                            </ButtonGroup>
                        )}
                    </HStack>
                    {isDesktop ? (
                        <HStack p={1} spacing="4">
                            <ColorModeSwitcher color="brand.500" aria-label="Toggle Theme" />
                            <ButtonGroup color="brand.500" variant="ghost-on-accent" spacing="1">
                                <NavLink to="/settings"><IconButton icon={<FiSettings fontSize="1.25rem" />} aria-label="Settings" /></NavLink>
                                <IconButton icon={<FiHelpCircle fontSize="1.25rem" />} aria-label="Help Center" />
                            </ButtonGroup>
                            <Avatar  boxSize="10" name="Joe Maurer" src="../img/profile.png" />
                        </HStack>
                    ) : (
                        <>
                            <HStack spacing={3} p={2}>
                                    <ColorModeSwitcher color="brand.500" aria-label="Toggle Theme" />

                                    <ToggleButton isOpen={isOpen} color="brand.500"  aria-label="Open Menu" onClick={onToggle} />
                            </HStack>
                            <Drawer
                                isOpen={isOpen}
                                placement="left"
                                onClose={onClose}
                                isFullHeight
                                preserveScrollBarGap // Only disabled for showcase
                                trapFocus={false}
                            >
                                <DrawerOverlay />
                                <DrawerContent>
                                    <Sidebar />
                                </DrawerContent>
                            </Drawer>
                        </>
                    )}
                </Flex>
            </Box>
        </Box>
    )
}
