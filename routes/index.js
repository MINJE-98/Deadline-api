const express = require('express');

const router = express.Router();



// 1. 토큰을 받아온다.
// 2. 토큰을 이용해 사용자 데이터를 받아온다.
// 3. 사용자 데이터를 넘겨준다


const token = require('../service/tokencheck');
router.use(token.tokencheck)

const auth = require('./auth');
router.use('/auth', auth);

const teams = require('./teams');
router.use('/teams', teams);



module.exports = router;