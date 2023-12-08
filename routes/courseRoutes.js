// M2-M3: create courses route and controller files in their appropriate folders.
const express = require('express');
const router = express.Router();
const auth = require('../auth');
const courseController = require('../controllers/courseController')
const {verifyToken, verifyAdmin} = auth;

// M2: Create a route that will retrieve ALL the courses documents from the database. Req verify and verifyAdmin. ONLY verifyAdmin is allowed
router.get('/all', verifyToken, verifyAdmin, courseController.getAllCourse);
// M4: Create a POST course route that will be used to create a new Course document. ONLY Admin is allowed and need token verification.
router.post('//', verifyToken, verifyAdmin, courseController.addCourse);
// M5: Create a new POST route to retrieve a specific course using the courseId.
router.post('/:courseId', courseController.getCourse);

module.exports = router;