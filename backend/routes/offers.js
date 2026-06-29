const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL OFFERS
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(

            `SELECT
                offer_id,
                application_id,
                package_lpa,
                joining_date,
                offer_status
             FROM Offers
             ORDER BY offer_id`

        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD OFFER
=========================== */

router.post("/", async (req, res) => {

    try {

        const {

            application_id,
            package_lpa,
            joining_date,
            offer_status

        } = req.body;

        await pool.query(

            `INSERT INTO Offers
            (
                application_id,
                package_lpa,
                joining_date,
                offer_status
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )`,

            [

                application_id,
                package_lpa,
                joining_date,
                offer_status

            ]

        );

        res.send("Offer Added Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE OFFER
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {

            application_id,
            package_lpa,
            joining_date,
            offer_status

        } = req.body;

        await pool.query(

            `UPDATE Offers
             SET application_id=$1,
                 package_lpa=$2,
                 joining_date=$3,
                 offer_status=$4
             WHERE offer_id=$5`,

            [

                application_id,
                package_lpa,
                joining_date,
                offer_status,
                id

            ]

        );

        res.send("Offer Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE OFFER
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        await pool.query(

            `DELETE FROM Offers
             WHERE offer_id=$1`,

            [req.params.id]

        );

        res.send("Offer Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;