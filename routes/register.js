/**
 * Created by Spencer on 3/22/2017.
 */

var express = require('express');
var router = express.Router();

//GET handler for register
router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});

module.exports = router;