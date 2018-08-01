const express = require('express');

const router = express.Router();

const journey = require('../controllers/journeyController')

/*
/// Journey ROUTES ///

// POST request for creating Journey.
router.post('/create', journey.create);// admin

// DELETE request to delete Journey.
router.delete('/:id/delete', journey.delete);// admin

// PATCH request to update Journey.
router.patch('/:id/update', journey.update);// admin
*/
// GET request for one Journey.
router.get('/:id', journey.details);//admin/PM

// GET request for list of all Journeys.
router.get('/', journey.list);//admin/PM

module.exports = router;