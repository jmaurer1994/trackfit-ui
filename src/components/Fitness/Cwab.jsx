import {
    Box,
    Button,
    Container,
    IconButton,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import { exercises } from './data'

export const Cwab = () => (
    <Box
        as="section"
        py={{
            base: '4',
            md: '8',
        }}
    >
        <Container maxW="3xl">
            <Box
                bg="bg-surface"
                boxShadow={useColorModeValue('sm', 'sm-dark')}
                borderRadius="lg"
                p={{
                    base: '4',
                    md: '6',
                }}
            >
                <Stack spacing="5" divider={<StackDivider />}>
                    <Stack
                        justify="space-between"
                        direction={{
                            base: 'column',
                            sm: 'row',
                        }}
                        spacing="5"
                    >
                        <Stack spacing="1">
                            <Text fontSize="lg" fontWeight="medium">
                                Exercises
                            </Text>
                            <Text fontSize="sm" color="muted">
                                Log an Exercise
                            </Text>
                        </Stack>
                        <Button variant="primary">Add</Button>
                    </Stack>
                    {exercises.map((exercise, id) => (
                        <Stack key={id} justify="space-between" direction="row" spacing="4">
                            <Stack spacing="0.5" fontSize="sm">
                                <Text color="emphasized" fontWeight="medium">
                                    {exercise.title}
                                </Text>
                                <Text>
                                    {exercise.date}
                                </Text>
                                <Text color="muted">{exercise.description}</Text>
                            </Stack>

                            <Stack
                                direction={{
                                    base: 'column',
                                    sm: 'row',
                                }}
                                spacing={{
                                    base: '0',
                                    sm: '1',
                                }}
                            >
                                <IconButton
                                    icon={<FiEdit2 fontSize="1.25rem" />}
                                    variant="ghost"
                                    aria-label="Edit experience"
                                />
                                <IconButton
                                    icon={<FiTrash2 fontSize="1.25rem" />}
                                    variant="ghost"
                                    aria-label="Delete experience"
                                />
                            </Stack>
                        </Stack>
                    ))}
                </Stack>
            </Box>
        </Container>
    </Box>
)