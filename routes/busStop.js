const express = require('express');

const router = express.Router();

const busStop = require('../controllers/busStopController')

//
/// BusStop ROUTES ///

// POST request for creating BusStop.
router.post('/create', busStop.create);// admin

// DELETE request to delete BusStop.
// router.delete('/:id/delete', busStop.delete);// admin

// PATCH request to update BusStop.
// router.patch('/:id/update', busStop.update);// admin

// GET request for one BusStop.
router.get('/:id', busStop.details);//admin/PM

// GET request for list of all BusStop.
router.get('/', busStop.list);//admin/PM

module.exports = router;