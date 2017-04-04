/**
 * Created by Spencer on 3/22/2017.
 */

var express = require('express');
var router = express.Router();

/* GET page */
router.get('/', function(req, res, next) {
    res.render('workouts', { title: 'workouts' });
});

module.exports = router;
