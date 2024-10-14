const express = require('express');
const router = express.Router();

const db = require('./demo/student/queries');

router.get("/", (req, res)=> {
    res.send("Platform Service APIs")
})
router.get("/students", db.getStudents);
router.get("/students/:id", db.getStudentById);
router.put("/students/:id", db.updateStudent);
router.post("/students", db.createStudent);
router.delete("/students/:id", db.deleteStudent);

module.exports = router
