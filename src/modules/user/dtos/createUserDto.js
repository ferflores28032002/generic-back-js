export const createUserDto = (data) => {
  const username = (data.username || "").trim();
  const email = (data.email || "").trim().toLowerCase();
  const password_hash = (data.password_hash || "").trim();

  const errors = [];

  if (!username) errors.push("username is required");
  if (username.length < 3) errors.push("username must be at least 3 characters long");
  if( password_hash.length < 6) errors.push("password_hash must be at least 6 characters long");

  return {
    isValid: errors.length === 0,
    errors,
    value: { username, email , password_hash},
  };
};
