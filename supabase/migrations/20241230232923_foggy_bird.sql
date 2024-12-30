/*
  # Initial Schema Setup for Weekly App

  1. Tables
    - profiles
      - Stores user profile information
      - Links to Clerk user ID
    - updates
      - Stores weekly updates from users
    - friendships
      - Manages friend relationships between users

  2. Security
    - RLS enabled on all tables
    - Policies for authenticated access
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY,
  username text UNIQUE NOT NULL,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Create updates table
CREATE TABLE updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  title text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create friendships table
CREATE TABLE friendships (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) NOT NULL,
  friend_id uuid REFERENCES profiles(id) NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, friend_id)
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE friendships ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read all profiles"
  ON profiles FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Updates policies
CREATE POLICY "Users can read friends' updates"
  ON updates FOR SELECT
  TO authenticated
  USING (
    user_id = auth.uid() OR
    user_id IN (
      SELECT friend_id FROM friendships WHERE user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create own updates"
  ON updates FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

-- Friendships policies
CREATE POLICY "Users can read own friendships"
  ON friendships FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can create friendships"
  ON friendships FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());