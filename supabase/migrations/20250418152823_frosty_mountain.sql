/*
  # Add INSERT policy for profiles table
  
  1. Security Changes
    - Add INSERT policy to profiles table to allow users to create their own profile during signup
    - This fixes the row-level security violation error during user registration
    - Resolves the cascade of errors with pet creation and profile fetching
*/

-- Add INSERT policy for profiles table
CREATE POLICY "Users can create their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);