const express = require('express');
const router = express.Router();

const teams = require('./teams.controller');
const members = require('./members/members.controller');

//  TEAMS

// POST /api/v1/teams?
router.post('', teams.create_team);

// GET /api/v1/teams?
router.get('', teams.get_userTeamsList);

// PUT /api/v1/teams/:teamid
router.put('/:token');

// DELETE /api/v1/teams/:teamid
router.delete('/:token')

// TEAMEMBERS 
// POST /api/v1/teams/members?
router.post('/members', members.join_team);




module.exports = router;