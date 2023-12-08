// M2-M3: create courses route and controller files in their appropriate folders.
const Course = require('../models/Course');

// M2-M3: create a getAllCourses controller.
module.exports.getAllCourse = (req, res) =>{
    return Course.find({})
    .then((courses)=>{
        if(!courses){
            return res.send('No courses found or invalid query');
        } else {
            return res.send({courses});
        }
    })
    // M2-M3: Catch error and send it to the client.
    .catch((err)=>{
        return res.send('Error: ', err)
    })
}

module.exports.getCourse = (req,res) => {
    return Course.findOne({_id: req.params.courseId})
    .then((course)=>{
        if(!course){
            return res.send('Error no course found');
        } else {
            return res.send({course});
        }
    })
    // Catch error and send it to the client.
        .catch((err)=>{
        return res.send('Error: ', err)
    })
}

// M4: Create an addCourse controller method for creating new Course document.
module.exports.addCourse = (req, res )=>{
    // M4: Receives detalils of the course from the course body
    const { name, description, price, isActive, createdOn } = req.body;
    // Checks if the course is already existing
    return Course.findOne({name: name})
    .then((result)=>{
        // if result is true, duplicated course errror
        if (result){
            return res.send('Duplicated course name found');
            // if result is false, proceed to create a new course.
        } else {
            let newCourse = new Course({
                name: name,
                description: description,
                price: price,
                isActive: isActive,
                createdOn: createdOn
            })
            // M4: Save Course document
            newCourse.save()
            .then((savedCourse, err)=>{
                // Checking for error
                if(err){
                    return res.send('Course not saved')
                } else {
                    // Returns the Saved Document to the Client
                    return res.status(201).send({savedCourse})
                }
            })
        }
    })
        // M4: Catch error and send it to the client.
    .catch((err)=>{
        return res.send('Error: ', err)
    })
}