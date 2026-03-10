let form = document.getElementById("studentForm");
let table = document.getElementById("studentTable");
let editIndex = document.getElementById("editIndex");

let students = JSON.parse(localStorage.getItem("students")) || [];

function displayStudents() {
    table.innerHTML = "";
    students.forEach((student, index) => {
        table.innerHTML += `    
            <tr>
                <td class="ms">${student.name}</td>
                <td class="ms">${student.age}</td>
                <td class="ms">${student.course}</td>
                <td class="ms">
                    <button class="action-btn edit" onclick="editStudent(${index})">Edit</button>
                    <button class="action-btn delete" onclick="deleteStudent(${index})">Delete</button>
                </td>
            </tr>
        `;
    });
}

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let age = document.getElementById("age").value;
    let course = document.getElementById("course").value;

    let student = { name, age, course };

    if (editIndex.value === "") {
        students.push(student);
    } else {
        students[editIndex.value] = student;
        editIndex.value = "";
    }

    localStorage.setItem("students", JSON.stringify(students));
    form.reset();
    displayStudents();
});

function editStudent(index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("course").value = student.course;
    editIndex.value = index;
}

function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
}

displayStudents();
