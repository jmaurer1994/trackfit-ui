import {
  chakra,
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
  Select,
} from '@chakra-ui/react';
import { FiEdit, FiEdit2, FiTrash, FiTrash2 } from 'react-icons/fi';
import React, { useState, useEffect, useContext, Fragment } from 'react';
import axios from 'axios';
import { FitnessDatabaseContext } from '../Providers';
import { TimePicker } from 'antd';
import './TimePicker.css';
//an activity ihas...
//name
//date logged
//type activity:exercise
//duration

//exercise has sets

export const FitnessPage = () => {
  const [workouts, setWorkouts] = useState([]);
  const [fitnessPageState, setFitnessPageState] = useState('default');
  const [workoutToEdit, setWorkoutToEdit] = useState(-1);
  const fdb = useContext(FitnessDatabaseContext);
  const [saveNeeded, setSaveNeeded] = useState(false);
  //add for prev state

  useEffect(() => {
    console.log('loading workouts', fdb.getData());
    setWorkouts(fdb.getData());
  }, []);

  useEffect(() => {
    if (saveNeeded) {
      console.log('Saving workouts...', workouts);
      fdb.setData(workouts);
      fdb.saveData();
    }
  }, [workouts, saveNeeded]);

  const FitnessPageController = () => {
    if (fitnessPageState === 'add-new') {
      return (
        <WorkoutForm
          workouts={workouts}
          setWorkouts={setWorkouts}
          setFitnessPageState={setFitnessPageState}
          setSaveNeeded={setSaveNeeded}
        />
      );
    } else if (fitnessPageState === 'edit') {
      return (
        <WorkoutForm
          workoutToEdit={workoutToEdit}
          setWorkoutToEdit={setWorkoutToEdit}
          workouts={workouts}
          setWorkouts={setWorkouts}
          setSaveNeeded={setSaveNeeded}
          setFitnessPageState={setFitnessPageState}
        />
      );
    } else {
      return (
        <WorkoutTable
          workouts={workouts}
          setWorkouts={setWorkouts}
          setFitnessPageState={setFitnessPageState}
          setSaveNeeded={setSaveNeeded}
          setWorkoutToEdit={setWorkoutToEdit}
        />
      );
    }
  };

  return (
    <Container
      maxW={'container.xl'}
      color={useColorModeValue('brand.200', 'brand.400')}
    >
      <Stack
        spacing="2"
        direction={{ base: 'column', lg: 'row' }}
        justify="space-between"
      >
        <Stack spacing="-2">
          <Heading
            size={useBreakpointValue({ base: '4xl', lg: '3xl' })}
            fontWeight="medium"
            color={useColorModeValue('brand.200', 'brand.400')}
          >
            Fitness
          </Heading>
          <Text fontSize={{ base: '2xl' }} p={1}>
            Track{' '}
            <chakra.span fontWeight={'bold'} as="em">
              your
            </chakra.span>{' '}
            fitness
          </Text>
        </Stack>
        <Container maxW={'container.lg'}>
          <FitnessPageController />
        </Container>
      </Stack>
    </Container>
  );
};

const WorkoutTable = ({
  workouts,
  setWorkouts,
  setFitnessPageState,
  setWorkoutToEdit,
  setSaveNeeded,
}) => {
  const onClickAddWorkout = e => {
    setFitnessPageState('add-new');
  };

  return (
    <Stack spacing="2" divider={<StackDivider />}>
      <Stack
        p={{ base: 0, lg: 4 }}
        justify="space-between"
        direction={{
          base: 'row',
          sm: 'row',
        }}
        spacing="3"
      >
        <Stack spacing="-2">
          <Text fontSize="2xl" fontWeight="medium">
            Workouts
          </Text>
          <Text fontSize="md" color="muted">
            Record a workout
          </Text>
        </Stack>
        <Button
          onClick={onClickAddWorkout}
          variant="outline"
          fontWeight={'bold'}
          fontSize={'md'}
          borderColor={useColorModeValue('brand.500', 'brand.300')}
          borderWidth={'2px'}
          color={useColorModeValue('brand.100', 'brand.300')}
          bgColor={useColorModeValue('brand.500', 'brand.100')}
        >
          Add
        </Button>
      </Stack>
      {workouts.map((item, id) => (
        <WorkoutCard
          item={item}
          id={id}
          key={id}
          workouts={workouts}
          setWorkoutToEdit={setWorkoutToEdit}
          setFitnessPageState={setFitnessPageState}
          setWorkouts={setWorkouts}
          setSaveNeeded={setSaveNeeded}
        />
      ))}
    </Stack>
  );
};

const WorkoutCard = ({
  item,
  id,
  workouts,
  setWorkoutToEdit,
  setFitnessPageState,
  setWorkouts,
  setSaveNeeded,
}) => {
  const handleOnClickEditWorkout = index => {
    console.log('editing: ', workouts[index]);
    setWorkoutToEdit(index);
    setFitnessPageState('edit');
  };
  const handleOnClickDeleteWorkout = index => {
    const newArr = [];

    console.log(index);
    for (let i = 0; i < workouts.length; i++) {
      if (i !== index) {
        newArr.push(workouts[i]);
      }
    }
    console.log('new arr', newArr);

    setWorkouts(newArr);
    setSaveNeeded(true);
  };

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
          onClick={() => handleOnClickEditWorkout(id)}
          value={id}
          variant="ghost"
          color={useColorModeValue('brand.100', 'brand.300')}
          aria-label="Edit workout"
          icon={<FiEdit />}
        >
          Edit
        </IconButton>
        <IconButton
          onClick={() => handleOnClickDeleteWorkout(id)}
          value={id}
          variant="ghost"
          color={useColorModeValue('brand.100', 'brand.300')}
          aria-label="Delete workout"
          icon={<FiTrash />}
        >
          Delete
        </IconButton>
      </Stack>
    </Stack>
  );
};

const WorkoutForm = ({
  workoutToEdit,
  setWorkoutToEdit,
  workouts,
  setWorkouts,
  setFitnessPageState,
  setSaveNeeded,
}) => {
  const [type, setType] = useState();
  const [sets, setSets] = useState([]);
  const [numSets, setNumSets] = useState();
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [startTime, setStartTime] = useState();
  const [endTime, setEndTime] = useState();
  let workout = {};

  useEffect(() => {
    if (workoutToEdit >= 0) {
      workout = workouts[workoutToEdit];

      console.log('edit', workout);
      setType(workout.type);
      setSets(workout.sets);
      setName(workout.name);
      setNotes(workout.notes);
      setStartTime(workout.start_time);
      setEndTime(workout.end_time);
    }
  }, []);

  const onClickSave = async () => {
    workout.time_logged = new Date().getTime();
    workout.type = type;
    workout.name = name;
    workout.notes = notes;

    if (type === 'activity') {
      workout.start_time = startTime;
      workout.end_time = endTime;

      try {
        console.log(
          'Sending GET request to: https://trackfit.maurer.gg/api/timeDelta?startTime=' +
            Math.floor(startTime / 1000) +
            '&endTime=' +
            Math.floor(endTime / 1000)
        );
        const { data } = await axios.get(
          'https://trackfit.maurer.gg/api/timeDelta?startTime=' +
            Math.floor(startTime / 1000) +
            '&endTime=' +
            Math.floor(endTime / 1000)
        );
        console.log('data:', data);
        workout.duration = {
          hours: data.timeDelta.hours,
          minutes: data.timeDelta.minutes,
        };
      } catch (err) {
        console.log('err', err);
      }
    } else if (type === 'exercise') {
      console.log(sets);
      workout.sets = sets;
    }

    if (!workoutToEdit) {
      setWorkouts([...workouts, workout]);
      setSaveNeeded(true);
    } else {
      const newArr = [];
      workouts.forEach((w, index) => {
        if (index == workoutToEdit) {
          newArr.push(workout);
        } else {
          newArr.push(w);
        }
      });
      setWorkouts(newArr);
      setSaveNeeded(true);
    }

    setFitnessPageState('default');
  };

  const handleOnClickCancel = () => {
    setFitnessPageState('default');
  };

  const handleOnNotesChange = e => {
    setNotes(e.target.value);
  };

  const handleOnNameChange = e => {
    setName(e.target.value);
  };

  useEffect(() => {
    if (sets?.length) setNumSets(sets.length);
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
        <Stack spacing="2">
          <FormControl id="name">
            <FormLabel>Name</FormLabel>
            <InputGroup>
              <Input
                variant="filled"
                onChange={handleOnNameChange}
                defaultValue={name}
              />
            </InputGroup>
          </FormControl>
          <FormControl id="type">
            <FormLabel>Type</FormLabel>
            <RadioGroup onChange={setType} value={type}>
              <Stack spacing={5} direction="row">
                <Radio
                  borderColor={'gray.300'}
                  colorScheme={'blue'}
                  value={'activity'}
                >
                  Activity
                </Radio>
                <Radio
                  borderColor={'gray.300'}
                  colorScheme={'blue'}
                  value={'exercise'}
                >
                  Exercise
                </Radio>
              </Stack>
            </RadioGroup>
          </FormControl>
          {type === 'activity' ? (
            <ActivityType
              startTime={startTime}
              setStartTime={setStartTime}
              endTime={endTime}
              setEndTime={setEndTime}
            />
          ) : null}
          {type === 'exercise' ? (
            <ExerciseType
              numSets={numSets}
              setNumSets={setNumSets}
              sets={sets}
              setSets={setSets}
            />
          ) : null}
          <FormControl id="notes">
            <FormLabel>Notes</FormLabel>
            <Textarea
              variant="filled"
              onChange={handleOnNotesChange}
              rows={3}
              resize="none"
              defaultValue={notes}
            />
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
  );
};

const SetItem = ({ item, index }) => {
  const onChangeWeight = e => {
    item.weight = e.target.value;
  };

  const onChangeReps = e => {
    item.reps = e.target.value;
  };
  return (
    <Stack>
      <Text>Set #{index + 1}</Text>
      <SimpleGrid columns={2} spacing={1}>
        <FormControl id="reps">
          <InputGroup>
            <Input
              variant="filled"
              onChange={onChangeReps}
              defaultValue={item.reps}
            />
            <InputRightAddon>reps</InputRightAddon>
          </InputGroup>
        </FormControl>

        <FormControl id="weight">
          <InputGroup>
            <Input
              variant="filled"
              onChange={onChangeWeight}
              defaultValue={item.weight}
            />
            <InputRightAddon>lbs</InputRightAddon>
          </InputGroup>
        </FormControl>
      </SimpleGrid>
    </Stack>
  );
};

const SetsCreator = ({ sets, setSets, numSets }) => {
  useEffect(() => {
    if (numSets) {
      console.log('adding sets', numSets);
      const newSets = [];
      console.log(sets.length);
      if (numSets > sets.length) {
        console.log('numsets', numSets);
        console.log('setslen', sets.lengt);
        for (let i = 0; i < sets.length; i++) {
          console.log('pushing', sets[i]);
          newSets.push(sets[i]);
        }

        for (let i = sets.length; i < numSets; i++) {
          console.log('pushing empty');
          newSets.push({
            reps: 0,
            weight: 0,
          });
        }
      } else {
        console.log('no empties needed -filling arr');
        for (let i = 0; i < numSets; i++) {
          console.log('pushing', sets[i]);
          newSets.push(sets[i]);
        }
      }
      console.log('newsets', newSets);
      setSets(newSets);
    }
  }, [numSets]);

  return (
    <Stack>
      <>
        {sets?.map
          ? sets.map((item, id) => <SetItem item={item} key={id} index={id} />)
          : null}
      </>
    </Stack>
  );
};

const ExerciseType = ({ numSets, setNumSets, sets, setSets }) => {
  const setsOnChange = e => {
    setNumSets(e.target.value);
  };

  return (
    <Stack>
      <FormControl id="sets">
        <FormLabel>Sets</FormLabel>
        <InputGroup>
          <Input
            variant="filled"
            onChange={setsOnChange}
            defaultValue={numSets}
          />
          <InputRightAddon>sets</InputRightAddon>
        </InputGroup>
      </FormControl>

      <SetsCreator sets={sets} setSets={setSets} numSets={numSets} />
    </Stack>
  );
};

const ActivityType = ({ startTime, endTime, setStartTime, setEndTime }) => {
  const handleOnChangeTime = e => {
    console.log(e);
  };

  return (
    <FormControl id="start_time">
      <FormLabel>Start/End Time</FormLabel>
      <TimePicker.RangePicker
        use12Hours
        onChange={handleOnChangeTime}
        style={{
          color: useColorModeValue('', ''),
          backgroundColor: useColorModeValue('#EDF2F7', '#1D1D1D'),
          borderColor: useColorModeValue('brand.400', '#1D1D1D'),
          borderRadius: '6px',
        }}
      />
    </FormControl>
  );
};
