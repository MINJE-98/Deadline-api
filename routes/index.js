const express = require('express');

const router = express.Router();


const auth = require('./auth');
const teams = require('./teams');

router.use('/auth', auth);

router.use('/teams', teams);



module.exports = router;