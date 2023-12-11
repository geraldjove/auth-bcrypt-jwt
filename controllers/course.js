const Course = require("../models/Course");
const bcrypt = require("bcrypt");
const auth = require("../auth");

module.exports.getAllCourse = (req, res) => {
  return Course.find({})
    .then((result) => {
      const response = { courses: result };
      res.status(200).send(response);
    })
    .catch((error) => res.status(500).send({ message: "Find failed", error }));
};

module.exports.getAllActive = (req, res) => {
  Course.find({ isActive: true })
    .then((courses) => {
      res.send(courses);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

module.exports.addCourse = (req, res) => {
  return Course.findOne({ name: req.body.name }).then((result) => {
    if (result) {
      return res.send("Course already exists");
    } else {
      let newCourse = new Course({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
      });
      return newCourse.save().then((savedCourse, err) => {
        if (err) {
          return res.send("Course not saved");
        } else {
          return res.send({ savedCourse });
        }
      });
    }
  })
  .catch((error)=>{
    return res.send('All fields is required to be filled out.')
  })
};

module.exports.getCourse = (req, res) => {
  console.log(req.params.courseId)
  return Course.findById(req.params.courseId)
  .then((course) => {
      if (course) {
        return res.status(200).send({course});
      } else {
        return res.status(401).send("Course does not exist");
      }
  })
  .catch((error)=>{
    res.status(401).send('Course not found')
  })
};

module.exports.archiveCourse = (req, res) => {
  let archiveCourse = {
    isActive: false,
  }
  return Course.findByIdAndUpdate(req.params.courseId, archiveCourse)
  .then((result)=>{
    if (!result){
      return res.status(401).send('Error')
    } else {
      return res.status(200).send({archiveCourse})
    }
  })
  .catch((error) => res.status(500).send(error.message))
}

module.exports.activatCourse = (req, res) => {
  let activateCourse = {
    isActive: true,
  }
  return Course.findByIdAndUpdate(req.params.courseId, activateCourse)
  .then((result)=>{
    if (!result){
      return res.status(401).send('Error')
    } else {
      return res.status(200).send({activateCourse})
    }
  })
  .catch((error) => res.status(500).send(error.message))
}