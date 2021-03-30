const express = require('express');
const router = express.Router();

const teams = require('../../controller/teams.controller');
const members = require('../../controller/members.controller');
const items = require('../../controller/items.controller');

//  TEAMS

// POST /api/teams?temauid=:teamuid&teamuid=:teamuid
router.post('', teams.create_team);

// GET /api/teams
router.get('', teams.get_team);

// PUT /api/teams?temauid=:teamuid
router.put('');

// DELETE /api/teams?temauid=:teamuid
router.delete('')


// POST /api/v1/teams/members?teamuid=&state=
router.post('/members', members.join_team);

// GET /api/v1/teams/members?teamuid=
router.get('/members', members.get_members);

// GET /api/v1/teams/members/teamlist
router.get('/members/teamlist', members.get_user_teamlist);

// GET /api/teams/items?teamuid&barcode
router.get('/items', items.get_team_items);

module.exports = router;