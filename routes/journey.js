const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');

const journey = require('../controllers/journeyController')


/// Journey ROUTES ///

// POST request for creating Journey.
router.post('/create', authentication.all, journey.create);// all

// DELETE request to delete Journey.
router.delete('/:id/delete', authentication.onlyAdmin, journey.delete);// admin

// PATCH request to update Journey.
router.patch('/:id/update', authentication.onlyAdmin, journey.update);// admin

// GET request for one Journey.
router.get('/:id', authentication.all, journey.details);// all

// GET request for list of all Journeys.
router.get('/', authentication.onlyAdmin, journey.list);// admin

module.exports = router;