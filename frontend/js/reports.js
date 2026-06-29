async function loadReports(){

    try{

        const response = await fetch("http://localhost:3000/reports");

        const data = await response.json();

        /* -----------------------------
           Students By Department
        ----------------------------- */

        let table=document.querySelector("#studentsDeptTable");

        table.innerHTML=`
        <tr>
            <th>Department</th>
            <th>Total Students</th>
        </tr>`;

        data.studentsByDepartment.forEach(r=>{

            table.innerHTML+=`
            <tr>
                <td>${r[0]}</td>
                <td>${r[1]}</td>
            </tr>`;

        });

        /* -----------------------------
           Highest Package
        ----------------------------- */

   

         table = document.querySelector("#highestPackageTable");

         table.innerHTML = `
        <tr>
         <th>Company</th>
         <th>Role</th>
         <th>Package (LPA)</th>
        </tr>`;

         data.highestPackage.forEach(r => {

           table.innerHTML += `
            <tr>
             <td>${r[0]}</td>
             <td>${r[1]}</td>
             <td>${r[2]}</td>
             </tr>`;

        });

        /* -----------------------------
           Average CGPA
        ----------------------------- */

        table=document.querySelector("#avgCgpaTable");

        table.innerHTML=`
        <tr>
            <th>Average CGPA</th>
        </tr>`;

        table.innerHTML+=`
        <tr>
            <td>${data.averageCGPA[0][0]}</td>
        </tr>`;
                /* -----------------------------
           Selected Students
        ----------------------------- */

        table = document.querySelector("#selectedStudentsTable");

        table.innerHTML = `
        <tr>
            <th>Student</th>
            <th>Company</th>
            <th>Role</th>
        </tr>`;

        data.selectedStudents.forEach(r => {

            table.innerHTML += `
            <tr>
                <td>${r[0]}</td>
                <td>${r[1]}</td>
                <td>${r[2]}</td>
            </tr>`;

        });

        /* -----------------------------
           Company-wise Applications
        ----------------------------- */

        table = document.querySelector("#companyApplicationsTable");

        table.innerHTML = `
        <tr>
            <th>Company</th>
            <th>Total Applications</th>
        </tr>`;

        data.companyApplications.forEach(r => {

            table.innerHTML += `
            <tr>
                <td>${r[0]}</td>
                <td>${r[1]}</td>
            </tr>`;

        });

        /* -----------------------------
           Upcoming Drives
        ----------------------------- */

        table = document.querySelector("#upcomingDrivesTable");

        table.innerHTML = `
        <tr>
            <th>Company</th>
            <th>Date</th>
            <th>Venue</th>
        </tr>`;

        data.upcomingDrives.forEach(r => {

            table.innerHTML += `
            <tr>
                <td>${r[0]}</td>
                <td>${String(r[1]).substring(0,10)}</td>
                <td>${r[2]}</td>
            </tr>`;

        });

        /* -----------------------------
           Above Average Salary
        ----------------------------- */

        table = document.querySelector("#aboveAverageSalaryTable");

        table.innerHTML = `
        <tr>
            <th>Company</th>
            <th>Package (LPA)</th>
        </tr>`;

        data.aboveAverageSalary.forEach(r => {

            table.innerHTML += `
            <tr>
                <td>${r[0]}</td>
                <td>${r[1]}</td>
            </tr>`;

        });

        /* -----------------------------
           Total Offers
        ----------------------------- */

        table = document.querySelector("#totalOffersTable");

        table.innerHTML = `
        <tr>
            <th>Total Offers</th>
        </tr>`;

        table.innerHTML += `
        <tr>
            <td>${data.totalOffers[0][0]}</td>
        </tr>`;

    }

    catch(err){

        console.log(err);

    }

}

loadReports();