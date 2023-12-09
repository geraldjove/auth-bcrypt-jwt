const express = require('express'); 
const router = express.Router();
const userController = require('../controllers/userController'); //Connects to the userController.js
const auth = require('../auth'); //connects to the auth.js
const { verifyToken, verifyAdmin } = auth; //object deconstruct auth


router.get('/details', verifyToken, userController.getProfile); //route link for details and then uses getProfile function.
router.post('/register', userController.registerUser); //route link for registering the user and then uses the registerUser function.
router.post('/login', userController.loginUser); //route link for logging in user and then using loginUser function.

module.exports = router; //exports router so it can be used by other modules.
