-- Migration to remove dataset column from employee table

-- Drop the dataset column if it exists
ALTER TABLE employee DROP COLUMN IF EXISTS dataset;
