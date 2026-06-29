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

async function loadApplications(){

    try{

        const response = await fetch("http://localhost:3000/applications");

        const applications = await response.json();

        application.innerHTML = "";

        applications.forEach(app=>{

            let option = document.createElement("option");

            option.value = app[0];

            option.textContent = app[0];

            application.appendChild(option);

        });

    }

    catch(err){

        console.log(err);

    }

}

/* ===========================
   LOAD OFFERS
=========================== */

async function loadOffers(){

    try{

        const response = await fetch("http://localhost:3000/offers");

        const offers = await response.json();

        table.innerHTML="";

        offers.forEach(offer=>{

            let row = table.insertRow();

            row.innerHTML=`
                <td>${offer[0]}</td>
                <td>${offer[1]}</td>
                <td>${offer[2]}</td>
                <td>${offer[3].substring(0,10)}</td>
                <td>${offer[4]}</td>
            `;

            row.onclick=function(){

                selectedRow=row;

                application.value=offer[1];
                packageInput.value=offer[2];
                joiningDate.value=offer[3].substring(0,10);
                offerStatus.value=offer[4];

            };

        });

    }

    catch(err){

        console.log(err);

    }

}

loadApplications();
loadOffers();

/* ===========================
   ADD OFFER
=========================== */

addBtn.addEventListener("click",async function(){

    try{

        const response=await fetch("http://localhost:3000/offers",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({

                application_id:parseInt(application.value),
                package_lpa:parseFloat(packageInput.value),
                joining_date:joiningDate.value,
                offer_status:offerStatus.value

            })

        });

        alert(await response.text());

        loadOffers();

        clearForm();

    }

    catch(err){

        console.log(err);

    }

});
/* ===========================
   UPDATE OFFER
=========================== */

updateBtn.addEventListener("click", async function(){

    if(selectedRow == null){

        alert("Select an Offer.");

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try{

        const response = await fetch(

            `http://localhost:3000/offers/${id}`,

            {

                method:"PUT",

                headers:{
                    "Content-Type":"application/json"
                },

                body:JSON.stringify({

                    application_id:parseInt(application.value),
                    package_lpa:parseFloat(packageInput.value),
                    joining_date:joiningDate.value,
                    offer_status:offerStatus.value

                })

            }

        );

        alert(await response.text());

        loadOffers();

        clearForm();

    }

    catch(err){

        console.log(err);

    }

});


/* ===========================
   DELETE OFFER
=========================== */

deleteBtn.addEventListener("click", async function(){

    if(selectedRow == null){

        alert("Select an Offer.");

        return;

    }

    if(!confirm("Delete this Offer?")){

        return;

    }

    const id = selectedRow.cells[0].innerText;

    try{

        const response = await fetch(

            `http://localhost:3000/offers/${id}`,

            {

                method:"DELETE"

            }

        );

        alert(await response.text());

        loadOffers();

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

        let applicationId = row.cells[1].innerText.toLowerCase();

        row.style.display = applicationId.includes(value) ? "" : "none";

    }

});


/* ===========================
   CLEAR FORM
=========================== */

function clearForm(){

    document.getElementById("offerForm").reset();

    selectedRow = null;

}