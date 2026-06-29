-- ==========================================
-- CAREERBRIDGE - STORED PROCEDURES
-- ==========================================

--------------------------------------------------
-- 1. Add New Student
--------------------------------------------------

CREATE OR REPLACE PROCEDURE Add_Student
(
    p_name             IN VARCHAR2,
    p_email            IN VARCHAR2,
    p_phone            IN VARCHAR2,
    p_gender           IN VARCHAR2,
    p_dob              IN DATE,
    p_cgpa             IN NUMBER,
    p_graduation_year  IN NUMBER,
    p_department_id    IN NUMBER
)
IS
BEGIN

    INSERT INTO Students
    VALUES
    (
        student_seq.NEXTVAL,
        p_name,
        p_email,
        p_phone,
        p_gender,
        p_dob,
        p_cgpa,
        p_graduation_year,
        p_department_id
    );

END;
/

--------------------------------------------------
-- 2. Update Student CGPA
--------------------------------------------------

CREATE OR REPLACE PROCEDURE Update_Student_CGPA
(
    p_student_id IN NUMBER,
    p_new_cgpa   IN NUMBER
)
IS
BEGIN

    UPDATE Students
    SET cgpa = p_new_cgpa
    WHERE student_id = p_student_id;

END;
/

--------------------------------------------------
-- 3. Register Application
--------------------------------------------------

CREATE OR REPLACE PROCEDURE Register_Application
(
    p_student_id IN NUMBER,
    p_role_id    IN NUMBER
)
IS
BEGIN

    INSERT INTO Applications
    VALUES
    (
        application_seq.NEXTVAL,
        p_student_id,
        p_role_id,
        SYSDATE,
        'Applied'
    );

END;
/

--------------------------------------------------
-- 4. Update Placement Drive Status
--------------------------------------------------

CREATE OR REPLACE PROCEDURE Update_Drive_Status
(
    p_drive_id IN NUMBER,
    p_status   IN VARCHAR2
)
IS
BEGIN

    UPDATE PlacementDrives
    SET status = p_status
    WHERE drive_id = p_drive_id;

END;
/

--------------------------------------------------
-- 5. Generate Offer
--------------------------------------------------

CREATE OR REPLACE PROCEDURE Generate_Offer
(
    p_application_id IN NUMBER,
    p_package        IN NUMBER,
    p_joining_date   IN DATE,
    p_status         IN VARCHAR2
)
IS
BEGIN

    INSERT INTO Offers
    VALUES
    (
        offer_seq.NEXTVAL,
        p_application_id,
        p_package,
        p_joining_date,
        p_status
    );

END;
/

SELECT object_name, status
FROM user_objects
WHERE object_type = 'PROCEDURE'
ORDER BY object_name;