const API = "https://careerbridge-postgresql.onrender.com";

async function loadReports() {

    try {

        const response = await fetch(`${API}/reports`);

        const data = await response.json();

        /* -----------------------------
           Students By Department
        ----------------------------- */

        let table = document.querySelector("#studentsDeptTable");

        table.innerHTML = `
        <tr>
            <th>Department</th>
            <th>Total Students</th>
        </tr>`;

        data.studentsByDepartment.forEach(r => {

            table.innerHTML += `
            <tr>
                <td>${r.department_name}</td>
                <td>${r.total_students}</td>
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
                <td>${r.company_name}</td>
                <td>${r.role_name}</td>
                <td>${r.package_lpa}</td>
            </tr>`;

        });

        /* -----------------------------
           Average CGPA
        ----------------------------- */

        table = document.querySelector("#avgCgpaTable");

        table.innerHTML = `
        <tr>
            <th>Average CGPA</th>
        </tr>`;

        table.innerHTML += `
        <tr>
            <td>${data.averageCGPA[0].average_cgpa}</td>
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
                <td>${r.full_name}</td>
                <td>${r.company_name}</td>
                <td>${r.role_name}</td>
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
                <td>${r.company_name}</td>
                <td>${r.total_applications}</td>
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
                <td>${r.company_name}</td>
                <td>${String(r.drive_date).substring(0,10)}</td>
                <td>${r.venue}</td>
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
                <td>${r.company_name}</td>
                <td>${r.salary_lpa}</td>
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
            <td>${data.totalOffers[0].total_offers}</td>
        </tr>`;

    }

    catch (err) {

        console.log(err);

    }

}

loadReports();