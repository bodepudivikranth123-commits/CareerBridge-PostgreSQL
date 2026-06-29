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
   Load Students From Oracle
----------------------------- */

async function loadStudents() {

    try {

        const response = await fetch("http://localhost:3000/students");

        const students = await response.json();

        table.innerHTML = "";

        students.forEach(student => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${student[0]}</td>
                <td>${student[1]}</td>
                <td>${student[2]}</td>
                <td>${student[3]}</td>
                <td>${student[4]}</td>
                <td>${student[6]}</td>
                <td>${student[8]}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                nameInput.value = student[1];
                emailInput.value = student[2];
                phoneInput.value = student[3];
                genderInput.value = student[4];
                cgpaInput.value = student[6];

            };

        });

    }
    catch(err){

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

        if (name.includes(value))
            row.style.display = "";
        else
            row.style.display = "none";

    }

});

/* -----------------------------
   Add Student
----------------------------- */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch("http://localhost:3000/students", {

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
    catch(err){

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

        const response = await fetch(`http://localhost:3000/students/${id}`, {

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
    catch(err){

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

        const response = await fetch(`http://localhost:3000/students/${id}`, {

            method: "DELETE"

        });

        const message = await response.text();

        alert(message);

        loadStudents();

        clearForm();

    }
    catch(err){

        console.log(err);

    }

});