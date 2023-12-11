const express = require("express");
const router = express.Router();
const courseController = require("../controllers/course");
const auth = require("../auth");

// Deconstructured the auth to directly access verify function and verifyAdmin
const { verify, verifyAdmin } = auth;

router.get("/all", verify, verifyAdmin, courseController.getAllCourse);

router.get("/", courseController.getAllActive);

router.post("/", verify, verifyAdmin, courseController.addCourse);

router.post("/:courseId", courseController.getCourse);

router.put('/:courseId/archive', verify, verifyAdmin, courseController.archiveCourse)

router.put('/:courseId/activate', verify, verifyAdmin, courseController.activatCourse)

module.exports = router;
