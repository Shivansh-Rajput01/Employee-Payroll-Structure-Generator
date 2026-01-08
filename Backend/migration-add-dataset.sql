-- Migration script to add dataset column to existing employee table
-- Run this if you already have the database set up

-- Add dataset column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'employee' 
        AND column_name = 'dataset'
    ) THEN
        ALTER TABLE employee 
        ADD COLUMN dataset INTEGER NOT NULL DEFAULT 1 
        CHECK (dataset >= 1 AND dataset <= 3);
    END IF;
END $$;

-- Drop old tables that are no longer needed
DROP TABLE IF EXISTS time_log CASCADE;
DROP TABLE IF EXISTS configure CASCADE;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_employee_name ON employee(name);
