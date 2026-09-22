// backend/routes/competitionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getUsers,
  createGuestUser,
  resetDemo
} = require('../controllers/competitionController');

router.get('/users', getUsers);
router.post('/users/new', createGuestUser);
router.post('/:id/reset-demo', resetDemo);

router.get('/:id', getCompetitionDetails);
router.post('/:id/register', registerForCompetition);
router.post('/:id/submit', submitEntry);

module.exports = router;