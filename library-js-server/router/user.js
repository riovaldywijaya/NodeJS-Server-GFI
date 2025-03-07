const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');

router.get('/', (req, res) => res.send('Server JS is running ..'));
router.post('/v1/users/register', UserController.register);
router.post('/v1/users/login', UserController.login);

module.exports = router;
