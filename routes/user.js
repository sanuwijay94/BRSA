const express = require('express');

const router = express.Router();

const user = require('../controllers/userController')


/// User ROUTES ///

// POST request for creating User.
/*router.post('/create', user.create);// admin

// DELETE request to delete User.
router.delete('/:id/delete', user.delete);// admin

// PATCH request to update User.
router.patch('/:id/update', user.update);// admin
*/
// GET request for one User.
router.get('/:id', user.details);//admin/PM

// GET request for list of all Users.
router.get('/', user.list);//admin/PM

module.exports = router;
