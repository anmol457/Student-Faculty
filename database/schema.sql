-- Create Database
CREATE DATABASE student_faculty_db;
USE student_faculty_db;

-- ==============================
-- 1. Department Table
-- ==============================
CREATE TABLE department (
    department_id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(100) NOT NULL
);

-- ==============================
-- 2. Faculty Table
-- ==============================
CREATE TABLE faculty (
    faculty_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    designation VARCHAR(100),
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    CONSTRAINT fk_faculty_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- ==============================
-- 3. Student Table
-- ==============================
CREATE TABLE student (
    student_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    middle_name VARCHAR(50),
    last_name VARCHAR(50) NOT NULL,
    department_id INT,
    date_of_birth DATE,
    phone_number VARCHAR(15),
    email VARCHAR(100) UNIQUE,
    CONSTRAINT fk_student_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- ==============================
-- 4. Course Table
-- ==============================
CREATE TABLE course (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(100) NOT NULL,
    credits INT NOT NULL,
    department_id INT,
    CONSTRAINT fk_course_department FOREIGN KEY (department_id) REFERENCES department(department_id)
);

-- ==============================
-- 5. Junction Table: Student-Course (Enrolls)
-- ==============================
CREATE TABLE student_course (
    student_id INT,
    course_id INT,
    PRIMARY KEY (student_id, course_id),
    CONSTRAINT fk_sc_student FOREIGN KEY (student_id) REFERENCES student(student_id) ON DELETE CASCADE,
    CONSTRAINT fk_sc_course FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- ==============================
-- 6. Junction Table: Faculty-Course (Teaches)
-- ==============================
CREATE TABLE faculty_course (
    faculty_id INT,
    course_id INT,
    PRIMARY KEY (faculty_id, course_id),
    CONSTRAINT fk_fc_faculty FOREIGN KEY (faculty_id) REFERENCES faculty(faculty_id) ON DELETE CASCADE,
    CONSTRAINT fk_fc_course FOREIGN KEY (course_id) REFERENCES course(course_id) ON DELETE CASCADE
);

-- ==============================
-- 7. Add Head of Department (after faculty exists)
-- ==============================
ALTER TABLE department
ADD head_of_department INT,
ADD CONSTRAINT fk_department_head FOREIGN KEY (head_of_department) REFERENCES faculty(faculty_id);
