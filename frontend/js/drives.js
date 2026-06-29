const API = "https://careerbridge-postgresql.onrender.com";

const table = document.getElementById("driveBody");

const company = document.getElementById("company");
const driveDate = document.getElementById("driveDate");
const venue = document.getElementById("venue");
const deadline = document.getElementById("deadline");
const status = document.getElementById("status");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const search = document.getElementById("search");

let selectedRow = null;

/* ===========================
   LOAD COMPANIES
=========================== */

async function loadCompanies() {

    try {

        const response = await fetch(`${API}/companies`);

        const companies = await response.json();

        company.innerHTML = "";

        companies.forEach(c => {

            let option = document.createElement("option");

            option.value = c.company_id;
            option.textContent = c.company_name;

            company.appendChild(option);

        });

    }

    catch (err) {

        console.log(err);

    }

}

/* ===========================
   LOAD DRIVES
=========================== */

async function loadDrives() {

    try {

        const response = await fetch(`${API}/drives`);

        const drives = await response.json();

        table.innerHTML = "";

        drives.forEach(drive => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${drive.drive_id}</td>
                <td>${drive.company_name}</td>
                <td>${drive.drive_date.substring(0,10)}</td>
                <td>${drive.venue}</td>
                <td>${drive.registration_deadline.substring(0,10)}</td>
                <td>${drive.status}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                venue.value = drive.venue;
                status.value = drive.status;

                driveDate.value = drive.drive_date.substring(0,10);
                deadline.value = drive.registration_deadline.substring(0,10);

                for (let option of company.options) {

                    if (option.text === drive.company_name) {

                        company.value = option.value;

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

loadCompanies();
loadDrives();

/* ===========================
   ADD DRIVE
=========================== */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch(`${API}/drives`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                company_id: parseInt(company.value),
                drive_date: driveDate.value,
                venue: venue.value,
                registration_deadline: deadline.value,
                status: status.value

            })

        });

        alert(await response.text());

        loadDrives();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   UPDATE DRIVE
=========================== */

updateBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select a Placement Drive.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/drives/${id}`,

            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    company_id: parseInt(company.value),
                    drive_date: driveDate.value,
                    venue: venue.value,
                    registration_deadline: deadline.value,
                    status: status.value

                })

            }

        );

        alert(await response.text());

        loadDrives();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   DELETE DRIVE
=========================== */

deleteBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select a Placement Drive.");

        return;

    }

    if (!confirm("Delete this Placement Drive?")) {

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/drives/${id}`,

            {

                method: "DELETE"

            }

        );

        alert(await response.text());

        loadDrives();

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

        let companyName = row.cells[1].innerText.toLowerCase();

        row.style.display = companyName.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR FORM
=========================== */

function clearForm() {

    document.getElementById("driveForm").reset();

    selectedRow = null;

}