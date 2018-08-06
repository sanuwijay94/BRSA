const express = require('express');
const router = express.Router();
const Login = require('../controllers/loginController')

//LOGIN.
router.post('/', Login.login);


module.exports = router;
