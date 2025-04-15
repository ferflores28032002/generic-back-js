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


CREATE PROCEDURE sp_create_user(
  IN p_name VARCHAR,
  IN p_email VARCHAR
)
LANGUAGE plpgsql
AS $$
BEGIN
  INSERT INTO users (name, email)
  VALUES (p_name, p_email);
END;
$$;