/*
  # Initial database schema for Pet Management App

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key) - matches auth.users.id
      - `username` (text)
      - `avatar_url` (text, nullable)
      - `updated_at` (timestamptz)
      - `created_at` (timestamptz)
    - `pets`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, foreign key to profiles.id)
      - `name` (text)
      - `type` (text) - Dog, Cat, Parrot, Turtle
      - `breed` (text)
      - `weight` (numeric, nullable)
      - `height` (numeric, nullable)
      - `age` (integer, nullable)
      - `sex` (text) - Male, Female, Unknown
      - `image_url` (text, nullable)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    - `appointments`
      - `id` (uuid, primary key)
      - `owner_id` (uuid, foreign key to profiles.id)
      - `pet_id` (uuid, foreign key to pets.id)
      - `name` (text)
      - `description` (text, nullable)
      - `date` (date)
      - `time` (time)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Create policies for authenticated users to manage their own data
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT NOT NULL,
  avatar_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create pets table
CREATE TABLE IF NOT EXISTS pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id),
  name TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('Dog', 'Cat', 'Parrot', 'Turtle')),
  breed TEXT NOT NULL,
  weight NUMERIC NULL,
  height NUMERIC NULL,
  age INTEGER NULL,
  sex TEXT NOT NULL DEFAULT 'Unknown' CHECK (sex IN ('Male', 'Female', 'Unknown')),
  image_url TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL REFERENCES profiles(id),
  pet_id UUID NOT NULL REFERENCES pets(id),
  name TEXT NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  time TIME NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Pets policies
CREATE POLICY "Users can view their own pets"
  ON pets
  FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own pets"
  ON pets
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own pets"
  ON pets
  FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own pets"
  ON pets
  FOR DELETE
  USING (auth.uid() = owner_id);

-- Appointments policies
CREATE POLICY "Users can view their own appointments"
  ON appointments
  FOR SELECT
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can create their own appointments"
  ON appointments
  FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "Users can update their own appointments"
  ON appointments
  FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "Users can delete their own appointments"
  ON appointments
  FOR DELETE
  USING (auth.uid() = owner_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS pets_owner_id_idx ON pets(owner_id);
CREATE INDEX IF NOT EXISTS appointments_owner_id_idx ON appointments(owner_id);
CREATE INDEX IF NOT EXISTS appointments_pet_id_idx ON appointments(pet_id);
CREATE INDEX IF NOT EXISTS appointments_date_idx ON appointments(date);