-- ==========================================
-- CAREERBRIDGE - SQL QUERIES
-- ==========================================

--------------------------------------------------
-- 1. Display all departments
--------------------------------------------------

SELECT * FROM Departments;

--------------------------------------------------
-- 2. Display all students
--------------------------------------------------

SELECT * FROM Students;

--------------------------------------------------
-- 3. Display all companies
--------------------------------------------------

SELECT * FROM Companies;

--------------------------------------------------
-- 4. Display all job roles
--------------------------------------------------

SELECT * FROM JobRoles;

--------------------------------------------------
-- 5. Display all placement drives
--------------------------------------------------

SELECT * FROM PlacementDrives;

--------------------------------------------------
-- 6. Display all applications
--------------------------------------------------

SELECT * FROM Applications;

--------------------------------------------------
-- 7. Display all offers
--------------------------------------------------

SELECT * FROM Offers;

--------------------------------------------------
-- 8. Students with CGPA greater than 8.5
--------------------------------------------------

SELECT full_name, cgpa
FROM Students
WHERE cgpa > 8.5;

--------------------------------------------------
-- 9. Students ordered by CGPA
--------------------------------------------------

SELECT full_name, cgpa
FROM Students
ORDER BY cgpa DESC;

--------------------------------------------------
-- 10. Companies located in Bangalore
--------------------------------------------------

SELECT company_name
FROM Companies
WHERE location='Bangalore';

--------------------------------------------------
-- 11. Total students
--------------------------------------------------

SELECT COUNT(*) AS total_students
FROM Students;

--------------------------------------------------
-- 12. Average CGPA
--------------------------------------------------

SELECT ROUND(AVG(cgpa),2) AS average_cgpa
FROM Students;

--------------------------------------------------
-- 13. Highest Package
--------------------------------------------------

SELECT MAX(package_lpa) AS highest_package
FROM Offers;

--------------------------------------------------
-- 14. Lowest Package
--------------------------------------------------

SELECT MIN(package_lpa) AS lowest_package
FROM Offers;

--------------------------------------------------
-- 15. Company Wise Job Roles
--------------------------------------------------

SELECT c.company_name,
       j.role_name
FROM Companies c
INNER JOIN JobRoles j
ON c.company_id=j.company_id;

--------------------------------------------------
-- 16. Student with Department
--------------------------------------------------

SELECT s.full_name,
       d.department_name
FROM Students s
INNER JOIN Departments d
ON s.department_id=d.department_id;

--------------------------------------------------
-- 17. Student Applications
--------------------------------------------------

SELECT s.full_name,
       j.role_name,
       a.status
FROM Students s
JOIN Applications a
ON s.student_id=a.student_id
JOIN JobRoles j
ON a.role_id=j.role_id;

--------------------------------------------------
-- 18. Offers with Student Name
--------------------------------------------------

SELECT s.full_name,
       o.package_lpa,
       o.offer_status
FROM Students s
JOIN Applications a
ON s.student_id=a.student_id
JOIN Offers o
ON a.application_id=o.application_id;

--------------------------------------------------
-- 19. Number of Students in Each Department
--------------------------------------------------

SELECT d.department_name,
       COUNT(*) total_students
FROM Departments d
JOIN Students s
ON d.department_id=s.department_id
GROUP BY d.department_name;

--------------------------------------------------
-- 20. Number of Roles per Company
--------------------------------------------------

SELECT c.company_name,
       COUNT(*) total_roles
FROM Companies c
JOIN JobRoles j
ON c.company_id=j.company_id
GROUP BY c.company_name;

--------------------------------------------------
-- 21. Companies offering package above 9 LPA
--------------------------------------------------

SELECT DISTINCT c.company_name
FROM Companies c
JOIN JobRoles j
ON c.company_id=j.company_id
WHERE j.salary_lpa>9;

--------------------------------------------------
-- 22. Students with Selected Status
--------------------------------------------------

SELECT s.full_name
FROM Students s
JOIN Applications a
ON s.student_id=a.student_id
WHERE a.status='Selected';

--------------------------------------------------
-- 23. Upcoming Placement Drives
--------------------------------------------------

SELECT company_id,
       drive_date,
       venue
FROM PlacementDrives
WHERE status='Upcoming';

--------------------------------------------------
-- 24. Student Count by Gender
--------------------------------------------------

SELECT gender,
       COUNT(*) total
FROM Students
GROUP BY gender;

--------------------------------------------------
-- 25. Department with Highest Average CGPA
--------------------------------------------------

SELECT d.department_name,
       ROUND(AVG(s.cgpa),2) average_cgpa
FROM Departments d
JOIN Students s
ON d.department_id=s.department_id
GROUP BY d.department_name
ORDER BY average_cgpa DESC;

--------------------------------------------------
-- 26. Students Above Department Average CGPA
--------------------------------------------------

SELECT full_name,
       cgpa
FROM Students s
WHERE cgpa >
(
SELECT AVG(cgpa)
FROM Students
WHERE department_id=s.department_id
);

--------------------------------------------------
-- 27. Applications Count by Status
--------------------------------------------------

SELECT status,
       COUNT(*)
FROM Applications
GROUP BY status;

--------------------------------------------------
-- 28. Company Hiring Count
--------------------------------------------------

SELECT c.company_name,
       COUNT(o.offer_id) total_offers
FROM Companies c
JOIN JobRoles j
ON c.company_id=j.company_id
JOIN Applications a
ON j.role_id=a.role_id
JOIN Offers o
ON a.application_id=o.application_id
GROUP BY c.company_name;

--------------------------------------------------
-- 29. Students Without Offers
--------------------------------------------------

SELECT full_name
FROM Students
WHERE student_id NOT IN
(
SELECT student_id
FROM Applications
WHERE application_id IN
(
SELECT application_id
FROM Offers
)
);

--------------------------------------------------
-- 30. Complete Placement Report
--------------------------------------------------

SELECT
s.full_name,
d.department_name,
c.company_name,
j.role_name,
o.package_lpa,
o.offer_status
FROM Students s
JOIN Departments d
ON s.department_id=d.department_id
JOIN Applications a
ON s.student_id=a.student_id
JOIN JobRoles j
ON a.role_id=j.role_id
JOIN Companies c
ON j.company_id=c.company_id
LEFT JOIN Offers o
ON a.application_id=o.application_id;