/**
 * Created by Spencer on 3/22/2017.
 */

var express = require('express');
var router = express.Router();

// work with the workout model
var Workout = require('../models/workout');

function isLoggedIn(req,res,next) {
    if(req.isAuthenticated()){
        next();

    } else {
        res.redirect('/');
    }
}

router.use(isLoggedIn);

// basic page for workout display
router.get("/", function(req, res, next){
    // get our workouts from the database
    Workout.find(function(err, workouts){
        if(err){
            res.render('error', {
                message: "Workout Query Failed",
                error: err, user: req.user
            });
        } else {
            res.render('workouts', {
                workouts: workouts,
                title: "Workouts", user: req.user
            });
        }
    })
})

// GET /workouts/add to show the add form
router.get('/add', isLoggedIn, function(req, res, next){
    res.render('add-workout', { title: 'Add a new workout', user: req.user});
})

// add our POST handler for /workouts/add
router.post('/add', function(req, res, next){
    // get the data from the form then redirect the user to the list of workouts
    Workout.create({
        name: req.body.name,
        muscleWorked: req.body.muscleWorked,
        dayWorked: req.body.dayWorked,
        weight: req.body.weight
    }, function(err){
        if(err){
            res.render('error', {
                message: "Could not add workout",
                error: err
            });
        } else {
            res.redirect('/workouts')
        }
    })
})

// get path for deleting a workout
// :id is the variable for our workout to delete
router.get('/delete/:id', function(req, res, next){
    // grab the workout ID from the url
    var id = req.params.id;

    // get rid of the unwanted workout. We like new things
    Workout.remove({ _id: id }, function(err){
        if(err){
            res.render('error', {
                message: "Couldn't delete Workout " + id,
                error: err, user: req.user
            })
        } else {
            res.redirect('/workouts');
        }
    })
})

// get route for editing the workout
router.get('/:id', function(req, res, next){
    // collect the ID from the url
    var id = req.params.id;

    Workout.findById(id, function(err, workout){
        if(err){
            res.render('error', {
                message: "Could not load Workout",
                error: err, user: req.user
            })
        } else {
            res.render('edit-workout', {
                title: 'Edit Workout',
                workout: workout, user: req.user
            })
        }
    })
})

// post to handle edit of workout
router.post('/:id', function(req, res, next){
    // get the workout id from the url
    var id = req.params.id;

    var workoutDetails = {
        name: req.body.name,
        muscleWorked: req.body.muscleWorked,
        dayWorked: req.body.dayWorked,
        weight: req.body.weight
    }

    // update the record in the database
    Workout.update({ _id: id }, workoutDetails, function(err){
        if(err){
            renderError(res, "Could not update workout", err);
        } else {
            res.redirect('/workouts')
        }
    })
})

function renderError(res, mess, err){
    res.render('error', { message: mess, error: err , user: req.user})
}

module.exports = router;