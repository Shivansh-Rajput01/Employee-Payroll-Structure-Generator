-- Sample Time Log Datasets for Testing
-- These datasets can be used to test salary calculations based on attendance

-- DATASET 1: Break every 45 minutes for 3 minutes
-- Total logged time ≈ 8h 12m
-- Usage: INSERT for employee_id = 1 (or any employee)
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

-- DATASET 2: Break every 2 hours for 5 minutes
-- Total logged time = 8 hours
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 12:00:00', 1),
('2026-01-06 12:05:00', '2026-01-06 14:05:00', 1),
('2026-01-06 14:10:00', '2026-01-06 16:10:00', 1),
('2026-01-06 16:15:00', '2026-01-06 18:15:00', 1);

-- DATASET 3: Random breaks — Total logged time = 8 hours
-- Uneven sessions, realistic behavior
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:00:00', '2026-01-06 11:20:00', 1),
('2026-01-06 11:30:00', '2026-01-06 12:50:00', 1),
('2026-01-06 13:10:00', '2026-01-06 14:40:00', 1),
('2026-01-06 14:55:00', '2026-01-06 16:10:00', 1),
('2026-01-06 16:20:00', '2026-01-06 17:30:00', 1);

-- DATASET 4: Random breaks — Total logged time < 8 hours
-- Useful for half-day / leave / attendance failure cases
-- Total: 5 hours 45 minutes
INSERT INTO time_log (punch_in_time, punch_out_time, employee_id) VALUES 
('2026-01-06 10:15:00', '2026-01-06 11:30:00', 1),
('2026-01-06 11:45:00', '2026-01-06 13:00:00', 1),
('2026-01-06 13:30:00', '2026-01-06 14:45:00', 1),
('2026-01-06 15:00:00', '2026-01-06 16:00:00', 1);
