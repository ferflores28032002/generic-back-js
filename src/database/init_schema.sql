DROP DATABASE IF EXISTS testdb;
CREATE DATABASE testdb;


CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL
);


INSERT INTO users (name, email) VALUES
('Alice', 'alice@example.com'),
('Bob', 'bob@example.com');


-- PostgreSQL Functions and Procedures
CREATE OR REPLACE FUNCTION sp_get_all_users()
RETURNS TABLE(id INT, name VARCHAR, email VARCHAR) AS $$
BEGIN
  RETURN QUERY SELECT u.id, u.name, u.email FROM users u;
END;
$$ LANGUAGE plpgsql;

DROP PROCEDURE IF EXISTS sp_create_user;

-- Create a procedure to insert a new user
CREATE OR REPLACE FUNCTION sp_create_user(
  p_name VARCHAR,
  p_email VARCHAR
) RETURNS INT AS $$
DECLARE
  new_id INT;
BEGIN
  INSERT INTO users (name, email)
  VALUES (p_name, p_email)
  RETURNING id INTO new_id;

  RETURN new_id;
END;
$$ LANGUAGE plpgsql;