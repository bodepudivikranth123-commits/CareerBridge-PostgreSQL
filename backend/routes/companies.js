const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL COMPANIES
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT * FROM Companies ORDER BY company_id`
        );

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD COMPANY
=========================== */

router.post("/", async (req, res) => {

    try {

        const {
            company_name,
            location,
            website,
            hr_email
        } = req.body;

        await pool.query(

            `INSERT INTO Companies
            (
                company_name,
                location,
                website,
                hr_email
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )`,

            [
                company_name,
                location,
                website,
                hr_email
            ]

        );

        res.send("Company Added Successfully");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE COMPANY
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {
            company_name,
            location,
            website,
            hr_email
        } = req.body;

        await pool.query(

            `UPDATE Companies
             SET company_name=$1,
                 location=$2,
                 website=$3,
                 hr_email=$4
             WHERE company_id=$5`,

            [
                company_name,
                location,
                website,
                hr_email,
                id
            ]

        );

        res.send("Company Updated Successfully");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE COMPANY
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        await pool.query(

            `DELETE FROM Companies
             WHERE company_id=$1`,

            [id]

        );

        res.send("Company Deleted Successfully");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;