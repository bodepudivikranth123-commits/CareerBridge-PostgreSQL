const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {

    try {

        const studentsByDepartment = await pool.query(`
            SELECT d.department_name,
                   COUNT(s.student_id) AS total_students
            FROM Departments d
            LEFT JOIN Students s
            ON d.department_id = s.department_id
            GROUP BY d.department_name
            ORDER BY d.department_name
        `);

        const highestPackage = await pool.query(`
            SELECT
                c.company_name,
                j.role_name,
                o.package_lpa
            FROM Offers o
            JOIN Applications a
                ON o.application_id = a.application_id
            JOIN JobRoles j
                ON a.role_id = j.role_id
            JOIN Companies c
                ON j.company_id = c.company_id
            WHERE o.package_lpa =
            (
                SELECT MAX(package_lpa)
                FROM Offers
            )
        `);

        const averageCGPA = await pool.query(`
            SELECT ROUND(AVG(cgpa),2) AS average_cgpa
            FROM Students
        `);

        const selectedStudents = await pool.query(`
            SELECT s.full_name,
                   c.company_name,
                   j.role_name
            FROM Offers o
            JOIN Applications a
                ON o.application_id = a.application_id
            JOIN Students s
                ON a.student_id = s.student_id
            JOIN JobRoles j
                ON a.role_id = j.role_id
            JOIN Companies c
                ON j.company_id = c.company_id
            WHERE o.offer_status = 'Accepted'
        `);

        const companyApplications = await pool.query(`
            SELECT c.company_name,
                   COUNT(a.application_id) AS total_applications
            FROM Applications a
            JOIN JobRoles j
                ON a.role_id = j.role_id
            JOIN Companies c
                ON j.company_id = c.company_id
            GROUP BY c.company_name
        `);

        const upcomingDrives = await pool.query(`
            SELECT c.company_name,
                   p.drive_date,
                   p.venue
            FROM PlacementDrives p
            JOIN Companies c
                ON p.company_id = c.company_id
            WHERE p.status = 'Upcoming'
        `);

        const aboveAverageSalary = await pool.query(`
            SELECT c.company_name,
                   j.salary_lpa
            FROM JobRoles j
            JOIN Companies c
                ON j.company_id = c.company_id
            WHERE j.salary_lpa >
            (
                SELECT AVG(salary_lpa)
                FROM JobRoles
            )
        `);

        const totalOffers = await pool.query(`
            SELECT COUNT(*) AS total_offers
            FROM Offers
        `);

        res.json({

            studentsByDepartment: studentsByDepartment.rows,

            highestPackage: highestPackage.rows,

            averageCGPA: averageCGPA.rows,

            selectedStudents: selectedStudents.rows,

            companyApplications: companyApplications.rows,

            upcomingDrives: upcomingDrives.rows,

            aboveAverageSalary: aboveAverageSalary.rows,

            totalOffers: totalOffers.rows

        });

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;