import {
    Avatar,
    Box,
    Drawer,
    DrawerContent,
    DrawerOverlay,
    Flex,
    Icon,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Text,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { BsGearFill } from "react-icons/bs";
import { FiMenu, FiSearch } from "react-icons/fi";
import { MdHome } from "react-icons/md";
import { GiMeal, GiWeightLiftingUp } from "react-icons/gi";
import React from "react";

import { ColorModeSwitcher } from './ColorModeSwitcher';

export default function MainWindow() {

const sidebar = useDisclosure();

const NavItem = (props) => {
    const { icon, children, ...rest } = props;
    return (
        <Flex
            align="center"
            px="4"
            mx="2"
            rounded="md"
            py="3"
            cursor="pointer"
            color="whiteAlpha.700"
            _hover={{
                bg: "blackAlpha.300",
                color: "whiteAlpha.900",
            }}
            role="group"
            fontWeight="semibold"
            transition=".15s ease"
            {...rest}
        >
            {icon && (
                <Icon
                    mr="2"
                    boxSize="4"
                    _groupHover={{
                        color: "gray.300",
                    }}
                    as={icon}
                />
            )}
            {children}
        </Flex>
    );
};

const SidebarContent = (props) => (
    <Box
        as="nav"
        pos="fixed"
        top="0"
        left="0"
        zIndex="sticky"
        h="full"
        pb="10"
        overflowX="hidden"
        overflowY="auto"
        bg="brand.200"
        borderColor="blackAlpha.300"
        borderRightWidth="1px"
        w="60"
        {...props}
    >
        <Flex px="4" py="5" align="center">
            {/* <Logo />*/}
            <Text fontSize="2xl" ml="2" color="white" fontWeight="semibold">
                TrackFit
            </Text>
        </Flex>
        <Flex
            direction="column"
            as="nav"
            fontSize="sm"
            color="gray.600"
            aria-label="Main Navigation"
        >
            <NavItem icon={MdHome}>Home</NavItem>
            <NavItem icon={GiWeightLiftingUp}>Exercises</NavItem>
            <NavItem icon={GiMeal}>Meal Log</NavItem>
            <NavItem icon={BsGearFill}>Settings</NavItem>
        </Flex>
    </Box>
);
return (
    <Box
        as="section"
        bg={useColorModeValue("brand.400", "gray.700")}
        minH="100vh"
    >
        <SidebarContent display={{ base: "none", md: "unset" }} />
        <Drawer
            isOpen={sidebar.isOpen}
            onClose={sidebar.onClose}
            placement="left"
        >
            <DrawerOverlay />
            <DrawerContent>
                <SidebarContent w="full" borderRight="none" />
            </DrawerContent>
        </Drawer>
        <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
            <Flex
                as="header"
                align="center"
                justify="space-between"
                w="full"
                px="4"
                bg={useColorModeValue("brand.300", "gray.800")}
                borderBottomWidth="1px"
                borderColor="blackAlpha.300"
                h="14"
            >
                <IconButton
                    aria-label="Menu"
                    display={{ base: "inline-flex", md: "none" }}
                    onClick={sidebar.onOpen}
                    icon={<FiMenu />}
                    size="sm"
                />
                <InputGroup w="96" display={{ base: "none", md: "flex" }}>
                    <InputLeftElement color="gray.500">
                        <FiSearch />
                    </InputLeftElement>
                    <Input placeholder="Search for articles..." />
                </InputGroup>

                <Flex align="center">

                    <ColorModeSwitcher justifySelf="flex-end" />
                    <Icon color="gray.500" as={FaBell} cursor="pointer" />
                    <Avatar
                        ml="4"
                        size="sm"
                        name="anubra266"
                        src="https://avatars.githubusercontent.com/u/30869823?v=4"
                        cursor="pointer"
                    />
                </Flex>
            </Flex>

            <Box as="main" p="4">





            </Box>
        </Box>
    </Box>
);
}