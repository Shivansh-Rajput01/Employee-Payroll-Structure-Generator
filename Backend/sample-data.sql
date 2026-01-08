-- Sample Time Log Datasets
-- These are example INSERT statements for reference
-- Use the API endpoint POST /payroll/time-logs/:employeeId with dataset number instead

-- Dataset 1: Break every 45 minutes for 3 minutes
-- Example for employee_id = 1, date = 2026-01-01
-- Total working time: ~8.5 hours
INSERT INTO time_log (eid, intime, outtime) VALUES
(1, '2026-01-01 10:00:00', '2026-01-01 10:45:00'),
(1, '2026-01-01 10:48:00', '2026-01-01 11:33:00'),
(1, '2026-01-01 11:36:00', '2026-01-01 12:21:00'),
(1, '2026-01-01 12:24:00', '2026-01-01 13:09:00'),
(1, '2026-01-01 13:12:00', '2026-01-01 13:57:00'),
(1, '2026-01-01 14:00:00', '2026-01-01 14:45:00'),
(1, '2026-01-01 14:48:00', '2026-01-01 15:33:00'),
(1, '2026-01-01 15:36:00', '2026-01-01 16:21:00'),
(1, '2026-01-01 16:24:00', '2026-01-01 17:09:00'),
(1, '2026-01-01 17:12:00', '2026-01-01 17:57:00'),
(1, '2026-01-01 18:00:00', '2026-01-01 18:45:00');

-- Dataset 2: Break every 2 hours for 5 minutes
-- Example for employee_id = 1, date = 2026-01-02
-- Total working time: ~8 hours
INSERT INTO time_log (eid, intime, outtime) VALUES
(1, '2026-01-02 10:00:00', '2026-01-02 12:00:00'),
(1, '2026-01-02 12:05:00', '2026-01-02 14:05:00'),
(1, '2026-01-02 14:10:00', '2026-01-02 16:10:00'),
(1, '2026-01-02 16:15:00', '2026-01-02 18:15:00');

-- Dataset 3: Random breaks, total working time > 8 hours
-- Example for employee_id = 1, date = 2026-01-03
-- Total working time: ~8.25 hours
INSERT INTO time_log (eid, intime, outtime) VALUES
(1, '2026-01-03 10:00:00', '2026-01-03 11:30:00'),
(1, '2026-01-03 11:35:00', '2026-01-03 12:50:00'),
(1, '2026-01-03 12:53:00', '2026-01-03 14:18:00'),
(1, '2026-01-03 14:25:00', '2026-01-03 16:00:00'),
(1, '2026-01-03 16:05:00', '2026-01-03 17:25:00');

-- Dataset 4: Random breaks, total working time < 8 hours
-- Example for employee_id = 1, date = 2026-01-04
-- Total working time: ~3.92 hours
INSERT INTO time_log (eid, intime, outtime) VALUES
(1, '2026-01-04 10:00:00', '2026-01-04 11:00:00'),
(1, '2026-01-04 11:15:00', '2026-01-04 12:05:00'),
(1, '2026-01-04 12:25:00', '2026-01-04 13:35:00'),
(1, '2026-01-04 14:00:00', '2026-01-04 14:55:00');
