const express = require("express");
const router = express.Router();
const pool = require("../db");

/* ===========================
   GET ALL STUDENTS
=========================== */

router.get("/", async (req, res) => {

    try {

        const result = await pool.query(`
SELECT
    s.student_id,
    s.full_name,
    s.email,
    s.phone,
    s.gender,
    s.dob,
    s.cgpa,
    s.graduation_year,
    d.department_name
FROM Students s
JOIN Departments d
ON s.department_id = d.department_id
ORDER BY s.student_id
`);

        res.json(result.rows);

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   ADD STUDENT
=========================== */

router.post("/", async (req, res) => {

    try {

        const {
            name,
            email,
            phone,
            gender,
            dob,
            cgpa,
            graduation_year,
            department_id
        } = req.body;

        await pool.query(

            `INSERT INTO Students
            (
                full_name,
                email,
                phone,
                gender,
                dob,
                cgpa,
                graduation_year,
                department_id
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7,
                $8
            )`,

            [
                name,
                email,
                phone,
                gender,
                dob,
                cgpa,
                graduation_year,
                department_id
            ]

        );

        res.send("Student Added Successfully");

    } catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   UPDATE STUDENT
=========================== */

router.put("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        const {
            name,
            email,
            phone,
            gender,
            dob,
            cgpa,
            graduation_year,
            department_id
        } = req.body;

        await pool.query(

            `UPDATE Students
             SET full_name=$1,
                 email=$2,
                 phone=$3,
                 gender=$4,
                 dob=$5,
                 cgpa=$6,
                 graduation_year=$7,
                 department_id=$8
             WHERE student_id=$9`,

            [
                name,
                email,
                phone,
                gender,
                dob,
                cgpa,
                graduation_year,
                department_id,
                id
            ]

        );

        res.send("Student Updated Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

/* ===========================
   DELETE STUDENT
=========================== */

router.delete("/:id", async (req, res) => {

    try {

        const id = req.params.id;

        await pool.query(

            `DELETE FROM Students
             WHERE student_id=$1`,

            [id]

        );

        res.send("Student Deleted Successfully");

    }

    catch (err) {

        console.log(err);
        res.status(500).send(err.message);

    }

});

module.exports = router;