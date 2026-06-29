const table = document.getElementById("departmentBody");

const departmentInput = document.getElementById("departmentName");
const hodInput = document.getElementById("hodName");

const addBtn = document.getElementById("addBtn");
const updateBtn = document.getElementById("updateBtn");
const deleteBtn = document.getElementById("deleteBtn");

const search = document.getElementById("search");

let selectedRow = null;

/* ===========================
   LOAD DEPARTMENTS
=========================== */

async function loadDepartments() {

    try {

        const response = await fetch("http://localhost:3000/departments");

        const departments = await response.json();

        table.innerHTML = "";

        departments.forEach(department => {

            let row = table.insertRow();

            row.innerHTML = `
                <td>${department[0]}</td>
                <td>${department[1]}</td>
                <td>${department[2]}</td>
            `;

            row.onclick = function () {

                selectedRow = row;

                departmentInput.value = department[1];
                hodInput.value = department[2];

            };

        });

    }
    catch(err){

        console.log(err);

    }

}

loadDepartments();

/* ===========================
   ADD DEPARTMENT
=========================== */

addBtn.addEventListener("click", async function(){

    try{

        const response = await fetch("http://localhost:3000/departments",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                department_name:departmentInput.value,
                hod_name:hodInput.value

            })

        });

        const message = await response.text();

        alert(message);

        loadDepartments();

        clearForm();

    }
    catch(err){

        console.log(err);

    }

});

/* ===========================
   UPDATE DEPARTMENT
=========================== */

updateBtn.addEventListener("click", async function(){

    if(selectedRow==null){

        alert("Select a Department.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try{

        const response = await fetch(

            `http://localhost:3000/departments/${id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    department_name:departmentInput.value,
                    hod_name:hodInput.value

                })

            }

        );

        const message = await response.text();

        alert(message);

        loadDepartments();

        clearForm();

    }
    catch(err){

        console.log(err);

    }

});

/* ===========================
   DELETE DEPARTMENT
=========================== */

deleteBtn.addEventListener("click", async function(){

    if(selectedRow==null){

        alert("Select a Department.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    if(!confirm("Delete this Department?")){

        return;

    }

    try{

        const response = await fetch(

            `http://localhost:3000/departments/${id}`,

            {

                method:"DELETE"

            }

        );

        const message = await response.text();

        alert(message);

        loadDepartments();

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

        let department = row.cells[1].innerText.toLowerCase();

        row.style.display = department.includes(value) ? "" : "none";

    }

});

/* ===========================
   CLEAR FORM
=========================== */

function clearForm(){

    document.getElementById("departmentForm").reset();

    selectedRow = null;

}