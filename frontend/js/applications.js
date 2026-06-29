const API = "https://careerbridge-postgresql.onrender.com";

const table = document.getElementById("applicationBody");

const student = document.getElementById("student");
const jobRole = document.getElementById("jobRole");
const applicationDate = document.getElementById("applicationDate");
const status = document.getElementById("status");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const search = document.getElementById("search");

let selectedRow = null;

/* ===========================
   LOAD STUDENTS
=========================== */

async function loadStudents() {

    try {

        const response = await fetch(`${API}/students`);

        const students = await response.json();

        student.innerHTML = "";

        students.forEach(s => {

            let option = document.createElement("option");

            option.value = s.student_id;
            option.textContent = s.full_name;

            student.appendChild(option);

        });

    }

    catch (err) {

        console.log(err);

    }

}

/* ===========================
   LOAD JOB ROLES
=========================== */

async function loadJobRoles() {

    try {

        const response = await fetch(`${API}/jobroles`);

        const roles = await response.json();

        jobRole.innerHTML = "";

        roles.forEach(r => {

            let option = document.createElement("option");

            option.value = r.role_id;

            option.textContent = r.company_name + " - " + r.role_name;

            jobRole.appendChild(option);

        });

    }

    catch (err) {

        console.log(err);

    }

}

/* ===========================
   LOAD APPLICATIONS
=========================== */

async function loadApplications() {

    try {

        const response = await fetch(`${API}/applications`);

        const applications = await response.json();

        table.innerHTML = "";

        applications.forEach(app => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${app.application_id}</td>
                <td>${app.full_name}</td>
                <td>${app.job_role}</td>
                <td>${app.application_date.substring(0,10)}</td>
                <td>${app.status}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                applicationDate.value = app.application_date.substring(0,10);

                status.value = app.status;

                for (let option of student.options) {

                    if (option.text === app.full_name) {

                        student.value = option.value;
                        break;

                    }

                }

                for (let option of jobRole.options) {

                    if (option.text === app.job_role) {

                        jobRole.value = option.value;
                        break;

                    }

                }

            };

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadStudents();
loadJobRoles();
loadApplications();

/* ===========================
   ADD APPLICATION
=========================== */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch(`${API}/applications`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                student_id: parseInt(student.value),

                role_id: parseInt(jobRole.value),

                application_date: applicationDate.value,

                status: status.value

            })

        });

        alert(await response.text());

        loadApplications();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   UPDATE APPLICATION
=========================== */

updateBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select an Application.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/applications/${id}`,

            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    student_id: parseInt(student.value),

                    role_id: parseInt(jobRole.value),

                    application_date: applicationDate.value,

                    status: status.value

                })

            }

        );

        alert(await response.text());

        loadApplications();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   DELETE APPLICATION
=========================== */

deleteBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select an Application.");

        return;

    }

    if (!confirm("Delete this Application?")) {

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/applications/${id}`,

            {

                method: "DELETE"

            }

        );

        alert(await response.text());

        loadApplications();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   SEARCH
=========================== */

search.addEventListener("keyup", function () {

    let value = this.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for (let row of rows) {

        let studentName = row.cells[1].innerText.toLowerCase();

        row.style.display = studentName.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR FORM
=========================== */

function clearForm() {

    document.getElementById("applicationForm").reset();

    selectedRow = null;

}