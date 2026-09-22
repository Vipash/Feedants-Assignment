// backend/routes/competitionRoutes.js
const express = require('express');
const router = express.Router();
const {
  getPrimaryCompetition,
  getCompetitionDetails,
  registerForCompetition,
  submitEntry,
  getUsers,
  createGuestUser,
  resetDemo
} = require('../controllers/competitionController');

router.get('/users', getUsers);
router.post('/users/new', createGuestUser);

// CRITICAL: Must be above /:id
router.get('/primary', getPrimaryCompetition);

router.get('/:id', getCompetitionDetails);
router.post('/:id/reset-demo', resetDemo);
router.post('/:id/register', registerForCompetition);
router.post('/:id/submit', submitEntry);

module.exports = router;