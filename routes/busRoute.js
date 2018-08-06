const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');

const busRoute = require('../controllers/busRouteController')

//
/// BusRoutes ROUTES ///

// POST request for creating BusRoutes.
router.post('/create', authentication.onlyAdmin, busRoute.create);// admin

// // DELETE request to delete BusRoutes.
router.delete('/:id/delete', authentication.onlyAdmin, busRoute.delete);// admin

// PATCH request to update BusRoutes.
router.patch('/:id/update', authentication.onlyAdmin, busRoute.update);// admin

// GET request for one BusRoutes.
router.get('/:id', authentication.all, busRoute.details);// all

// GET request for list of all BusRoutes.
router.get('/', authentication.all, busRoute.list);// all

module.exports = router;