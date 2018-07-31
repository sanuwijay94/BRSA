const express = require('express');

const router = express.Router();

const journeyRoute = require('../controllers/userController')


/// JourneyRoutes ROUTES ///

// POST request for creating JourneyRoute.
router.post('/create', journeyRoute.create);// admin

// DELETE request to delete JourneyRoute.
router.delete('/:id/delete', journeyRoute.delete);// admin

// PATCH request to update JourneyRoute.
router.patch('/:id/update', journeyRoute.update);// admin

// GET request for one JourneyRoute.
router.get('/:id', journeyRoute.details);//admin/PM

// GET request for list of all JourneyRoutes.
router.get('/', journeyRoute.list);//admin/PM

module.exports = router;