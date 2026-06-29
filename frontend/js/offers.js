const API = "https://careerbridge-postgresql.onrender.com";

const table = document.getElementById("offerBody");

const application = document.getElementById("application");
const packageInput = document.getElementById("package");
const joiningDate = document.getElementById("joiningDate");
const offerStatus = document.getElementById("offerStatus");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const search = document.getElementById("search");

let selectedRow = null;

/* ===========================
   LOAD APPLICATIONS
=========================== */

async function loadApplications() {

    try {

        const response = await fetch(`${API}/applications`);

        const applications = await response.json();

        application.innerHTML = "";

        applications.forEach(app => {

            let option = document.createElement("option");

            option.value = app.application_id;
            option.textContent = app.application_id;

            application.appendChild(option);

        });

    }

    catch (err) {

        console.log(err);

    }

}

/* ===========================
   LOAD OFFERS
=========================== */

async function loadOffers() {

    try {

        const response = await fetch(`${API}/offers`);

        const offers = await response.json();

        table.innerHTML = "";

        offers.forEach(offer => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${offer.offer_id}</td>
                <td>${offer.application_id}</td>
                <td>${offer.package_lpa}</td>
                <td>${offer.joining_date.substring(0,10)}</td>
                <td>${offer.offer_status}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                application.value = offer.application_id;
                packageInput.value = offer.package_lpa;
                joiningDate.value = offer.joining_date.substring(0,10);
                offerStatus.value = offer.offer_status;

            };

        });

    }

    catch (err) {

        console.log(err);

    }

}

loadApplications();
loadOffers();

/* ===========================
   ADD OFFER
=========================== */

addBtn.addEventListener("click", async function () {

    try {

        const response = await fetch(`${API}/offers`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                application_id: parseInt(application.value),
                package_lpa: parseFloat(packageInput.value),
                joining_date: joiningDate.value,
                offer_status: offerStatus.value

            })

        });

        alert(await response.text());

        loadOffers();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   UPDATE OFFER
=========================== */

updateBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select an Offer.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/offers/${id}`,

            {

                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    application_id: parseInt(application.value),
                    package_lpa: parseFloat(packageInput.value),
                    joining_date: joiningDate.value,
                    offer_status: offerStatus.value

                })

            }

        );

        alert(await response.text());

        loadOffers();

        clearForm();

    }

    catch (err) {

        console.log(err);

    }

});

/* ===========================
   DELETE OFFER
=========================== */

deleteBtn.addEventListener("click", async function () {

    if (selectedRow == null) {

        alert("Select an Offer.");

        return;

    }

    if (!confirm("Delete this Offer?")) {

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try {

        const response = await fetch(

            `${API}/offers/${id}`,

            {

                method: "DELETE"

            }

        );

        alert(await response.text());

        loadOffers();

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

        let applicationId = row.cells[1].innerText.toLowerCase();

        row.style.display = applicationId.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR FORM
=========================== */

function clearForm() {

    document.getElementById("offerForm").reset();

    selectedRow = null;

}