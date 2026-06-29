const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL JOB ROLES
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                r.role_id,
                r.role_name,
                c.company_name,
                r.salary_lpa,
                r.minimum_cgpa,
                r.vacancies
            FROM JobRoles r
            JOIN Companies c
            ON r.company_id = c.company_id
            ORDER BY r.role_id`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD JOB ROLE
=========================== */

router.post("/", async (req, res) => {

    try {

        const {

            company_id,
            role_name,
            salary_lpa,
            minimum_cgpa,
            vacancies

        } = req.body;

        await pool.query(

            `INSERT INTO JobRoles
            (
                company_id,
                role_name,
                salary_lpa,
                minimum_cgpa,
                vacancies
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5
            )`,

            [

                company_id,
                role_name,
                salary_lpa,
                minimum_cgpa,
                vacancies

            ]

        );

        res.send("Job Role Added Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE JOB ROLE
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            company_id,
            role_name,
            salary_lpa,
            minimum_cgpa,
            vacancies

        } = req.body;

        await pool.query(

            `UPDATE JobRoles
             SET company_id=$1,
                 role_name=$2,
                 salary_lpa=$3,
                 minimum_cgpa=$4,
                 vacancies=$5
             WHERE role_id=$6`,

            [

                company_id,
                role_name,
                salary_lpa,
                minimum_cgpa,
                vacancies,
                id

            ]

        );

        res.send("Job Role Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE JOB ROLE
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM JobRoles
             WHERE role_id=$1`,

            [req.params.id]

        );

        res.send("Job Role Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;