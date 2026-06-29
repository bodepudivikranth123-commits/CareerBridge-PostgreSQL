const table = document.getElementById("jobBody");

const roleName = document.getElementById("roleName");
const company = document.getElementById("company");
const salary = document.getElementById("salary");
const cgpa = document.getElementById("cgpa");
const vacancies = document.getElementById("vacancies");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const search = document.getElementById("search");

let selectedRow = null;

/* ===========================
   LOAD COMPANIES
=========================== */

async function loadCompanies(){

    try{

        const response = await fetch("http://localhost:3000/companies");

        const companies = await response.json();

        company.innerHTML = "";

        companies.forEach(c=>{

            let option = document.createElement("option");

            option.value = c[0];

            option.textContent = c[1];

            company.appendChild(option);

        });

    }

    catch(err){

        console.log(err);

    }

}

/* ===========================
   LOAD JOB ROLES
=========================== */

async function loadJobRoles(){

    try{

        const response = await fetch("http://localhost:3000/jobroles");

        const jobs = await response.json();

        table.innerHTML = "";

        jobs.forEach(job=>{

            let row = table.insertRow();

            row.innerHTML = `
                <td>${job[0]}</td>
                <td>${job[1]}</td>
                <td>${job[2]}</td>
                <td>${job[3]}</td>
                <td>${job[4]}</td>
                <td>${job[5]}</td>
            `;

            row.onclick = function(){

                selectedRow = row;

                roleName.value = job[1];
                salary.value = job[3];
                cgpa.value = job[4];
                vacancies.value = job[5];

                for(let option of company.options){

                    if(option.text === job[2]){

                        company.value = option.value;
                        break;

                    }

                }

            };

        });

    }

    catch(err){

        console.log(err);

    }

}

loadCompanies();
loadJobRoles();

/* ===========================
   ADD JOB ROLE
=========================== */

addBtn.addEventListener("click",async function(){

    try{

        const response = await fetch("http://localhost:3000/jobroles",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                company_id:parseInt(company.value),
                role_name:roleName.value,
                salary_lpa:parseFloat(salary.value),
                minimum_cgpa:parseFloat(cgpa.value),
                vacancies:parseInt(vacancies.value)

            })

        });

        alert(await response.text());

        loadJobRoles();

        clearForm();

    }

    catch(err){

        console.log(err);

    }

});
/* ===========================
   UPDATE JOB ROLE
=========================== */

updateBtn.addEventListener("click", async function(){

    if(selectedRow == null){

        alert("Select a Job Role.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try{

        const response = await fetch(

            `http://localhost:3000/jobroles/${id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    company_id:parseInt(company.value),
                    role_name:roleName.value,
                    salary_lpa:parseFloat(salary.value),
                    minimum_cgpa:parseFloat(cgpa.value),
                    vacancies:parseInt(vacancies.value)

                })

            }

        );

        alert(await response.text());

        loadJobRoles();

        clearForm();

    }

    catch(err){

        console.log(err);

    }

});

/* ===========================
   DELETE JOB ROLE
=========================== */

deleteBtn.addEventListener("click", async function(){

    if(selectedRow == null){

        alert("Select a Job Role.");

        return;

    }

    if(!confirm("Delete this Job Role?")){

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try{

        const response = await fetch(

            `http://localhost:3000/jobroles/${id}`,

            {

                method:"DELETE"

            }

        );

        alert(await response.text());

        loadJobRoles();

        clearForm();

    }

    catch(err){

        console.log(err);

    }

});

/* ===========================
   SEARCH
=========================== */

search.addEventListener("keyup", function(){

    let value = this.value.toLowerCase();

    let rows = table.getElementsByTagName("tr");

    for(let row of rows){

        let role = row.cells[1].innerText.toLowerCase();

        row.style.display = role.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR FORM
=========================== */

function clearForm(){

    document.getElementById("jobRoleForm").reset();

    selectedRow = null;

}