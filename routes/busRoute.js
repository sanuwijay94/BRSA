const express = require('express');

const router = express.Router();

const busRoute = require('../controllers/busRouteController')

//
// /// BusRoutes ROUTES ///
//
// // POST request for creating BusRoutes.
// router.post('/create', busRoute.create);// admin
//
// // DELETE request to delete BusRoutes.
// router.delete('/:id/delete', busRoute.delete);// admin
//
// // PATCH request to update BusRoutes.
// router.patch('/:id/update', busRoute.update);// admin
//
 // GET request for one BusRoutes.
 router.get('/:id', busRoute.details);//admin/PM

// GET request for list of all BusRoutes.
router.get('/', busRoute.list);//admin/PM

module.exports = router;