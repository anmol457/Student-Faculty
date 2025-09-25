const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ------------------ MONGODB CONNECTION ------------------
mongoose.connect('mongodb://127.0.0.1:27017/student_faculty', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// ------------------ SCHEMAS ------------------
const studentSchema = new mongoose.Schema({
    name: String,
    email: String
});

const facultySchema = new mongoose.Schema({
    name: String,
    department: String
});

const courseSchema = new mongoose.Schema({
    name: String,
    description: String
});

const facultyCourseSchema = new mongoose.Schema({
    faculty_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

const studentCourseSchema = new mongoose.Schema({
    student_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' }
});

// ------------------ MODELS ------------------
const Student = mongoose.model('Student', studentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Course = mongoose.model('Course', courseSchema);
const FacultyCourse = mongoose.model('FacultyCourse', facultyCourseSchema);
const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);

// ------------------ ROUTES ------------------

// Students
app.get('/students', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

app.post('/students', async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student added', id: student._id });
});

app.put('/students/:id', async (req, res) => {
    await Student.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Student updated' });
});

app.delete('/students/:id', async (req, res) => {
    await Student.findByIdAndDelete(req.params.id);
    res.json({ message: 'Student deleted' });
});

// Faculty
app.get('/faculty', async (req, res) => {
    const faculty = await Faculty.find();
    res.json(faculty);
});

app.post('/faculty', async (req, res) => {
    const faculty = new Faculty(req.body);
    await faculty.save();
    res.json({ message: 'Faculty added', id: faculty._id });
});

app.put('/faculty/:id', async (req, res) => {
    await Faculty.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Faculty updated' });
});

app.delete('/faculty/:id', async (req, res) => {
    await Faculty.findByIdAndDelete(req.params.id);
    res.json({ message: 'Faculty deleted' });
});

// Courses
app.get('/courses', async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
});

app.post('/courses', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course added', id: course._id });
});

// Assign Faculty to Course
app.post('/faculty_courses', async (req, res) => {
    const fc = new FacultyCourse(req.body);
    await fc.save();
    res.json({ message: 'Faculty assigned to course' });
});

// Enroll Student in Course
app.post('/student_courses', async (req, res) => {
    const sc = new StudentCourse(req.body);
    await sc.save();
    res.json({ message: 'Student enrolled in course' });
});

// ------------------ START SERVER ------------------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
