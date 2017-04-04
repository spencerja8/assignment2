/**
 * Created by Spencer on 3/22/2017.
 */

var mongoose = require('mongoose');

//schema for workout
var workoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Please provide a name"
    },
    muscleWorked: {
        type: String,
        required: "Please provide muscle worked"
    },
    dayWorked: {
        type: String,
        required: "Please provide a say worked"
    },
    weight: {
        type: Number,
        required: "Please provide a weight"
    }
});

//make this model available everywhere else
module.exports = mongoose.model('Workout', workoutSchema);