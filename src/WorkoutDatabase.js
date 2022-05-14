export class WorkoutDatabase {
    constructor(raw_input) {
        this.workout_arr = []
        
        raw_input.forEach((item) => {
            console("got: ", item)
            this.workout_arr.push(new Exercise(item))
        })
    }
}


export class Exercise {
    constructor(data) {
        this.exercise_arr = [];
        this.time_logged = null;

        console.log("meal data", data)
    }

}