const mongoose = require('./db');

// ------------------ Department ------------------
const departmentSchema = new mongoose.Schema({
    department_name: { type: String, required: true },
    head_of_department: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty' }
});

// ------------------ Faculty ------------------
const facultySchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: String,
    last_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    designation: String,
    phone_number: String,
    email: { type: String, unique: true }
});

// ------------------ Student ------------------
const studentSchema = new mongoose.Schema({
    first_name: { type: String, required: true },
    middle_name: String,
    last_name: { type: String, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
    date_of_birth: Date,
    phone_number: String,
    email: { type: String, unique: true }
});

// ------------------ Course ------------------
const courseSchema = new mongoose.Schema({
    course_name: { type: String, required: true },
    credits: { type: Number, required: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' }
});

// ------------------ StudentCourse ------------------
const studentCourseSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { _id: false });
studentCourseSchema.index({ student: 1, course: 1 }, { unique: true });

// ------------------ FacultyCourse ------------------
const facultyCourseSchema = new mongoose.Schema({
    faculty: { type: mongoose.Schema.Types.ObjectId, ref: 'Faculty', required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true }
}, { _id: false });
facultyCourseSchema.index({ faculty: 1, course: 1 }, { unique: true });

// ------------------ Models ------------------
const Department = mongoose.model('Department', departmentSchema);
const Faculty = mongoose.model('Faculty', facultySchema);
const Student = mongoose.model('Student', studentSchema);
const Course = mongoose.model('Course', courseSchema);
const StudentCourse = mongoose.model('StudentCourse', studentCourseSchema);
const FacultyCourse = mongoose.model('FacultyCourse', facultyCourseSchema);

module.exports = {
    Department,
    Faculty,
    Student,
    Course,
    StudentCourse,
    FacultyCourse
};
