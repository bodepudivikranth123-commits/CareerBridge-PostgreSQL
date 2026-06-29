const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL APPLICATIONS
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                a.application_id,
                s.full_name,
                c.company_name || ' - ' || j.role_name AS job_role,
                a.application_date,
                a.status
             FROM Applications a
             JOIN Students s
               ON a.student_id = s.student_id
             JOIN JobRoles j
               ON a.role_id = j.role_id
             JOIN Companies c
               ON j.company_id = c.company_id
             ORDER BY a.application_id`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD APPLICATION
=========================== */

router.post("/", async (req, res) => {

    try {

        const {

            student_id,
            role_id,
            application_date,
            status

        } = req.body;

        await pool.query(

            `INSERT INTO Applications
            (
                student_id,
                role_id,
                application_date,
                status
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )`,

            [

                student_id,
                role_id,
                application_date,
                status

            ]

        );

        res.send("Application Added Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE APPLICATION
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            student_id,
            role_id,
            application_date,
            status

        } = req.body;

        await pool.query(

            `UPDATE Applications
             SET student_id=$1,
                 role_id=$2,
                 application_date=$3,
                 status=$4
             WHERE application_id=$5`,

            [

                student_id,
                role_id,
                application_date,
                status,
                id

            ]

        );

        res.send("Application Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE APPLICATION
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM Applications
             WHERE application_id=$1`,

            [req.params.id]

        );

        res.send("Application Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;