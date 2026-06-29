const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL DRIVES
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                d.drive_id,
                c.company_name,
                d.drive_date,
                d.venue,
                d.registration_deadline,
                d.status
             FROM PlacementDrives d
             JOIN Companies c
             ON d.company_id = c.company_id
             ORDER BY d.drive_id`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD DRIVE
=========================== */

router.post("/", async (req, res) => {

    try {

        const {

            company_id,
            drive_date,
            venue,
            registration_deadline,
            status

        } = req.body;

        await pool.query(

            `INSERT INTO PlacementDrives
            (
                company_id,
                drive_date,
                venue,
                registration_deadline,
                status
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
                drive_date,
                venue,
                registration_deadline,
                status

            ]

        );

        res.send("Placement Drive Added Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE DRIVE
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            company_id,
            drive_date,
            venue,
            registration_deadline,
            status

        } = req.body;

        await pool.query(

            `UPDATE PlacementDrives
             SET company_id=$1,
                 drive_date=$2,
                 venue=$3,
                 registration_deadline=$4,
                 status=$5
             WHERE drive_id=$6`,

            [

                company_id,
                drive_date,
                venue,
                registration_deadline,
                status,
                id

            ]

        );

        res.send("Placement Drive Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE DRIVE
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM PlacementDrives
             WHERE drive_id=$1`,

            [req.params.id]

        );

        res.send("Placement Drive Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;