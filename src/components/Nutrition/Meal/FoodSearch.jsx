import {
    Box,
    Button,
    Container,
    HStack,
    Icon,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Square,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { FiFileText } from 'react-icons/fi';
import axios from 'axios';


const SearchBox = ({ APIData, setAPIData, searchInput, setSearchInput,setShowSearchResults }) => {
    const [filteredResults, setFilteredResults] = useState([]);

    useEffect(() => {
        if (searchInput && searchInput.trim().length > 1) {
            axios.get(`https://api.nal.usda.gov/fdc/v1/foods/search`, {
                params: {
                    query: searchInput,
                    pageSize: 4,
                    dataType: "Branded",
                    api_key: 'PtjYJDD1Jo4zamWGQhUi8aDrD33DSzpI57ca2kiK'
                }
            })
                .then((response) => {
                    setAPIData(response.data);
                    setShowSearchResults(true);
                });
        } else {
            setShowSearchResults(false);
        }

    }, [searchInput]);

    const searchItems = (searchValue) => {
        console.log(setSearchInput)
        setSearchInput(searchValue)
    }

    return (
        <Input icon='search'
            placeholder='Search...'
            onChange={(e) => searchItems(e.target.value)}
        />
    )
}

const EmptyResults = () => {
    return (
        <Box borderWidth={{ base: '0', md: '1px' }} p={{ base: '0', md: '4' }} borderRadius="lg">
            <Stack justify="space-between" direction={{ base: 'column', md: 'row' }} spacing="5">
                <HStack spacing="3">
                    <Square size="10" bg="bg-subtle" borderRadius="lg">
                        <Icon as={FiFileText} boxSize="5" />
                    </Square>
                    <Box fontSize="sm">
                        <Text color="empahsized" fontWeight="medium">
                            Search to see an item.
                        </Text>
                        <Text color="muted">1.2MB</Text>
                    </Box>
                </HStack>
                <Stack spacing="3" direction={{ base: 'column-reverse', md: 'row' }}>
                    <Button variant="secondary">Download</Button>
                    <Button variant="primary">View</Button>
                </Stack>
            </Stack>
        </Box>
    )
}

const FoodResults = ({ APIData, foodArr, setFoodArr, setSearchInput }) => {
    if (Object.keys(APIData).length > 0) {
        console.log(APIData)
        return APIData.foods.map((item, key) => <FoodItem item={item} foodArr={foodArr} setFoodArr={setFoodArr} setSearchInput={setSearchInput} key={key} />);
    } else {
        return <EmptyResults />
    }
}

const FoodItem = ({ item, foodArr, setFoodArr, setSearchInput }) => {
    const [servingsConsumed, setservingsConsumed] = useState(0);

    const addFoodOnClick = () => {
        item.servingsConsumed = servingsConsumed;
        setFoodArr([...foodArr, item])
        setSearchInput('');
    }

    const inputOnChange = (e) => {
        setservingsConsumed(e.target.value)
    }


    return (
        <Box borderWidth={{ base: '1px', md: '1px' }} p={{ base: '4', md: '4' }} borderRadius="lg">
            <Stack justify="space-between" direction={{ base: 'column', md: 'column' }} spacing="5">
                <HStack spacing="3">
                    <Square size="10" bg="bg-subtle" borderRadius="lg">
                        <Icon as={FiFileText} boxSize="5" />
                    </Square>
                    <Box fontSize="sm">
                        <Text color="empahsized" fontWeight="medium">
                            {item.brandName}
                        </Text>
                        <Text color="muted">
                            {item.description} {item.packageWeight}
                        </Text>
                    </Box>
                </HStack>
                <Stack spacing="3" direction={{ base: 'column'}}>
                    <Stack direction ={{base: 'row'}}>

                        <InputGroup>
                            <InputLeftAddon children='#' />
                            <Input type="text" onChange={inputOnChange} />
                            <InputRightAddon children={Math.round(item.servingSize) + item.servingSizeUnit} />
                        </InputGroup>

                        <Button variant="outline" onClick={addFoodOnClick}>Add</Button>
                    </Stack>
                </Stack>
            </Stack>
        </Box>
    );
}

export const FoodSearch = ({ foodArr, setFoodArr, searchInput, setSearchInput }) => {
    const [APIData, setAPIData] = useState({});
    const [showSearchResults, setShowSearchResults] = useState(false);

    return (
        <Stack spacing="5">
            <Stack spacing="1">
                <Text fontSize="lg" fontWeight="medium">
                    Search food
                </Text>
                <SearchBox APIData={APIData} setAPIData={setAPIData} searchInput={searchInput} setSearchInput={setSearchInput} setShowSearchResults={setShowSearchResults} />
            </Stack>
            <Box hidden={!showSearchResults}>
                <FoodResults APIData={APIData} foodArr={foodArr} setFoodArr={setFoodArr} setSearchInput={setSearchInput}/>
            </Box>
        </Stack>
    );
}