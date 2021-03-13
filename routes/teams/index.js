const express = require('express');
const router = express.Router();

const teams = require('./teams.controller');

// POST /api/v1/teams/:teamid
router.post('', teams.createTeam);

// GET /api/v1/teams/:teamid
router.get('/:token');

// PUT /api/v1/teams/:teamid
router.put('/:token');

// DELETE /api/v1/teams/:teamid
router.delete('/:token')

module.exports = router;