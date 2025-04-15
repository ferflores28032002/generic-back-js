CREATE OR REPLACE FUNCTION sp_create_user(
  user_name VARCHAR,
  user_email VARCHAR,
  user_password TEXT,
  user_role_id INTEGER
)
RETURNS VOID AS $$
BEGIN
  INSERT INTO users (name, email, password, role_id)
  VALUES (user_name, user_email, user_password, user_role_id);
END;
$$ LANGUAGE plpgsql;
