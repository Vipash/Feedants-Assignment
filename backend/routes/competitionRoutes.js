const express = require('express');
const router = express.Router();
const {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getUsers
} = require('../controllers/competitionController');

router.get('/users', getUsers);
router.get('/:id', getCompetitionDetails);
router.post('/:id/register', registerForCompetition);
router.post('/:id/submit', submitEntry);

module.exports = router;