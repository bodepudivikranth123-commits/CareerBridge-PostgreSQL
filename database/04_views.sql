-- ==========================================
-- CAREERBRIDGE - VIEWS
-- ==========================================

--------------------------------------------------
-- 1. Student Department View
--------------------------------------------------

CREATE OR REPLACE VIEW Student_Department_View AS

SELECT
    s.student_id,
    s.full_name,
    d.department_name,
    s.cgpa,
    s.graduation_year
FROM Students s
JOIN Departments d
ON s.department_id = d.department_id;

--------------------------------------------------
-- 2. Company Job Role View
--------------------------------------------------

CREATE OR REPLACE VIEW Company_JobRole_View AS

SELECT
    c.company_name,
    j.role_name,
    j.salary_lpa,
    j.minimum_cgpa,
    j.vacancies
FROM Companies c
JOIN JobRoles j
ON c.company_id = j.company_id;

--------------------------------------------------
-- 3. Placement Drive View
--------------------------------------------------

CREATE OR REPLACE VIEW Placement_Drive_View AS

SELECT
    c.company_name,
    p.drive_date,
    p.venue,
    p.registration_deadline,
    p.status
FROM PlacementDrives p
JOIN Companies c
ON p.company_id = c.company_id;

--------------------------------------------------
-- 4. Application Status View
--------------------------------------------------

CREATE OR REPLACE VIEW Application_Status_View AS

SELECT
    s.full_name,
    c.company_name,
    j.role_name,
    a.application_date,
    a.status
FROM Applications a
JOIN Students s
ON a.student_id = s.student_id
JOIN JobRoles j
ON a.role_id = j.role_id
JOIN Companies c
ON j.company_id = c.company_id;

--------------------------------------------------
-- 5. Selected Students View
--------------------------------------------------

CREATE OR REPLACE VIEW Selected_Students_View AS

SELECT
    s.full_name,
    d.department_name,
    c.company_name,
    j.role_name,
    o.package_lpa,
    o.offer_status
FROM Students s
JOIN Departments d
ON s.department_id = d.department_id
JOIN Applications a
ON s.student_id = a.student_id
JOIN JobRoles j
ON a.role_id = j.role_id
JOIN Companies c
ON j.company_id = c.company_id
JOIN Offers o
ON a.application_id = o.application_id
WHERE a.status = 'Selected';
