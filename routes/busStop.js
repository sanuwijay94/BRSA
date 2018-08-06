const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');

const busStop = require('../controllers/busStopController')

//
/// BusStop ROUTES ///

// POST request for creating BusStop.
router.post('/create', authentication.onlyAdmin, busStop.create);// admin

// DELETE request to delete BusStop.
 router.delete('/:id/delete', authentication.onlyAdmin, busStop.delete);// admin

// PATCH request to update BusStop.
 router.patch('/:id/update', authentication.onlyAdmin, busStop.update);// admin

// GET request for one BusStop.
router.get('/:id', authentication.all, busStop.details);// all

// GET request for list of all BusStop.
router.get('/', authentication.all, busStop.list);// all

module.exports = router;