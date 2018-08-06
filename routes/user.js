const express = require('express');

const router = express.Router();

const authentication = require('../middleware/authentication');

const user = require('../controllers/userController')


/// User ROUTES ///

// POST request for creating User.
router.post('/create', authentication.all, user.create);// all

// DELETE request to delete User.
router.delete('/:id/delete', authentication.onlyAdmin, user.delete);// admin

// PATCH request to update User.
router.patch('/:id/update', authentication.all, user.update);// all

// GET request for one User.
router.get('/:id', authentication.all, user.details);// all

// GET request for list of all Users.
router.get('/', authentication.onlyAdmin, user.list);// admin

module.exports = router;
