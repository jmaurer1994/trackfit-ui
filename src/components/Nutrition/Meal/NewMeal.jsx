import {
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Stack,
    StackDivider,
    Text,
    Textarea,
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'
import React, {useState} from 'react';
import { FoodSearch } from './FoodSearch'
import { Dropzone } from './Dropzone'
//https://api.nal.usda.gov/fdc/v1/foods/search?query=apple&pageSize=2&api_key=PtjYJDD1Jo4zamWGQhUi8aDrD33DSzpI57ca2kiK
export const NewMeal = () => {
    const [foodArr, setFoodArr] = useState([]);
    const [searchInput, setSearchInput] = useState('');

    return (
        <Container >
            <Stack spacing="5">
                <Stack
                    spacing="4"
                    direction={{
                        base: 'column',
                        sm: 'row',
                    }}
                    justify="space-between"
                >
                    <Box>
                        <Text fontSize="lg" fontWeight="medium">
                            New Entry
                        </Text>
                        <Text color="muted" fontSize="sm">
                            Log a recent meal.
                        </Text>
                    </Box>
                    <Button variant="primary" alignSelf="start">
                        Save
                    </Button>
                </Stack>
                <Divider />
                <FoodList foodArr={foodArr} />


                <FoodSearch foodArr={foodArr} setFoodArr={setFoodArr} searchInput={searchInput} setSearchInput={setSearchInput} />
                
            </Stack>
        </Container>
    )
}

const FoodList = ({foodArr}) => {
    return(
    <TableContainer>
        <Table variant='striped' colorScheme='teal'>
            <TableCaption>Imperial to metric conversion factors</TableCaption>
            <Thead>
                <Tr>
                    <Th>Description</Th>
                    <Th isNumeric>Serving Size</Th>
                    <Th >Unit</Th>
                    <Th isNumeric>#</Th>
                </Tr>
            </Thead>
            <Tbody>
                { foodArr.map((item, key) => <FoodItem item={item} key={key} />)}
            </Tbody>
        </Table>
    </TableContainer>
    )}

const FoodItem = ({item}) => {
return(
    <Tr>
        <Td>{item.description}</Td>
        <Td isNumeric>{Math.round(item.servingSize)}</Td>
        <Td >{item.servingSizeUnit}</Td>
        <Td >{item.servingsConsumed}</Td>
    </Tr>
);
}