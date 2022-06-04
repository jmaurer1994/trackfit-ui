import {
  Box,
  Link,
  Container,
  Heading,
  Flex,
  Stack,
  Text,
  chakra,
  useBreakpointValue,
  useColorModeValue,
  IconButton,
} from '@chakra-ui/react';
import React, {useEffect, useState, useContext} from 'react';
import { FiEdit } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { FitnessDatabaseContext, GoogleContext, UserContext } from '../Providers';
import { Cws } from '../SettingsPage/Cws';

const WorkoutCard = ({
  item,
}) => {
  return (
    <Stack
      p={2}
      borderColor={useColorModeValue('brand.400', 'brand.400')}
      borderRadius={'md'}
      borderWidth={'2px'}
      borderStyle={'solid'}
      color={useColorModeValue('brand.100', 'brand.400')}
      bgColor={useColorModeValue('brand.500', 'brand.100')}
      justify="space-between"
      direction="row"
      spacing="4"
    >
      <Stack spacing="0.5">
        <Text
          color="emphasized"
          fontSize="md"
          fontWeight="medium"
          casing={'capitalize'}
        >
          {item.type} - {item.name}
        </Text>
        <Text>
          Logged:{' '}
          {new Date(item.time_logged).toLocaleString('en-US', {
            timeZone: 'UTC',
          })}
        </Text>
        <Text>
          <chakra.span fontWeight={'bold'}>Notes: </chakra.span>
          {item.notes}
        </Text>
        <Text>
          <chakra.span fontWeight={'bold'}>Duration:</chakra.span>{' '}
          {item.duration?.hours} hours {item.duration?.minutes} minutes
        </Text>
      </Stack>
    </Stack>
  );
};

export const DashboardPage = () => {
  const user = React.useContext(UserContext);
  const [workouts, setWorkouts] = useState([]);
  const fdb = useContext(FitnessDatabaseContext);
  //add for prev state
  const navigate = useNavigate();
  const onClickNewWorkout = () => {
    navigate("/fitness")
  }

  useEffect(() => {
    console.log('loading workouts', fdb.getData());
    setWorkouts(fdb.getData());
  }, []);

  return (
    <Container maxW={{ base: 'container.sm', sm: 'container.md' }}>
      <Stack spacing={{ base: '4', lg: '6' }}>
        <Stack
          spacing="1"
          direction={{ base: 'column', lg: 'row' }}
          justify="space-between"
        >
          <Stack
            spacing="1"
            direction={{ base: 'column', sm: 'row' }}
            justify={'space-between'}
          >
            <Heading
              size={useBreakpointValue({ base: '3xl', sm: '4xl' })}
              fontWeight="medium"
              color={useColorModeValue('brand.200', 'brand.400')}
            >
              Dashboard
            </Heading>
            <Stack spacing={-4}>
              <Text p={1} fontSize={'xl'} color="muted">
                Welcome, {user.given_name}
              </Text>
              <Text p={1} color="muted">
                Your day, at a glance
              </Text>
            </Stack>
          </Stack>
        </Stack>
      </Stack>

      <Flex p={1} w="full" alignItems="center" justifyContent="center">
        <Box
          mx="auto"
          px={6}
          py={4}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue('white', 'gray.800')}
          w="container.xl"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <span
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
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
              _hover={{ bg: 'gray.500', color: 'gray.100' }}
              onClick={onClickNewWorkout}
            >
              New workout
            </Link>
          </Flex>

          <Box mt={2}>
            <Link
              fontSize="2xl"
              color={useColorModeValue('gray.700', 'white')}
              fontWeight="700"
              _hover={{
                color: useColorModeValue('gray.600', 'gray.200'),
                textDecor: 'underline',
              }}
            >
              Recent activity
            </Link>
            <Stack spacing={2}>
              {workouts.map((item, id) => (
                <WorkoutCard item={item} key={id} />
              ))}
            </Stack>
          </Box>

          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Link
              color={useColorModeValue('brand.600', 'brand.400')}
              _hover={{ textDecor: 'underline' }}
            ></Link>
          </Flex>
        </Box>
      </Flex>
      <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          mx="auto"
          px={8}
          py={4}
          rounded="lg"
          shadow="lg"
          bg={useColorModeValue('white', 'gray.800')}
          maxW="2xl"
        >
          <Flex justifyContent="space-between" alignItems="center">
            <span
              fontSize="sm"
              color={useColorModeValue('gray.600', 'gray.400')}
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
              _hover={{ bg: 'gray.500' }}
            >
              New meal
            </Link>
          </Flex>

          <Box mt={2}>
            <Link
              fontSize="2xl"
              color={useColorModeValue('gray.700', 'white')}
              fontWeight="700"
              _hover={{
                color: useColorModeValue('gray.600', 'gray.200'),
                textDecor: 'underline',
              }}
            >
              Food journal
            </Link>
            <p mt={2} color={useColorModeValue('gray.600', 'gray.300')}>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempora
              expedita dicta totam aspernatur doloremque. Excepturi iste iusto
              eos enim reprehenderit nisi, accusamus delectus nihil quis facere
              in modi ratione libero!
            </p>
          </Box>

          <Flex justifyContent="space-between" alignItems="center" mt={4}>
            <Link
              color={useColorModeValue('brand.600', 'brand.400')}
              _hover={{ textDecor: 'underline' }}
            ></Link>
          </Flex>
        </Box>
      </Flex>
    </Container>
  );
};
