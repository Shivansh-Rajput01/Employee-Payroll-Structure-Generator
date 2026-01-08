-- Helper script to insert time logs for a specific employee
-- Replace {EMPLOYEE_ID} with the actual employee ID before running

-- Clear existing time logs for the employee (optional)
-- DELETE FROM time_log WHERE employee_id = {EMPLOYEE_ID};

-- DATASET 1: Break every 45 minutes for 3 minutes (Total: ~8h 12m)
-- Uncomment to use:
/*
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 10:45:00', {EMPLOYEE_ID}),
('2026-01-06 10:48:00', '2026-01-06 11:33:00', {EMPLOYEE_ID}),
('2026-01-06 11:36:00', '2026-01-06 12:21:00', {EMPLOYEE_ID}),
('2026-01-06 12:24:00', '2026-01-06 13:09:00', {EMPLOYEE_ID}),
('2026-01-06 13:12:00', '2026-01-06 13:57:00', {EMPLOYEE_ID}),
('2026-01-06 14:00:00', '2026-01-06 14:45:00', {EMPLOYEE_ID}),
('2026-01-06 14:48:00', '2026-01-06 15:33:00', {EMPLOYEE_ID}),
('2026-01-06 15:36:00', '2026-01-06 16:21:00', {EMPLOYEE_ID}),
('2026-01-06 16:24:00', '2026-01-06 17:09:00', {EMPLOYEE_ID}),
('2026-01-06 17:12:00', '2026-01-06 17:57:00', {EMPLOYEE_ID});
*/

-- DATASET 2: Break every 2 hours for 5 minutes (Total: 8h)
-- Uncomment to use:
/*
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 12:00:00', {EMPLOYEE_ID}),
('2026-01-06 12:05:00', '2026-01-06 14:05:00', {EMPLOYEE_ID}),
('2026-01-06 14:10:00', '2026-01-06 16:10:00', {EMPLOYEE_ID}),
('2026-01-06 16:15:00', '2026-01-06 18:15:00', {EMPLOYEE_ID});
*/

-- DATASET 3: Random breaks (Total: 8h)
-- Uncomment to use:
/*
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 11:20:00', {EMPLOYEE_ID}),
('2026-01-06 11:30:00', '2026-01-06 12:50:00', {EMPLOYEE_ID}),
('2026-01-06 13:10:00', '2026-01-06 14:40:00', {EMPLOYEE_ID}),
('2026-01-06 14:55:00', '2026-01-06 16:10:00', {EMPLOYEE_ID}),
('2026-01-06 16:20:00', '2026-01-06 17:30:00', {EMPLOYEE_ID});
*/

-- DATASET 4: Half day (Total: 5h 45m)
-- Uncomment to use:
/*
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:15:00', '2026-01-06 11:30:00', {EMPLOYEE_ID}),
('2026-01-06 11:45:00', '2026-01-06 13:00:00', {EMPLOYEE_ID}),
('2026-01-06 13:30:00', '2026-01-06 14:45:00', {EMPLOYEE_ID}),
('2026-01-06 15:00:00', '2026-01-06 16:00:00', {EMPLOYEE_ID});
*/

-- Example: Insert Dataset 1 for employee ID 1
-- Uncomment and modify as needed:
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 10:45:00', 1),
('2026-01-06 10:48:00', '2026-01-06 11:33:00', 1),
('2026-01-06 11:36:00', '2026-01-06 12:21:00', 1),
('2026-01-06 12:24:00', '2026-01-06 13:09:00', 1),
('2026-01-06 13:12:00', '2026-01-06 13:57:00', 1),
('2026-01-06 14:00:00', '2026-01-06 14:45:00', 1),
('2026-01-06 14:48:00', '2026-01-06 15:33:00', 1),
('2026-01-06 15:36:00', '2026-01-06 16:21:00', 1),
('2026-01-06 16:24:00', '2026-01-06 17:09:00', 1),
('2026-01-06 17:12:00', '2026-01-06 17:57:00', 1);
