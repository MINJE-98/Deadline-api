const express = require('express');

const router = express.Router();



// 1. 토큰을 받아온다.
// 2. 토큰을 이용해 사용자 데이터를 받아온다.
// 3. 사용자 데이터를 넘겨준다

// 유저 appid 확인
//middle ware
const token = require('../controller/usercheck.controller');
router.use(token.tokencheck)

// 유저 정보 인증
const auth = require('./auth');
router.use('/auth', auth);

// 팀멤버
const members = require('./teams/members');
router.use('/teams/members', members);

// 팀
const teams = require('./teams');
router.use('/teams', teams);

// 유저 
//middle ware
const teamcheck = require('../controller/teamcheck.controller');
router.use(teamcheck.teamcheck)

// 아이템
const items = require('./items');
router.use('/items', items);

// 유통기한
const deadline = require('./deadline');
router.use('/deadline', deadline);


module.exports = router;