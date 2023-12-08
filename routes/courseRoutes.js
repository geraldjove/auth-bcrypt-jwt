// M2-M3: create courses route and controller files in their appropriate folders.
const express = require('express');
const router = express.Router(); //allow the use or Router
const auth = require('../auth'); //connect to auth.js
const courseController = require('../controllers/courseController') //connect to courseController.js
const {verifyToken, verifyAdmin} = auth; //Object deconstruct for auth.

// M2: Create a route that will retrieve ALL the courses documents from the database. Req verify and verifyAdmin. ONLY verifyAdmin is allowed
// routes link to retrieving all courses by using the function getAllCourse inside courseController. This also requires verification and admin only.
router.get('/all', verifyToken, verifyAdmin, courseController.getAllCourse);
// M4: Create a POST course route that will be used to create a new Course document. ONLY Admin is allowed and need token verification.
// routes link into adding a course by using the function addCourse inside courseController. This also requires verification and admin only.
router.post('//', verifyToken, verifyAdmin, courseController.addCourse);
// M5: Create a new POST route to retrieve a specific course using the courseId.
// routes into a specific user id and then uses the getCourse function inside courseController.
router.post('/:courseId', courseController.getCourse);

// exports router so it can be used by other modules.
module.exports = router;
