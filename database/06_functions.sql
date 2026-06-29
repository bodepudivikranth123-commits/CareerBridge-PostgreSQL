-- ==========================================
-- CAREERBRIDGE - FUNCTIONS
-- ==========================================

--------------------------------------------------
-- 1. Get Student Application Count
--------------------------------------------------

CREATE OR REPLACE FUNCTION Get_Application_Count
(
    p_student_id IN NUMBER
)
RETURN NUMBER
IS

    v_count NUMBER;

BEGIN

    SELECT COUNT(*)
    INTO v_count
    FROM Applications
    WHERE student_id = p_student_id;

    RETURN v_count;

END;
/

--------------------------------------------------
-- 2. Get Average CGPA
--------------------------------------------------

CREATE OR REPLACE FUNCTION Get_Average_CGPA

RETURN NUMBER
IS

    v_avg NUMBER;

BEGIN

    SELECT ROUND(AVG(cgpa),2)
    INTO v_avg
    FROM Students;

    RETURN v_avg;

END;
/

--------------------------------------------------
-- 3. Get Highest Package
--------------------------------------------------

CREATE OR REPLACE FUNCTION Get_Highest_Package

RETURN NUMBER
IS

    v_package NUMBER;

BEGIN

    SELECT MAX(package_lpa)
    INTO v_package
    FROM Offers;

    RETURN v_package;

END;
/

--------------------------------------------------
-- 4. Get Company Hiring Count
--------------------------------------------------

CREATE OR REPLACE FUNCTION Get_Company_Hiring_Count
(
    p_company_id IN NUMBER
)
RETURN NUMBER
IS

    v_count NUMBER;

BEGIN

    SELECT COUNT(o.offer_id)
    INTO v_count
    FROM JobRoles j
    JOIN Applications a
        ON j.role_id = a.role_id
    JOIN Offers o
        ON a.application_id = o.application_id
    WHERE j.company_id = p_company_id;

    RETURN v_count;

END;
/

--------------------------------------------------
-- 5. Get Department Student Count
--------------------------------------------------

CREATE OR REPLACE FUNCTION Get_Department_Student_Count
(
    p_department_id IN NUMBER
)
RETURN NUMBER
IS

    v_count NUMBER;

BEGIN

    SELECT COUNT(*)
    INTO v_count
    FROM Students
    WHERE department_id = p_department_id;

    RETURN v_count;

END;
/
