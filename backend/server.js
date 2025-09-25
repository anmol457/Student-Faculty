const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { Department, Faculty, Student, Course, StudentCourse, FacultyCourse } = require('./models');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ------------------ Routes ------------------

// Departments
app.get('/departments', async (req, res) => {
    const depts = await Department.find().populate('head_of_department', 'first_name last_name');
    res.json(depts);
});
app.post('/departments', async (req, res) => {
    const dept = new Department(req.body);
    await dept.save();
    res.json(dept);
});
app.put('/departments/:id', async (req, res) => {
    await Department.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});
app.delete('/departments/:id', async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Faculty
app.get('/faculty', async (req, res) => {
    const faculty = await Faculty.find().populate('department', 'department_name');
    res.json(faculty);
});
app.post('/faculty', async (req, res) => {
    const f = new Faculty(req.body);
    await f.save();
    res.json(f);
});
app.put('/faculty/:id', async (req, res) => {
    await Faculty.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});
app.delete('/faculty/:id', async (req, res) => {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Students
app.get('/students', async (req, res) => {
    const students = await Student.find().populate('department', 'department_name');
    res.json(students);
});
app.post('/students', async (req, res) => {
    const s = new Student(req.body);
    await s.save();
    res.json(s);
});
app.put('/students/:id', async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});
app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// Courses
app.get('/courses', async (req, res) => {
    const courses = await Course.find().populate('department', 'department_name');
    res.json(courses);
});
app.post('/courses', async (req, res) => {
    const c = new Course(req.body);
    await c.save();
    res.json(c);
});
app.put('/courses/:id', async (req, res) => {
    await Course.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Updated' });
});
app.delete('/courses/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
});

// FacultyCourse
app.get('/faculty_courses', async (req, res) => {
    const fc = await FacultyCourse.find().populate('faculty', 'first_name last_name').populate('course', 'course_name');
    res.json(fc);
});
app.post('/faculty_courses', async (req, res) => {
    const fc = new FacultyCourse(req.body);
    await fc.save();
    res.json(fc);
});

// StudentCourse
app.get('/student_courses', async (req, res) => {
    const sc = await StudentCourse.find().populate('student', 'first_name last_name').populate('course', 'course_name');
    res.json(sc);
});
app.post('/student_courses', async (req, res) => {
    const sc = new StudentCourse(req.body);
    await sc.save();
    res.json(sc);
});

// ------------------ Start Server ------------------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
