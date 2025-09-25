const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

// ------------------ MONGODB CONNECTION ------------------
mongoose.connect('mongodb://127.0.0.1:27017/student_faculty_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

// ------------------ SCHEMAS ------------------
const departmentSchema = new mongoose.Schema({
    department_name: { type: String, required: true },
    head_of_department: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
});

const facultySchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String },
    last_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    designation: { type: String },
    phone_number: { type: String },
    email: { type: String, unique: true }
});

const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: { type: String },
    last_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    date_of_birth: { type: Date },
    phone_number: { type: String },
    email: { type: String, unique: true }
});

const courseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    credits: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

const studentCourseSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { _id: false });
studentCourseSchema.index({ student: 1, course: 1 }, { unique: true });

const facultyCourseSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { _id: false });
facultyCourseSchema.index({ faculty: 1, course: 1 }, { unique: true });

// ------------------ MODELS ------------------
const Department = mongoose.model('Department', departmentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);
const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);
const FacultyCourse = mongoose.model('FacultyCourse', facultyCourseSchema);

// ------------------ ROUTES ------------------

// ------------------ Departments ------------------
app.get('/departments', async (req, res) => {
    const departments = await Department.find().populate('head_of_department', 'first_name last_name');
    res.json(departments);
});

app.post('/departments', async (req, res) => {
    const dept = new Department(req.body);
    await dept.save();
    res.json({ message: 'Department added', id: dept._id });
});

app.put('/departments/:id', async (req, res) => {
    await Department.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Department updated' });
});

app.delete('/departments/:id', async (req, res) => {
    await Department.findByIdAndDelete(req.params.id);
    res.json({ message: 'Department deleted' });
});

// ------------------ Faculty ------------------
app.get('/faculty', async (req, res) => {
    const faculty = await Faculty.find().populate('department', 'department_name');
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

// ------------------ Students ------------------
app.get('/students', async (req, res) => {
    const students = await Student.find().populate('department', 'department_name');
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

// ------------------ Courses ------------------
app.get('/courses', async (req, res) => {
    const courses = await Course.find().populate('department', 'department_name');
    res.json(courses);
});

app.post('/courses', async (req, res) => {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: 'Course added', id: course._id });
});

app.put('/courses/:id', async (req, res) => {
    await Course.findByIdAndUpdate(req.params.id, req.body);
    res.json({ message: 'Course updated' });
});

app.delete('/courses/:id', async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: 'Course deleted' });
});

// ------------------ Student-Course Enrollment ------------------
app.post('/student_courses', async (req, res) => {
    const sc = new StudentCourse(req.body);
    await sc.save();
    res.json({ message: 'Student enrolled in course' });
});

app.get('/student_courses', async (req, res) => {
    const sc = await StudentCourse.find().populate('student', 'first_name last_name').populate('course', 'course_name');
    res.json(sc);
});

// ------------------ Faculty-Course Assignment ------------------
app.post('/faculty_courses', async (req, res) => {
    const fc = new FacultyCourse(req.body);
    await fc.save();
    res.json({ message: 'Faculty assigned to course' });
});

app.get('/faculty_courses', async (req, res) => {
    const fc = await FacultyCourse.find().populate('faculty', 'first_name last_name').populate('course', 'course_name');
    res.json(fc);
});

// ------------------ START SERVER ------------------
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
