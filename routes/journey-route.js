const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');

const journeyRoute = require('../controllers/journey-routeController')


/// JourneyRoutes ROUTES ///

// POST request for creating JourneyRoute.
router.post('/create', authentication.all, journeyRoute.create);// all

// DELETE request to delete JourneyRoute.
router.delete('/:id/delete', authentication.onlyAdmin, journeyRoute.delete);// admin

// PATCH request to update JourneyRoute.
router.patch('/:id/update', authentication.onlyAdmin, journeyRoute.update);// admin

// GET request for one JourneyRoute.
router.get('/:id', authentication.all, journeyRoute.details);// all

// GET request for list of all JourneyRoutes.
router.get('/', authentication.onlyAdmin, journeyRoute.list);// admin

module.exports = router;