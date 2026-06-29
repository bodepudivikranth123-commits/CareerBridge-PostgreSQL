const API = "https://careerbridge-postgresql.onrender.com";

const table = document.getElementById("companyBody");

const companyName = document.getElementById("companyName");
const locationInput = document.getElementById("location");
const website = document.getElementById("website");
const hrEmail = document.getElementById("hrEmail");

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

        table.innerHTML = "";

        companies.forEach(company => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${company.company_id}</td>
                <td>${company.company_name}</td>
                <td>${company.location}</td>
                <td>${company.website}</td>
                <td>${company.hr_email}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                companyName.value = company.company_name;
                locationInput.value = company.location;
                website.value = company.website;
                hrEmail.value = company.hr_email;

            };

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadCompanies();

/* ===========================
   ADD COMPANY
=========================== */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch(`${API}/companies`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                company_name: companyName.value,
                location: locationInput.value,
                website: website.value,
                hr_email: hrEmail.value

            })

        });

        alert(await response.text());

        loadCompanies();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   UPDATE COMPANY
=========================== */

updateBtn.addEventListener("click", async function () {

    if (!selectedRow) {

        alert("Select a company.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(`${API}/companies/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                company_name: companyName.value,
                location: locationInput.value,
                website: website.value,
                hr_email: hrEmail.value

            })

        });

        alert(await response.text());

        loadCompanies();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   DELETE COMPANY
=========================== */

deleteBtn.addEventListener("click", async function () {

    if (!selectedRow) {

        alert("Select a company.");

        return;

    }

    if (!confirm("Delete this company?"))
        return;

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(`${API}/companies/${id}`, {

            method: "DELETE"

        });

        alert(await response.text());

        loadCompanies();

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

        let company = row.cells[1].innerText.toLowerCase();

        row.style.display = company.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR
=========================== */

function clearForm() {

    document.getElementById("companyForm").reset();

    selectedRow = null;

}