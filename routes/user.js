const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const auth = require("../auth");

// Deconstructured the auth to directly access verify function and verifyAdmin
const {verify, verifyAdmin} = auth;


// "/users"
// all the routes / requirements of controllers (services)
router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);	

router.get("/all", verify, verifyAdmin, userController.getAllUsers);

router.get("/details", verify, userController.getProfile);

router.get('/getEnrollments', verify, userController.getEnrollments);

router.post('/enroll', verify, userController.enroll);

module.exports = router;