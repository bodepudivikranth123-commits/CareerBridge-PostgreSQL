const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL DEPARTMENTS
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(
            `SELECT * FROM Departments ORDER BY department_id`
        );

        res.json(result.rows);

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD DEPARTMENT
=========================== */

router.post("/", async (req, res) => {

    try {

        const { department_name, hod_name } = req.body;

        await pool.query(

            `INSERT INTO Departments
            (
                department_name,
                hod_name
            )
            VALUES
            (
                $1,
                $2
            )`,

            [
                department_name,
                hod_name
            ]

        );

        res.send("Department Added Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE DEPARTMENT
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const { department_name, hod_name } = req.body;

        await pool.query(

            `UPDATE Departments
             SET department_name=$1,
                 hod_name=$2
             WHERE department_id=$3`,

            [
                department_name,
                hod_name,
                id
            ]

        );

        res.send("Department Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE DEPARTMENT
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        await pool.query(

            `DELETE FROM Departments
             WHERE department_id=$1`,

            [id]

        );

        res.send("Department Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;