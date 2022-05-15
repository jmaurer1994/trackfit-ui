import {
    Box,
    Button,
    Heading,
    Container,
    IconButton,
    Stack,
    StackDivider,
    Text,
    useColorModeValue,
    useBreakpointValue,
    Avatar,
    RadioGroup,
    Radio,
    Divider,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    InputGroup,
    InputLeftAddon,
    Textarea,
    InputRightAddon,
    SimpleGrid,
} from '@chakra-ui/react'
import { FiEdit2, FiTrash2 } from 'react-icons/fi'
import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from 'axios';
import { FitnessDatabaseContext } from '../Providers'
//an activity ihas...
//name
//date logged
//type activity:exercise
//duration

//exercise has sets


export const FitnessPage = () => {
    const [workouts, setWorkouts] = useState([])
    const [fitnessPageState, setFitnessPageState] = useState('default')
    const [workoutToEdit, setWorkoutToEdit] = useState()
    const fdb = useContext(FitnessDatabaseContext)
    const [saveNeeded, setSaveNeeded] = useState(false)
    //add for prev state



    useEffect(() => {
        console.log("loading workouts", fdb.getData())
        setWorkouts(fdb.getData());
    }, [])

    useEffect(() => {
        if (saveNeeded) {
            console.log("Saving workouts...", workouts)
            fdb.setData(workouts)
            fdb.saveData();
        }
    }, [workouts, saveNeeded])

    const FitnessPageController = () => {
        if (fitnessPageState === "add-new") {
            return (
                <WorkoutForm workouts={workouts} setWorkouts={setWorkouts} setFitnessPageState={setFitnessPageState} setSaveNeeded={setSaveNeeded} />
            )
        } else if (fitnessPageState === "edit") {
            return (
                <WorkoutForm workoutToEdit={workoutToEdit} workouts={workouts} setWorkouts={setWorkouts} setSaveNeeded={setSaveNeeded} setFitnessPageState={setFitnessPageState} />
            )
        } else {
            return (
                <WorkoutTable workouts={workouts} setWorkouts={setWorkouts} setFitnessPageState={setFitnessPageState} setSaveNeeded={setSaveNeeded} setWorkoutToEdit={setWorkoutToEdit} />
            )
        }
    }


    return (
        <Container >
            <Stack spacing={{ base: '8', lg: '6', }}>
                <Stack spacing="4" direction={{ base: 'column', lg: 'row', }} justify="space-between" >
                    <Stack spacing="1">
                        <Heading size={useBreakpointValue({ base: 'xl', lg: '3xl', })} fontWeight="medium">
                            Fitness
                        </Heading>
                        <Text color="muted">This page will allow you to track your fitness</Text>
                    </Stack>
                </Stack>

                <FitnessPageController />
            </Stack>
        </Container>

    )
}

const WorkoutTable = ({ workouts, setWorkouts, setFitnessPageState, setWorkoutToEdit, setSaveNeeded }) => {

    const handleOnClickEditWorkout = (e) => {
        console.log(e.target.value)
        console.log(workouts[e.target.value])
        setWorkoutToEdit(e.target.value)
        setFitnessPageState("edit")
    }
    const handleOnClickDeleteWorkout = (e) => {
        setWorkouts(workouts.filter((workout, index) => index === e.target.value))
    }

    const onClickAddWorkout = (e) => {

        setFitnessPageState("add-new")
    }

    return (
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
                        Workouts
                    </Text>
                    <Text fontSize="sm" color="muted">
                        Record a workout
                    </Text>
                </Stack>
                <Button onClick={onClickAddWorkout} variant="primary">Add</Button>
            </Stack>
            {
                workouts.map((item, id) => (
                    <Stack key={id} justify="space-between" direction="row" spacing="4">
                        <Stack spacing="0.5" fontSize="sm">
                            <Text color="emphasized" fontWeight="medium">
                                {item.name}
                            </Text>
                            <Text>
                                {item.time_logged}
                            </Text>
                            <Text color="muted">{item.type}</Text>
                            <Text color="muted">{item.notes}</Text>
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
                            <Button
                                onClick={handleOnClickEditWorkout}
                                value={id}
                                variant="ghost"
                                aria-label="Edit workout"
                            >Edit</Button>
                            <Button
                                onClick={handleOnClickDeleteWorkout}
                                value={id}
                                variant="ghost"
                                aria-label="Delete workout"
                            >Delete</Button>
                        </Stack>
                    </Stack>))
            }
        </Stack>


    )
}
const WorkoutForm = ({ workoutToEdit, workouts, setWorkouts, setFitnessPageState, setSaveNeeded }) => {
    const [type, setType] = useState()
    const [sets, setSets] = useState([])
    const [numSets, setNumSets] = useState();
    const [name, setName] = useState("");
    const [notes, setNotes] = useState("");
    const [startTime, setStartTime] = useState();
    const [endTime, setEndTime] = useState();
    let workout = {}

    useEffect(() => {
        if (workoutToEdit) {
            workout = workouts[workoutToEdit]

            setType(workout.type)
            setSets(workout.sets)
            setName(workout.name)
            setNotes(workout.notes)
            setStartTime(workout.start_time)
            setEndTime(workout.end_time)
        }
    }, []);

    const onClickSave = async () => {
        workout.time_logged = (new Date).getTime()
        workout.type = type
        workout.name = name
        workout.notes = notes

        if (type === "activity") {
            workout.start_time = startTime
            workout.end_time = endTime

            try{
            
            const { data } = await axios.post('http://flip2.engr.oregonstate.edu:5000/api/timeDelta', {
                startTime: startTime,
                endTime: endTime
            }
            )



                console.log(data)
        } catch (err){
            console.log(err)
        }


        } else if (type === "exercise") {
            console.log(sets)
            workout.sets = sets
        }

        if (!workoutToEdit) {
            setWorkouts([...workouts, workout])
            setSaveNeeded(true);
        } else {
            const newArr = []
            workouts.forEach((w, index) => {
                if (index == workoutToEdit) {
                    newArr.push(workout)
                } else {
                    newArr.push(w)
                }
            })
            setWorkouts(newArr)
            setSaveNeeded(true);
        }

        setFitnessPageState("default")
    }
    const handleOnClickCancel = () => {
        setFitnessPageState("default")
    }

    const handleOnNotesChange = (e) => {
        setNotes(e.target.value)
    }

    const handleOnNameChange = (e) => {
        setName(e.target.value)
    }

    useEffect(() => {
        if (sets?.length)
            setNumSets(sets.length)
    }, [sets]);


    return (
        <Stack
            direction={{
                base: 'column',
                lg: 'row',
            }}
            spacing={{
                base: '5',
                lg: '8',
            }}
            justify="space-between"
        >
            <Box flexShrink={0}>
                <Text fontSize="lg" fontWeight="medium">
                    New Workout
                </Text>
                <Text color="muted" fontSize="sm">
                    Add a new workout
                </Text>
            </Box>
            <Box
                bg="bg-surface"
                boxShadow={useColorModeValue('sm', 'sm-dark')}
                borderRadius="lg"
                flex="1"

            >
                <Stack
                    spacing="5"
                    px={{
                        base: '4',
                        md: '6',
                    }}
                    py={{
                        base: '5',
                        md: '6',
                    }}
                >
                    <FormControl id="name">
                        <FormLabel>Name</FormLabel>
                        <InputGroup>
                            <Input onChange={handleOnNameChange} defaultValue={name} />
                        </InputGroup>
                    </FormControl>
                    <FormControl id="type">
                        <FormLabel>Type</FormLabel>
                        <RadioGroup onChange={setType} value={type} >
                            <Stack spacing={5} direction='row'>
                                <Radio colorScheme='green' value={"activity"}>
                                    Activity
                                </Radio>
                                <Radio colorScheme='red' value={"exercise"}>
                                    Exercise
                                </Radio>
                            </Stack>
                        </RadioGroup>
                    </FormControl>
                    {
                        type === 'activity' ? <ActivityType startTime={startTime} setStartTime={setStartTime} endTime={endTime} setEndTime={setEndTime} /> : <ExerciseType numSets={numSets} setNumSets={setNumSets} sets={sets} setSets={setSets} />
                    }
                    <FormControl id="notes">
                        <FormLabel>Notes</FormLabel>
                        <Textarea onChange={handleOnNotesChange} rows={3} resize="none" defaultValue={notes} />
                        <FormHelperText color="subtle">Notes.</FormHelperText>
                    </FormControl>
                </Stack>
                <Divider />
                <Flex
                    direction="row-reverse"
                    py="4"
                    px={{
                        base: '4',
                        md: '6',
                    }}
                >
                    <Button onClick={handleOnClickCancel} type="submit" variant="outline">
                        Back
                    </Button>
                    <Button onClick={onClickSave} type="submit" variant="primary">
                        Save
                    </Button>
                </Flex>
            </Box>
        </Stack>
    )
}

const SetItem = ({ item, index }) => {
    const onChangeWeight = (e) => {
        item.weight = e.target.value
    }

    const onChangeReps = (e) => {

        item.reps = e.target.value
    }
    return (
        <Stack>

            <Text>Set #{index + 1}</Text>
            <SimpleGrid columns={2} spacing={1}>
                <FormControl id="reps">
                    <InputGroup>
                        <Input onChange={onChangeReps} defaultValue={item.reps} />
                        <InputRightAddon>reps</InputRightAddon>
                    </InputGroup>
                </FormControl>


                <FormControl id="weight">
                    <InputGroup>
                        <Input onChange={onChangeWeight} defaultValue={item.weight} />
                        <InputRightAddon>lbs</InputRightAddon>
                    </InputGroup>
                </FormControl>

            </SimpleGrid>
        </Stack>
    )
}

const SetsCreator = ({ sets, setSets, numSets }) => {
    useEffect(() => {
        if (numSets) {
            console.log("adding sets", numSets)
            const newSets = []
            console.log(sets.length)
            if (numSets > sets.length) {
                console.log("numsets", numSets)
                console.log("setslen", sets.lengt)
                for (let i = 0; i < sets.length; i++) {
                    console.log("pushing", sets[i])
                    newSets.push(sets[i])
                }


                for (let i = (sets.length); i < (numSets); i++) {
                    console.log("pushing empty")
                    newSets.push({
                        reps: 0,
                        weight: 0
                    })
                }
            } else {
                console.log("no empties needed -filling arr")
                for (let i = 0; i < (numSets); i++) {
                    console.log("pushing", sets[i])
                    newSets.push(sets[i])
                }
            }
            console.log("newsets", newSets)
            setSets(newSets)
        }
    }, [numSets]);


    return (
        <Stack>
            {
                (sets?.map ? sets.map((item, id) => <SetItem item={item} key={id} index={id} />) : null)
            }
        </Stack>
    )
}

const ExerciseType = ({ numSets, setNumSets, sets, setSets }) => {

    const setsOnChange = (e) => {
        setNumSets(e.target.value)
    }

    return (
        <Stack>
            <FormControl id="sets">
                <FormLabel>Sets</FormLabel>
                <InputGroup>
                    <Input onChange={setsOnChange} defaultValue={numSets} />
                    <InputRightAddon>sets</InputRightAddon>
                </InputGroup>
            </FormControl>

            <SetsCreator sets={sets} setSets={setSets} numSets={numSets} />

        </Stack>
    )
}

const ActivityType = ({ startTime, endTime, setStartTime, setEndTime }) => {
    const handleOnChangeStart = (e) => {
        console.log("starttime", e.target.value)
        setStartTime(e.target.value)
    }
    const handleOnChangeEnd = (e) => {
        setEndTime(e.target.value)
    }


    return (
        <SimpleGrid columns={2} spacing={1}>
            <FormControl id="start_time">
                <FormLabel>Start Time</FormLabel>
                <InputGroup>
                    <Input onChange={handleOnChangeStart} defaultValue={startTime} />
                </InputGroup>
            </FormControl>


            <FormControl id="end_time">
                <FormLabel>End Time</FormLabel>
                <InputGroup>
                    <Input onChange={handleOnChangeEnd} defaultValue={endTime} />
                </InputGroup>
            </FormControl>
        </SimpleGrid>
    )
}
