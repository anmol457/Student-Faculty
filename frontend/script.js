const API_URL = 'http://localhost:3000';

// Helper
async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    return await res.json();
}
function clearTable(tableId) { document.querySelector(`#${tableId} tbody`).innerHTML = ''; }

// ------------------ Load Functions ------------------
async function loadDepartments() {
    const depts = await fetchJSON(`${API_URL}/departments`);
    clearTable('deptTable');
    const tbody = document.querySelector('#deptTable tbody');
    const headSelect = document.getElementById('headDeptSelect');
    headSelect.innerHTML = '<option value="">Head of Department (Optional)</option>';
    const facultyDeptSelect = document.getElementById('facultyDept');
    const studentDeptSelect = document.getElementById('studentDept');
    const courseDeptSelect = document.getElementById('courseDept');
    facultyDeptSelect.innerHTML = ''; studentDeptSelect.innerHTML = ''; courseDeptSelect.innerHTML = '';
    depts.forEach(d => {
        tbody.innerHTML += `<tr>
            <td>${d.department_name}</td>
            <td>${d.head_of_department ? d.head_of_department.first_name+' '+d.head_of_department.last_name : ''}</td>
            <td><button onclick="deleteDepartment('${d._id}')">Delete</button></td>
        </tr>`;
        headSelect.innerHTML += `<option value="${d._id}">${d.department_name}</option>`;
        facultyDeptSelect.innerHTML += `<option value="${d._id}">${d.department_name}</option>`;
        studentDeptSelect.innerHTML += `<option value="${d._id}">${d.department_name}</option>`;
        courseDeptSelect.innerHTML += `<option value="${d._id}">${d.department_name}</option>`;
    });
}

async function loadFaculty() {
    const faculty = await fetchJSON(`${API_URL}/faculty`);
    clearTable('facultyTable');
    const tbody = document.querySelector('#facultyTable tbody');
    const assignFaculty = document.getElementById('assignFaculty');
    assignFaculty.innerHTML = '';
    faculty.forEach(f => {
        tbody.innerHTML += `<tr>
            <td>${f.first_name} ${f.middle_name||''} ${f.last_name}</td>
            <td>${f.department ? f.department.department_name : ''}</td>
            <td>${f.designation||''}</td>
            <td>${f.email}</td>
            <td><button onclick="deleteFaculty('${f._id}')">Delete</button></td>
        </tr>`;
        assignFaculty.innerHTML += `<option value="${f._id}">${f.first_name} ${f.last_name}</option>`;
    });
}

async function loadStudents() {
    const students = await fetchJSON(`${API_URL}/students`);
    clearTable('studentTable');
    const tbody = document.querySelector('#studentTable tbody');
    const enrollStudent = document.getElementById('enrollStudent');
    enrollStudent.innerHTML = '';
    students.forEach(s => {
        tbody.innerHTML += `<tr>
            <td>${s.first_name} ${s.middle_name||''} ${s.last_name}</td>
            <td>${s.department ? s.department.department_name : ''}</td>
            <td>${s.email}</td>
            <td><button onclick="deleteStudent('${s._id}')">Delete</button></td>
        </tr>`;
        enrollStudent.innerHTML += `<option value="${s._id}">${s.first_name} ${s.last_name}</option>`;
    });
}

async function loadCourses() {
    const courses = await fetchJSON(`${API_URL}/courses`);
    clearTable('courseTable');
    const tbody = document.querySelector('#courseTable tbody');
    const assignCourse = document.getElementById('assignCourse');
    const enrollCourse = document.getElementById('enrollCourse');
    assignCourse.innerHTML = ''; enrollCourse.innerHTML = '';
    courses.forEach(c => {
        tbody.innerHTML += `<tr>
            <td>${c.course_name}</td>
            <td>${c.credits}</td>
            <td>${c.department ? c.department.department_name : ''}</td>
            <td><button onclick="deleteCourse('${c._id}')">Delete</button></td>
        </tr>`;
        assignCourse.innerHTML += `<option value="${c._id}">${c.course_name}</option>`;
        enrollCourse.innerHTML += `<option value="${c._id}">${c.course_name}</option>`;
    });
}

async function loadFacultyCourses() {
    const fc = await fetchJSON(`${API_URL}/faculty_courses`);
    clearTable('facultyCourseTable');
    const tbody = document.querySelector('#facultyCourseTable tbody');
    fc.forEach(f => {
        tbody.innerHTML += `<tr><td>${f.faculty.first_name} ${f.faculty.last_name}</td><td>${f.course.course_name}</td></tr>`;
    });
}

async function loadStudentCourses() {
    const sc = await fetchJSON(`${API_URL}/student_courses`);
    clearTable('studentCourseTable');
    const tbody = document.querySelector('#studentCourseTable tbody');
    sc.forEach(s => {
        tbody.innerHTML += `<tr><td>${s.student.first_name} ${s.student.last_name}</td><td>${s.course.course_name}</td></tr>`;
    });
}

// ------------------ Add / Delete Handlers ------------------
async function addDepartment(e){ e.preventDefault(); const data={department_name:document.getElementById('deptName').value, head_of_department:document.getElementById('headDeptSelect').value||null}; await fetchJSON(`${API_URL}/departments`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); document.getElementById('deptForm').reset(); loadDepartments(); }
async function deleteDepartment(id){ await fetchJSON(`${API_URL}/departments/${id}`, {method:'DELETE'}); loadDepartments(); }

async function addFaculty(e){ e.preventDefault(); const data={first_name:document.getElementById('facultyFirst').value, middle_name:document.getElementById('facultyMiddle').value, last_name:document.getElementById('facultyLast').value, department:document.getElementById('facultyDept').value, designation:document.getElementById('facultyDesig').value, phone_number:document.getElementById('facultyPhone').value, email:document.getElementById('facultyEmail').value}; await fetchJSON(`${API_URL}/faculty`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); document.getElementById('facultyForm').reset(); loadFaculty(); }
async function deleteFaculty(id){ await fetchJSON(`${API_URL}/faculty/${id}`, {method:'DELETE'}); loadFaculty(); }

async function addStudent(e){ e.preventDefault(); const data={first_name:document.getElementById('studentFirst').value, middle_name:document.getElementById('studentMiddle').value, last_name:document.getElementById('studentLast').value, department:document.getElementById('studentDept').value, date_of_birth:document.getElementById('studentDOB').value, phone_number:document.getElementById('studentPhone').value, email:document.getElementById('studentEmail').value}; await fetchJSON(`${API_URL}/students`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); document.getElementById('studentForm').reset(); loadStudents(); }
async function deleteStudent(id){ await fetchJSON(`${API_URL}/students/${id}`, {method:'DELETE'}); loadStudents(); }

async function addCourse(e){ e.preventDefault(); const data={course_name:document.getElementById('courseName').value, credits:Number(document.getElementById('courseCredits').value), department:document.getElementById('courseDept').value}; await fetchJSON(`${API_URL}/courses`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); document.getElementById('courseForm').reset(); loadCourses(); }
async function deleteCourse(id){ await fetchJSON(`${API_URL}/courses/${id}`, {method:'DELETE'}); loadCourses(); }

async function assignFacultyCourse(e){ e.preventDefault(); const data={faculty:document.getElementById('assignFaculty').value, course:document.getElementById('assignCourse').value}; await fetchJSON(`${API_URL}/faculty_courses`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); loadFacultyCourses(); }

async function enrollStudentCourse(e){ e.preventDefault(); const data={student:document.getElementById('enrollStudent').value, course:document.getElementById('enrollCourse').value}; await fetchJSON(`${API_URL}/student_courses`, {method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(data)}); loadStudentCourses(); }

// ------------------ Event Listeners ------------------
document.getElementById('deptForm').addEventListener('submit', addDepartment);
document.getElementById('facultyForm').addEventListener('submit', addFaculty);
document.getElementById('studentForm').addEventListener('submit', addStudent);
document.getElementById('courseForm').addEventListener('submit', addCourse);
document.getElementById('facultyCourseForm').addEventListener('submit', assignFacultyCourse);
document.getElementById('studentCourseForm').addEventListener('submit', enrollStudentCourse);

// ------------------ Initial Load ------------------
async function init(){ await loadDepartments(); await loadFaculty(); await loadStudents(); await loadCourses(); await loadFacultyCourses(); await loadStudentCourses(); }
init();
