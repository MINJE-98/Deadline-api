const express = require('express');
const router = express.Router();

const teams = require('../../controller/teams.controller');
const members = require('../../controller/members.controller');

//  팀

// 팀생성
// POST /api/teams?temauid={teamuid}&teamuid={teamuid}
router.post('/', teams.create_team);

// 팀정보
// GET /api/teams
router.get('/', teams.get_team);

// PUT /api/teams?temauid={teamuid}
router.put('/');

// DELETE /api/teams?temauid={teamuid}
router.delete('/')


// // 팀 멤버

// // 가입
// // POST /api/v1/teams/members?teamuid={teamuid}&state={state}
// router.post('/members', members.join_team);


// // 가입된 유저리스트 읽기
// // GET /api/v1/teams/members?teamuid={teamuid}
// router.get('/members', members.get_members);


// // 한유저가 가입한 팀리스트 읽기
// // GET /api/v1/teams/members/teamlist
// router.get('/members/teamlist', members.get_user_teamlist);

// // GET /api/teams/items?teamuid&barcode
// // router.get('/items', items.get_team_items);

module.exports = router;