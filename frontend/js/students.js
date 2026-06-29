const API = "https://careerbridge-postgresql.onrender.com";

const table = document.getElementById("studentBody");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const genderInput = document.getElementById("gender");
const dobInput = document.getElementById("dob");
const cgpaInput = document.getElementById("cgpa");
const departmentInput = document.getElementById("department");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const searchInput = document.getElementById("search");

let selectedRow = null;

/* -----------------------------
   Load Students
----------------------------- */

async function loadStudents() {

    try {

        const response = await fetch(`${API}/students`);

        const students = await response.json();

        table.innerHTML = "";

        students.forEach(student => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${student.student_id}</td>
                <td>${student.full_name}</td>
                <td>${student.email}</td>
                <td>${student.phone}</td>
                <td>${student.gender}</td>
                <td>${student.cgpa}</td>
                <td>${student.department_name}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                nameInput.value = student.full_name;
                emailInput.value = student.email;
                phoneInput.value = student.phone;
                genderInput.value = student.gender;
                dobInput.value = student.dob
                    ? student.dob.toString().split("T")[0]
                    : "";
                cgpaInput.value = student.cgpa;

            };

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadStudents();

/* -----------------------------
   Select Row
----------------------------- */

table.addEventListener("click", function (e) {

    let row = e.target.closest("tr");

    if (!row) return;

    selectedRow = row;

    nameInput.value = row.cells[1].innerText;
    emailInput.value = row.cells[2].innerText;
    phoneInput.value = row.cells[3].innerText;
    genderInput.value = row.cells[4].innerText;
    cgpaInput.value = row.cells[5].innerText;
    departmentInput.value = row.cells[6].innerText;

});

/* -----------------------------
   Search Student
----------------------------- */

searchInput.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for (let row of rows) {

        let name = row.cells[1].innerText.toLowerCase();

        row.style.display = name.includes(value) ? "" : "none";

    }

});

/* -----------------------------
   Add Student
----------------------------- */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch(`${API}/students`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                gender: genderInput.value,
                dob: dobInput.value,
                cgpa: parseFloat(cgpaInput.value),
                graduation_year: 2026,
                department_id: departmentInput.selectedIndex + 1

            })

        });

        const message = await response.text();

        alert(message);

        loadStudents();

        document.getElementById("studentForm").reset();

    }

    catch (err) {

        console.log(err);

    }

});

/* -----------------------------
   Update Student
----------------------------- */

updateBtn.addEventListener("click", async function () {

    if (!selectedRow) {

        alert("Please select a student.");
        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(`${API}/students/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                name: nameInput.value,
                email: emailInput.value,
                phone: phoneInput.value,
                gender: genderInput.value,
                dob: dobInput.value,
                cgpa: parseFloat(cgpaInput.value),
                graduation_year: 2026,
                department_id: departmentInput.selectedIndex + 1

            })

        });

        const message = await response.text();

        alert(message);

        loadStudents();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* -----------------------------
   Delete Student
----------------------------- */

deleteBtn.addEventListener("click", async function () {

    if (!selectedRow) {

        alert("Please select a student.");
        return;

    }

    const id = selectedRow.cells[0].innerText;

    if (!confirm("Are you sure you want to delete this student?")) {
        return;
    }

    try {

        const response = await fetch(`${API}/students/${id}`, {

            method: "DELETE"

        });

        const message = await response.text();

        alert(message);

        loadStudents();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});