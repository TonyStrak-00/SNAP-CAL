/*
  # Create scan history table

  1. New Tables
    - `scan_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `food_name` (text)
      - `calories` (integer)
      - `protein` (float)
      - `carbs` (float)
      - `fat` (float)
      - `confidence` (float)
      - `created_at` (timestamp with time zone)

  2. Security
    - Enable RLS on `scan_history` table
    - Add policies for users to:
      - Read their own scan history
      - Insert their own scan records
*/

CREATE TABLE scan_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  food_name text NOT NULL,
  calories integer NOT NULL,
  protein float NOT NULL,
  carbs float NOT NULL,
  fat float NOT NULL,
  confidence float NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE scan_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scan history"
  ON scan_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scan records"
  ON scan_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);