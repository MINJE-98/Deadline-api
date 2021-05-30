const express = require('express');
const router = express.Router();

const members = require('../../../controller/members.controller');


// 팀 멤버

// 가입
// POST /api/teams/members?teamuid={teamuid}&state={state}
router.post('/', members.join_team);


// 가입된 유저리스트 읽기
// GET /api/teams/members?teamuid={teamuid}
router.get('/', members.get_members);


// 한유저가 가입한 팀리스트 읽기
// GET /api/v1/teams/members/teamlist
router.get('/teamlist', members.get_user_teamlist);

// GET /api/teams/items?teamuid&barcode
// router.get('/items', items.get_team_items);

module.exports = router;